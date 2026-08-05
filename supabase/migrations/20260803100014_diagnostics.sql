-- ============================================================
-- Questionnaire de diagnostic initial (section 4.2 / 4.3)
-- ============================================================
create table public.company_diagnostics (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade unique,
  answers jsonb not null default '{}'::jsonb,
  recommended_modules text[] not null default '{}',
  status text not null default 'draft' check (status in ('draft', 'completed', 'validated')),
  completed_at timestamptz,
  validated_by uuid references auth.users (id),
  validated_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger company_diagnostics_set_updated_at before update on public.company_diagnostics
  for each row execute function public.set_updated_at();

select public.apply_standard_tenant_policies('company_diagnostics', 'org');
