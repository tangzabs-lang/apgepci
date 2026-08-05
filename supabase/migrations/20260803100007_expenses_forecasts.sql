-- ============================================================
-- Dépenses et charges
-- ============================================================
create table public.expense_categories (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  parent_id uuid references public.expense_categories (id) on delete set null,
  name text not null,
  created_at timestamptz not null default now(),
  unique (company_id, name, parent_id)
);

create table public.expenses (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  reference text not null,
  expense_date date not null default current_date,
  category_id uuid references public.expense_categories (id) on delete set null,
  amount numeric(14,2) not null,
  beneficiary text,
  org_unit_id uuid references public.org_units (id) on delete set null,
  project_id uuid,
  sales_rep_id uuid references public.company_users (id) on delete set null,
  related_sale_id uuid references public.sales (id) on delete set null,
  payment_method text,
  status text not null default 'draft'
    check (status in ('draft', 'requested', 'pending_approval', 'approved', 'rejected', 'paid')),
  justification_document_id uuid,
  notes text,
  custom_fields jsonb not null default '{}'::jsonb,
  created_by uuid references auth.users (id),
  approved_by uuid references auth.users (id),
  approved_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (company_id, reference)
);
create index expenses_company_date_idx on public.expenses (company_id, expense_date);
create trigger expenses_set_updated_at before update on public.expenses
  for each row execute function public.set_updated_at();

-- ============================================================
-- Prévisions, réalisations et écarts
-- ============================================================
create table public.forecasts (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  subject text not null check (subject in (
    'sales', 'purchases', 'expenses', 'production', 'recruitment', 'stock',
    'projects', 'markets', 'revenue', 'quantity', 'commercial_objective'
  )),
  period_type text not null default 'monthly' check (period_type in ('daily', 'weekly', 'monthly', 'quarterly', 'biannual', 'yearly', 'custom')),
  period_start date not null,
  period_end date not null,
  scope_type text not null default 'company' check (scope_type in ('company', 'site', 'org_unit', 'sales_rep', 'product', 'project')),
  scope_id uuid,
  target_value numeric(14,2) not null,
  created_by uuid references auth.users (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index forecasts_company_period_idx on public.forecasts (company_id, subject, period_start, period_end);
create trigger forecasts_set_updated_at before update on public.forecasts
  for each row execute function public.set_updated_at();

-- Pour les sujets sans source automatique (ex: recrutements), saisie manuelle des réalisations.
create table public.forecast_actuals_manual (
  id uuid primary key default gen_random_uuid(),
  forecast_id uuid not null references public.forecasts (id) on delete cascade,
  actual_value numeric(14,2) not null,
  recorded_by uuid references auth.users (id),
  recorded_at timestamptz not null default now()
);

create table public.variance_comments (
  id uuid primary key default gen_random_uuid(),
  forecast_id uuid not null references public.forecasts (id) on delete cascade,
  comment text,
  cause text,
  corrective_action text,
  responsible_id uuid references auth.users (id),
  due_date date,
  status text not null default 'open' check (status in ('open', 'in_progress', 'done')),
  created_by uuid references auth.users (id),
  created_at timestamptz not null default now()
);
