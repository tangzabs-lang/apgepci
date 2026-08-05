"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const companySchema = z.object({
  name: z.string().min(2, "La raison sociale est requise."),
  trade_name: z.string().optional(),
  legal_form: z.string().optional(),
  founded_date: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  address: z.string().optional(),
  currency: z.string().min(1),
  language: z.string().min(1),
  employees_count_declared: z.coerce.number().int().optional(),
  sites_count_declared: z.coerce.number().int().optional(),
  size_estimate: z.string().optional(),
  activity_description: z.string().optional(),
  primary_sector_id: z.string().uuid("Secteur principal requis."),
  secondary_sector_ids: z.array(z.string().uuid()).optional(),
});

export type CompanyFormState = { error?: string } | undefined;

export async function createCompany(
  _prevState: CompanyFormState,
  formData: FormData
): Promise<CompanyFormState> {
  const raw = {
    name: formData.get("name"),
    trade_name: formData.get("trade_name") || undefined,
    legal_form: formData.get("legal_form") || undefined,
    founded_date: formData.get("founded_date") || undefined,
    country: formData.get("country") || undefined,
    city: formData.get("city") || undefined,
    address: formData.get("address") || undefined,
    currency: formData.get("currency") || "XOF",
    language: formData.get("language") || "fr",
    employees_count_declared: formData.get("employees_count_declared") || undefined,
    sites_count_declared: formData.get("sites_count_declared") || undefined,
    size_estimate: formData.get("size_estimate") || undefined,
    activity_description: formData.get("activity_description") || undefined,
    primary_sector_id: formData.get("primary_sector_id"),
    secondary_sector_ids: formData.getAll("secondary_sector_ids") as string[],
  };

  const parsed = companySchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Formulaire invalide." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { error: "Vous devez être connecté." };
  }

  const { primary_sector_id, secondary_sector_ids, ...companyFields } = parsed.data;

  const { data: company, error } = await supabase
    .from("companies")
    .insert({ ...companyFields, created_by: user.id })
    .select("id")
    .single();

  if (error || !company) {
    return { error: "Erreur lors de la création de l'entreprise : " + (error?.message ?? "") };
  }

  const sectorRows = [
    { company_id: company.id, sector_id: primary_sector_id, is_primary: true },
    ...(secondary_sector_ids ?? []).map((id) => ({
      company_id: company.id,
      sector_id: id,
      is_primary: false,
    })),
  ];
  await supabase.from("company_sectors").insert(sectorRows);
  await supabase.from("company_diagnostics").insert({ company_id: company.id });

  revalidatePath("/dashboard");
  redirect(`/onboarding/diagnostic?company=${company.id}`);
}
