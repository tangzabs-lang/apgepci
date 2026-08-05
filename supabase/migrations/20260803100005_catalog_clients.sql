-- ============================================================
-- Catalogue : catégories, unités, articles/produits/services, tarification
-- ============================================================
create table public.units_of_measure (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  name text not null,
  symbol text not null,
  created_at timestamptz not null default now(),
  unique (company_id, symbol)
);

create table public.product_categories (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  parent_id uuid references public.product_categories (id) on delete set null,
  name text not null,
  code text,
  kind text not null default 'category' check (kind in ('category', 'family', 'range', 'brand', 'service_type', 'market_type')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (company_id, code)
);
create trigger product_categories_set_updated_at before update on public.product_categories
  for each row execute function public.set_updated_at();

create table public.suppliers ( -- forward-referenced by products.primary_supplier_id
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  code text,
  name text not null,
  contacts jsonb not null default '{}'::jsonb,
  address text,
  products_supplied text,
  conditions text,
  lead_time_days integer,
  status text not null default 'active' check (status in ('active', 'inactive')),
  custom_fields jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (company_id, code)
);
create trigger suppliers_set_updated_at before update on public.suppliers
  for each row execute function public.set_updated_at();

create table public.products (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  category_id uuid references public.product_categories (id) on delete set null,
  code text,
  name text not null,
  description text,
  kind text not null default 'product' check (kind in ('product', 'service', 'market')),
  unit_id uuid references public.units_of_measure (id),
  purchase_price numeric(14,2),
  cost numeric(14,2),
  sale_price numeric(14,2),
  tax_rate numeric(5,2) not null default 0,
  image_url text,
  primary_supplier_id uuid references public.suppliers (id) on delete set null,
  status text not null default 'active' check (status in ('active', 'inactive', 'archived')),
  custom_fields jsonb not null default '{}'::jsonb,
  created_by uuid references auth.users (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (company_id, code)
);
create index products_company_idx on public.products (company_id);
create index products_name_trgm_idx on public.products using gin (name gin_trgm_ops);
create trigger products_set_updated_at before update on public.products
  for each row execute function public.set_updated_at();

create table public.product_prices (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  product_id uuid not null references public.products (id) on delete cascade,
  price_type text not null default 'standard' check (price_type in ('standard', 'client_category', 'period', 'promotional', 'negotiated', 'site')),
  client_category text,
  site_id uuid references public.sites (id) on delete cascade,
  valid_from date,
  valid_to date,
  price numeric(14,2) not null,
  created_by uuid references auth.users (id),
  created_at timestamptz not null default now()
);
create index product_prices_product_idx on public.product_prices (product_id);

-- ============================================================
-- Clients
-- ============================================================
create table public.client_categories (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  name text not null,
  created_at timestamptz not null default now(),
  unique (company_id, name)
);

create table public.clients (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  code text,
  client_type text not null default 'individual' check (client_type in ('individual', 'company')),
  name text not null,
  contact_name text,
  phone text,
  email text,
  address text,
  city text,
  sector_id uuid references public.sectors (id),
  sales_rep_id uuid references public.company_users (id) on delete set null,
  category_id uuid references public.client_categories (id) on delete set null,
  relationship_start_date date,
  status text not null default 'active' check (status in ('active', 'inactive', 'archived')),
  loyalty_level text,
  risk_level text not null default 'normal' check (risk_level in ('low', 'normal', 'high')),
  notes text,
  custom_fields jsonb not null default '{}'::jsonb,
  created_by uuid references auth.users (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (company_id, code)
);
create index clients_company_idx on public.clients (company_id);
create index clients_name_trgm_idx on public.clients using gin (name gin_trgm_ops);
create index clients_phone_idx on public.clients (company_id, phone);
create index clients_email_idx on public.clients (company_id, email);
create trigger clients_set_updated_at before update on public.clients
  for each row execute function public.set_updated_at();
