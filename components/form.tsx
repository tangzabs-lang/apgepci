"use client";

import { useFormStatus } from "react-dom";
import { AlertCircle, Loader2 } from "lucide-react";

export function TextField({
  label,
  name,
  type = "text",
  required,
  defaultValue,
  step,
  className,
  placeholder,
  hint,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string | number;
  step?: string;
  className?: string;
  placeholder?: string;
  hint?: string;
}) {
  return (
    <div className={className}>
      <label className="field-label">
        {label} {required && <span className="text-blue-600">*</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        step={step}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="field-input mt-1.5"
      />
      {hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
    </div>
  );
}

export function TextAreaField({
  label,
  name,
  defaultValue,
  rows = 3,
  className,
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  rows?: number;
  className?: string;
  placeholder?: string;
}) {
  return (
    <div className={className}>
      <label className="field-label">{label}</label>
      <textarea
        name={name}
        defaultValue={defaultValue}
        rows={rows}
        placeholder={placeholder}
        className="field-input mt-1.5 resize-y"
      />
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
      <label className="field-label">
        {label} {required && <span className="text-blue-600">*</span>}
      </label>
      <select
        name={name}
        required={required}
        defaultValue={defaultValue}
        className="field-input mt-1.5"
      >
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
    <label className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:border-blue-200 hover:bg-blue-50/50">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="h-4 w-4 rounded border-slate-300 accent-blue-600"
      />
      {label}
    </label>
  );
}

export function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn btn-primary w-full sm:w-auto">
      {pending && <Loader2 className="h-4 w-4 animate-spin" />}
      {pending ? "Enregistrement..." : children}
    </button>
  );
}

export function FormError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm font-medium text-red-700">
      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
      {message}
    </p>
  );
}

/** Conteneur de formulaire : carte blanche, grille responsive et barre d'actions. */
export function FormShell({
  children,
  actions,
  className = "",
}: {
  children: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`card p-5 sm:p-6 ${className}`}>
      {children}
      {actions && (
        <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-5">
          {actions}
        </div>
      )}
    </div>
  );
}
