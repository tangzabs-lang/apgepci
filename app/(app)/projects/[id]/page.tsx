import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PageHeader, Badge } from "@/components/table";
import { TaskList } from "./task-list";

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
      <PageHeader title={project.title} action={<Badge tone="green">{project.status}</Badge>} />
      <p className="text-sm text-zinc-500 dark:text-zinc-400">Client : {project.client?.name ?? "—"}</p>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Stat label="Budget" value={Number(project.budget ?? 0).toLocaleString("fr-FR")} />
        <Stat label="Dépenses" value={totalExpenses.toLocaleString("fr-FR")} />
        <Stat label="Recettes" value={totalRevenues.toLocaleString("fr-FR")} />
        <Stat label="Marge" value={margin.toLocaleString("fr-FR")} />
      </div>
      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
        Reste à engager : {remaining.toLocaleString("fr-FR")}
      </p>

      <h2 className="mb-2 mt-8 text-sm font-semibold text-zinc-500 dark:text-zinc-400">Tâches</h2>
      <TaskList projectId={project.id} tasks={tasks ?? []} />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
      <p className="text-xs font-medium uppercase text-zinc-500 dark:text-zinc-400">{label}</p>
      <p className="mt-2 text-xl font-semibold text-zinc-900 dark:text-zinc-50">{value}</p>
    </div>
  );
}
