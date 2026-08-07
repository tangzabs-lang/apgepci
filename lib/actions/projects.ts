"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import type { ActionState } from "@/lib/actions/org";
import { humanizeError } from "@/lib/errors";

const projectSchema = z.object({
  company_id: z.string().uuid(),
  code: z.string().optional(),
  title: z.string().min(1, "Intitulé requis."),
  client_id: z.string().uuid().optional().or(z.literal("")),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  budget: z.coerce.number().optional(),
  objectives: z.string().optional(),
});

export async function createProject(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = projectSchema.safeParse({
    company_id: formData.get("company_id"),
    code: formData.get("code") || undefined,
    title: formData.get("title"),
    client_id: formData.get("client_id") || "",
    start_date: formData.get("start_date") || undefined,
    end_date: formData.get("end_date") || undefined,
    budget: formData.get("budget") || undefined,
    objectives: formData.get("objectives") || undefined,
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message };

  const supabase = await createClient();
  const { client_id, ...rest } = parsed.data;
  const { data: project, error } = await supabase
    .from("projects")
    .insert({ ...rest, client_id: client_id || null, status: "active" })
    .select("id")
    .single();
  if (error || !project) return { error: humanizeError(error) };

  revalidatePath("/projects");
  redirect(`/projects/${project.id}`);
}

export async function addProjectTask(projectId: string, formData: FormData) {
  const supabase = await createClient();
  const dueDate = formData.get("due_date");
  await supabase.from("project_tasks").insert({
    project_id: projectId,
    title: String(formData.get("title") || ""),
    due_date: typeof dueDate === "string" && dueDate ? dueDate : null,
  });
  revalidatePath(`/projects/${projectId}`);
}

export async function updateTaskProgress(taskId: string, projectId: string, progress: number) {
  const supabase = await createClient();
  await supabase
    .from("project_tasks")
    .update({ progress, status: progress >= 100 ? "done" : "in_progress" })
    .eq("id", taskId);
  revalidatePath(`/projects/${projectId}`);
}
