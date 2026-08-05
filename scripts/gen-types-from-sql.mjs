import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const MIGRATIONS_DIR = join(process.cwd(), "supabase", "migrations");
const OUT_FILE = join(process.cwd(), "lib", "database.types.ts");

const files = readdirSync(MIGRATIONS_DIR)
  .filter((f) => f.endsWith(".sql"))
  .sort();

let sql = "";
for (const f of files) {
  sql += readFileSync(join(MIGRATIONS_DIR, f), "utf8") + "\n";
}

// Strip comments
sql = sql.replace(/--.*$/gm, "");

const sqlToTs = (colType) => {
  const t = colType.toLowerCase();
  if (t.includes("uuid")) return "string";
  if (t.includes("timestamptz") || t.includes("timestamp") || t.includes("date") || t.includes("time"))
    return "string";
  if (t.includes("jsonb") || t.includes("json")) return "Json";
  if (t.includes("numeric") || t.includes("int") || t.includes("smallint") || t.includes("bigint") || t.includes("float") || t.includes("double"))
    return "number";
  if (t.includes("bool")) return "boolean";
  if (t.includes("text[]") || t.includes("uuid[]")) return "string[]";
  if (t.startsWith("public.permission_action")) return "PermissionAction";
  if (t.startsWith("public.field_type")) return "FieldType";
  return "string";
};

const tableRegex = /create table (?:if not exists )?public\.(\w+)\s*\(([\s\S]*?)\n\);/g;
const tables = {};
const relationships = {};

let match;
while ((match = tableRegex.exec(sql))) {
  const [, name, body] = match;
  const columns = {};
  let depth = 0;
  let current = "";
  const lines = [];
  for (const ch of body) {
    if (ch === "(") depth++;
    if (ch === ")") depth--;
    if (ch === "," && depth === 0) {
      lines.push(current);
      current = "";
    } else {
      current += ch;
    }
  }
  if (current.trim()) lines.push(current);

  for (let line of lines) {
    line = line.trim();
    if (!line) continue;
    const lower = line.toLowerCase();
    if (
      lower.startsWith("unique") ||
      lower.startsWith("primary key") ||
      lower.startsWith("foreign key") ||
      lower.startsWith("check") ||
      lower.startsWith("constraint")
    ) {
      continue;
    }
    const colMatch = line.match(/^(?:"([^"]+)"|(\w+))\s+([\s\S]+)$/);
    if (!colMatch) continue;
    const colName = colMatch[1] || colMatch[2];
    let rest = colMatch[3];
    const notNull = /not null/i.test(rest) && !/default/i.test(rest.split("not null")[0]) ;
    const hasDefault = /default/i.test(rest);
    const isPk = /primary key/i.test(rest);
    // type is the first token(s) before constraints keywords
    const typeMatch = rest.match(/^([a-zA-Z_.]+(?:\([^)]*\))?(?:\[\])?)/);
    const rawType = typeMatch ? typeMatch[1] : "text";
    const nullable = !(notNull || isPk);
    columns[colName] = { tsType: sqlToTs(rawType), nullable, hasDefault: hasDefault || isPk };

    const fkMatch = rest.match(/references\s+public\.(\w+)\s*(?:\(([^)]+)\))?/i);
    if (fkMatch) {
      relationships[name] = relationships[name] || [];
      relationships[name].push({
        foreignKeyName: `${name}_${colName}_fkey`,
        columns: [colName],
        referencedRelation: fkMatch[1],
        referencedColumns: [(fkMatch[2] || "id").trim()],
      });
    }
  }
  tables[name] = columns;
}

const alterFkRegex = /alter table public\.(\w+)\s+add constraint \w+\s+foreign key\s*\(([^)]+)\)\s*references public\.(\w+)\s*\(([^)]+)\)/gi;
while ((match = alterFkRegex.exec(sql))) {
  const [, table, cols, refTable, refCols] = match;
  relationships[table] = relationships[table] || [];
  relationships[table].push({
    foreignKeyName: `${table}_${cols.trim()}_fkey`,
    columns: cols.split(",").map((c) => c.trim()),
    referencedRelation: refTable,
    referencedColumns: refCols.split(",").map((c) => c.trim()),
  });
}

let out = `// Généré automatiquement à partir des migrations SQL (scripts/gen-types-from-sql.mjs).
// Régénérez avec un projet Supabase lié pour des types garantis exacts :
//   npx supabase gen types typescript --linked > lib/database.types.ts
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type PermissionAction =
  | "view" | "add" | "edit" | "delete" | "archive" | "validate" | "reject"
  | "import" | "export" | "print" | "share" | "view_history" | "view_amounts"
  | "view_salaries" | "administer";

export type FieldType =
  | "short_text" | "long_text" | "integer" | "decimal" | "amount" | "percentage"
  | "date" | "time" | "datetime" | "boolean" | "single_choice" | "multiple_choice"
  | "auto_code" | "reference_number" | "address" | "phone" | "email"
  | "attachment" | "photo" | "signature" | "status" | "relation" | "formula";

export type Database = {
  public: {
    Tables: {
`;

for (const [table, columns] of Object.entries(tables)) {
  const rowFields = Object.entries(columns)
    .map(([col, { tsType, nullable }]) => `          ${col}: ${tsType}${nullable ? " | null" : ""};`)
    .join("\n");
  const insertFields = Object.entries(columns)
    .map(([col, { tsType, nullable, hasDefault }]) => {
      const optional = nullable || hasDefault;
      return `          ${col}${optional ? "?" : ""}: ${tsType}${nullable ? " | null" : ""};`;
    })
    .join("\n");
  const updateFields = Object.entries(columns)
    .map(([col, { tsType, nullable }]) => `          ${col}?: ${tsType}${nullable ? " | null" : ""};`)
    .join("\n");

  const rels = relationships[table] || [];
  const relsTs = rels
    .map(
      (r) =>
        `          { foreignKeyName: ${JSON.stringify(r.foreignKeyName)}; columns: ${JSON.stringify(
          r.columns
        )}; referencedRelation: ${JSON.stringify(r.referencedRelation)}; referencedColumns: ${JSON.stringify(
          r.referencedColumns
        )}; }`
    )
    .join(",\n");

  out += `      ${table}: {
        Row: {
${rowFields}
        };
        Insert: {
${insertFields}
        };
        Update: {
${updateFields}
        };
        Relationships: [
${relsTs}
        ];
      };
`;
}

out += `    };
    Views: {
      stock_levels: {
        Row: {
          company_id: string;
          warehouse_id: string;
          product_id: string;
          lot_number: string | null;
          quantity_on_hand: number;
          nearest_expiry: string | null;
        };
        Relationships: [];
      };
    };
    Functions: {
      [key: string]: {
        Args: Record<string, unknown>;
        Returns: unknown;
      };
    };
  };
};
`;

writeFileSync(OUT_FILE, out, "utf8");
console.log(`Generated ${Object.keys(tables).length} table types -> ${OUT_FILE}`);
