-- ============================================================
-- Commerciaux : profil étendu au-dessus de company_users
-- ============================================================
create table public.sales_rep_profiles (
  company_user_id uuid primary key references public.company_users (id) on delete cascade,
  zone text,
  product_category_ids uuid[] not null default '{}',
  status text not null default 'active' check (status in ('active', 'inactive')),
  created_at timestamptz not null default now()
);

create table public.sales_rep_assignments (
  id uuid primary key default gen_random_uuid(),
  company_user_id uuid not null references public.company_users (id) on delete cascade,
  assignment_type text not null check (assignment_type in ('zone', 'site', 'client_portfolio', 'product_range', 'market', 'team', 'period')),
  reference_id uuid,
  label text,
  period_start date,
  period_end date,
  created_at timestamptz not null default now()
);

-- ============================================================
-- Objectifs (utilisés aussi par le module Prévisions)
-- ============================================================
create table public.objectives (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  subject_type text not null check (subject_type in ('sales_rep', 'org_unit', 'company', 'product', 'client')),
  subject_id uuid,
  metric text not null default 'revenue' check (metric in ('revenue', 'quantity', 'new_clients', 'margin', 'count')),
  period_start date not null,
  period_end date not null,
  target_value numeric(14,2) not null,
  created_by uuid references auth.users (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger objectives_set_updated_at before update on public.objectives
  for each row execute function public.set_updated_at();

-- ============================================================
-- Ventes
-- ============================================================
create table public.sales (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  reference text not null,
  sale_date date not null default current_date,
  client_id uuid references public.clients (id) on delete set null,
  sales_rep_id uuid references public.company_users (id) on delete set null,
  site_id uuid references public.sites (id) on delete set null,
  status text not null default 'draft'
    check (status in ('draft', 'pending', 'validated', 'delivered', 'partially_delivered', 'cancelled', 'closed')),
  subtotal numeric(14,2) not null default 0,
  discount_total numeric(14,2) not null default 0,
  tax_total numeric(14,2) not null default 0,
  total numeric(14,2) not null default 0,
  notes text,
  cancel_reason text,
  custom_fields jsonb not null default '{}'::jsonb,
  created_by uuid references auth.users (id),
  validated_by uuid references auth.users (id),
  validated_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (company_id, reference)
);
create index sales_company_date_idx on public.sales (company_id, sale_date);
create index sales_client_idx on public.sales (client_id);
create index sales_rep_idx on public.sales (sales_rep_id);
create trigger sales_set_updated_at before update on public.sales
  for each row execute function public.set_updated_at();

create table public.sale_lines (
  id uuid primary key default gen_random_uuid(),
  sale_id uuid not null references public.sales (id) on delete cascade,
  product_id uuid references public.products (id) on delete set null,
  quantity numeric(14,3) not null default 1,
  unit_price numeric(14,2) not null default 0,
  discount numeric(14,2) not null default 0,
  tax_rate numeric(5,2) not null default 0,
  line_total numeric(14,2) not null default 0,
  created_at timestamptz not null default now()
);
create index sale_lines_sale_idx on public.sale_lines (sale_id);

create table public.sale_status_history (
  id uuid primary key default gen_random_uuid(),
  sale_id uuid not null references public.sales (id) on delete cascade,
  from_status text,
  to_status text not null,
  reason text,
  changed_by uuid references auth.users (id),
  changed_at timestamptz not null default now()
);
