-- ============================================================
-- Ressources humaines : postes, employés, salaires
-- ============================================================
create table public.positions (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  org_unit_id uuid references public.org_units (id) on delete set null,
  title text not null,
  mission text,
  responsibilities text,
  expected_skills text,
  headcount integer not null default 1,
  level text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger positions_set_updated_at before update on public.positions
  for each row execute function public.set_updated_at();

create table public.employees (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  matricule text,
  company_user_id uuid references public.company_users (id) on delete set null,
  first_name text not null,
  last_name text not null,
  birth_date date,
  gender text check (gender in ('male', 'female', 'undisclosed')),
  phone text,
  email text,
  address text,
  hire_date date,
  departure_date date,
  org_unit_id uuid references public.org_units (id) on delete set null,
  function_title text,
  position_id uuid references public.positions (id) on delete set null,
  manager_company_user_id uuid references public.company_users (id) on delete set null,
  site_id uuid references public.sites (id) on delete set null,
  contract_type text check (contract_type in ('cdi', 'cdd', 'stage', 'prestataire', 'journalier', 'autre')),
  base_salary numeric(14,2),
  commission_rule jsonb not null default '{}'::jsonb,
  status text not null default 'active' check (status in ('active', 'on_leave', 'departed')),
  custom_fields jsonb not null default '{}'::jsonb,
  created_by uuid references auth.users (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (company_id, matricule)
);
create index employees_company_idx on public.employees (company_id);
create index employees_org_unit_idx on public.employees (org_unit_id);
create trigger employees_set_updated_at before update on public.employees
  for each row execute function public.set_updated_at();

create table public.employee_assignment_history (
  id uuid primary key default gen_random_uuid(),
  employee_id uuid not null references public.employees (id) on delete cascade,
  org_unit_id uuid references public.org_units (id),
  position_id uuid references public.positions (id),
  effective_date date not null,
  reason text,
  created_by uuid references auth.users (id),
  created_at timestamptz not null default now()
);

create table public.salary_entries (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  employee_id uuid not null references public.employees (id) on delete cascade,
  period_start date not null,
  period_end date not null,
  base_salary numeric(14,2) not null default 0,
  bonuses numeric(14,2) not null default 0,
  commissions numeric(14,2) not null default 0,
  deductions numeric(14,2) not null default 0,
  net_total numeric(14,2) generated always as (base_salary + bonuses + commissions - deductions) stored,
  status text not null default 'draft' check (status in ('draft', 'validated', 'paid')),
  justification_document_id uuid,
  created_by uuid references auth.users (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index salary_entries_employee_idx on public.salary_entries (employee_id, period_start);
create trigger salary_entries_set_updated_at before update on public.salary_entries
  for each row execute function public.set_updated_at();
