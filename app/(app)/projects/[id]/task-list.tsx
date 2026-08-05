"use client";

import { useTransition } from "react";
import { addProjectTask, updateTaskProgress } from "@/lib/actions/projects";

type Task = { id: string; title: string; progress: number; status: string; due_date: string | null };

export function TaskList({ projectId, tasks }: { projectId: string; tasks: Task[] }) {
  const [pending, startTransition] = useTransition();
  const boundAdd = addProjectTask.bind(null, projectId);

  return (
    <div>
      <ul className="space-y-2">
        {tasks.map((t) => (
          <li key={t.id} className="flex items-center gap-3 rounded-md border border-zinc-200 p-3 dark:border-zinc-800">
            <span className="flex-1 text-sm">{t.title}</span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">{t.due_date ?? ""}</span>
            <input
              type="range"
              min={0}
              max={100}
              step={10}
              defaultValue={t.progress}
              disabled={pending}
              onChange={(e) => startTransition(() => updateTaskProgress(t.id, projectId, Number(e.target.value)))}
              className="w-32"
            />
            <span className="w-10 text-xs">{t.progress}%</span>
          </li>
        ))}
        {tasks.length === 0 && <p className="text-sm text-zinc-500 dark:text-zinc-400">Aucune tâche.</p>}
      </ul>

      <form action={boundAdd} className="mt-4 flex gap-2">
        <input
          name="title"
          placeholder="Nouvelle tâche"
          required
          className="flex-1 rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
        />
        <input
          name="due_date"
          type="date"
          className="rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
        />
        <button
          type="submit"
          className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900"
        >
          Ajouter
        </button>
      </form>
    </div>
  );
}
