-- ============================================================
-- Achats et approvisionnements
-- (la table suppliers est créée dans 20260803100005_catalog_clients.sql)
-- ============================================================
create table public.purchase_requests (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  reference text not null,
  requested_by uuid references auth.users (id),
  org_unit_id uuid references public.org_units (id) on delete set null,
  project_id uuid,
  urgency text not null default 'normal' check (urgency in ('low', 'normal', 'high', 'urgent')),
  needed_date date,
  status text not null default 'draft'
    check (status in ('draft', 'submitted', 'approved', 'rejected', 'converted', 'received', 'closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (company_id, reference)
);
create trigger purchase_requests_set_updated_at before update on public.purchase_requests
  for each row execute function public.set_updated_at();

create table public.purchase_request_lines (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.purchase_requests (id) on delete cascade,
  product_id uuid references public.products (id) on delete set null,
  quantity numeric(14,3) not null default 1,
  need_description text
);

create table public.purchase_orders (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  reference text not null,
  supplier_id uuid not null references public.suppliers (id) on delete restrict,
  request_id uuid references public.purchase_requests (id) on delete set null,
  delivery_site_id uuid references public.sites (id) on delete set null,
  status text not null default 'draft'
    check (status in ('draft', 'sent', 'confirmed', 'partially_received', 'received', 'cancelled', 'closed')),
  conditions text,
  total numeric(14,2) not null default 0,
  created_by uuid references auth.users (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (company_id, reference)
);
create trigger purchase_orders_set_updated_at before update on public.purchase_orders
  for each row execute function public.set_updated_at();

create table public.purchase_order_lines (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.purchase_orders (id) on delete cascade,
  product_id uuid references public.products (id) on delete set null,
  quantity numeric(14,3) not null default 1,
  unit_price numeric(14,2) not null default 0
);

create table public.receptions (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  order_id uuid not null references public.purchase_orders (id) on delete cascade,
  received_by uuid references auth.users (id),
  reception_date date not null default current_date,
  notes text,
  created_at timestamptz not null default now()
);

create table public.reception_lines (
  id uuid primary key default gen_random_uuid(),
  reception_id uuid not null references public.receptions (id) on delete cascade,
  order_line_id uuid not null references public.purchase_order_lines (id) on delete cascade,
  quantity_received numeric(14,3) not null default 0,
  quantity_missing numeric(14,3) not null default 0,
  quantity_damaged numeric(14,3) not null default 0,
  notes text
);
