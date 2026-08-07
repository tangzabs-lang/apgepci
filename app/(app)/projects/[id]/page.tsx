import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PageHeader, Badge, SectionTitle, StatTile } from "@/components/table";
import { TaskList } from "./task-list";
import { statusLabel } from "@/lib/labels";

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: project }, { data: tasks }, { data: expenses }, { data: revenues }] = await Promise.all([
    supabase.from("projects").select("*, client:clients(name)").eq("id", id).single(),
    supabase.from("project_tasks").select("id, title, progress, status, due_date").eq("project_id", id),
    supabase.from("expenses").select("amount").eq("project_id", id),
    supabase.from("project_revenues").select("amount").eq("project_id", id),
  ]);

  if (!project) notFound();

  const totalExpenses = (expenses ?? []).reduce((sum, e) => sum + Number(e.amount), 0);
  const totalRevenues = (revenues ?? []).reduce((sum, r) => sum + Number(r.amount), 0);
  const margin = totalRevenues - totalExpenses;
  const remaining = Number(project.budget ?? 0) - totalExpenses;

  return (
    <div>
      <PageHeader title={project.title} action={<Badge tone="green">{statusLabel(project.status)}</Badge>} />
      <p className="text-sm text-slate-500">Client : {project.client?.name ?? "—"}</p>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Stat label="Budget" value={Number(project.budget ?? 0).toLocaleString("fr-FR")} />
        <Stat label="Dépenses" value={totalExpenses.toLocaleString("fr-FR")} />
        <Stat label="Recettes" value={totalRevenues.toLocaleString("fr-FR")} />
        <Stat label="Marge" value={margin.toLocaleString("fr-FR")} />
      </div>
      <p className="mt-2 text-sm text-slate-500">
        Reste à engager : {remaining.toLocaleString("fr-FR")}
      </p>

      <SectionTitle className="mt-10">Tâches</SectionTitle>
      <TaskList projectId={project.id} tasks={tasks ?? []} />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return <StatTile label={label} value={value} />;
}
