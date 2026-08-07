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
          <li key={t.id} className="flex items-center gap-3 rounded-sm border border-slate-200 p-3">
            <span className="flex-1 text-sm">{t.title}</span>
            <span className="text-xs text-slate-500">{t.due_date ?? ""}</span>
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
        {tasks.length === 0 && <p className="text-sm text-slate-500">Aucune tâche.</p>}
      </ul>

      <form action={boundAdd} className="mt-4 flex flex-col gap-2 sm:flex-row">
        <input
          name="title"
          placeholder="Nouvelle tâche"
          required
          className="field-input flex-1"
        />
        <input
          name="due_date"
          type="date"
          className="field-input"
        />
        <button type="submit" className="btn btn-primary w-full sm:w-auto">
          Ajouter
        </button>
      </form>
    </div>
  );
}
