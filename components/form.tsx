"use client";

import { useFormStatus } from "react-dom";

const inputClass =
  "mt-1 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-950";

export function TextField({
  label,
  name,
  type = "text",
  required,
  defaultValue,
  step,
  className,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string | number;
  step?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        step={step}
        defaultValue={defaultValue}
        className={inputClass}
      />
    </div>
  );
}

export function TextAreaField({
  label,
  name,
  defaultValue,
  rows = 3,
  className,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  rows?: number;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{label}</label>
      <textarea name={name} defaultValue={defaultValue} rows={rows} className={inputClass} />
    </div>
  );
}

export function SelectField({
  label,
  name,
  required,
  defaultValue,
  options,
  placeholder = "Sélectionner...",
  className,
}: {
  label: string;
  name: string;
  required?: boolean;
  defaultValue?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select name={name} required={required} defaultValue={defaultValue} className={inputClass}>
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function CheckboxField({
  label,
  name,
  defaultChecked,
}: {
  label: string;
  name: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="h-4 w-4 rounded" />
      {label}
    </label>
  );
}

export function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-60 dark:bg-zinc-50 dark:text-zinc-900"
    >
      {pending ? "Enregistrement..." : children}
    </button>
  );
}

export function FormError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-sm text-red-600 dark:text-red-400">{message}</p>;
}
