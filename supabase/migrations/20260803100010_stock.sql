-- ============================================================
-- Stockage et inventaire
-- ============================================================
create table public.warehouses (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  site_id uuid references public.sites (id) on delete set null,
  name text not null,
  type text not null default 'magasin'
    check (type in ('magasin', 'depot', 'entrepot', 'reserve', 'emplacement', 'vehicule', 'temporaire')),
  status text not null default 'active' check (status in ('active', 'inactive')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger warehouses_set_updated_at before update on public.warehouses
  for each row execute function public.set_updated_at();

create table public.stock_movements (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  warehouse_id uuid not null references public.warehouses (id) on delete restrict,
  product_id uuid not null references public.products (id) on delete restrict,
  movement_type text not null check (movement_type in (
    'entry', 'exit', 'transfer', 'return', 'correction', 'loss', 'breakage',
    'consumption', 'production', 'inventory'
  )),
  quantity numeric(14,3) not null,
  lot_number text,
  expiry_date date,
  reference_table text,
  reference_id uuid,
  performed_by uuid references auth.users (id),
  moved_at timestamptz not null default now(),
  notes text
);
create index stock_movements_warehouse_product_idx on public.stock_movements (warehouse_id, product_id);
create index stock_movements_company_idx on public.stock_movements (company_id, moved_at);

-- Stock courant calculé (quantité signée selon le type de mouvement)
create or replace view public.stock_levels as
select
  sm.company_id,
  sm.warehouse_id,
  sm.product_id,
  sm.lot_number,
  sum(
    case
      when sm.movement_type in ('entry', 'return', 'production') then sm.quantity
      when sm.movement_type in ('exit', 'loss', 'breakage', 'consumption') then -sm.quantity
      when sm.movement_type = 'transfer' then sm.quantity
      when sm.movement_type in ('correction', 'inventory') then sm.quantity
      else 0
    end
  ) as quantity_on_hand,
  min(sm.expiry_date) filter (where sm.expiry_date is not null) as nearest_expiry
from public.stock_movements sm
group by sm.company_id, sm.warehouse_id, sm.product_id, sm.lot_number;

create table public.stock_thresholds (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  warehouse_id uuid references public.warehouses (id) on delete cascade,
  product_id uuid not null references public.products (id) on delete cascade,
  min_quantity numeric(14,3),
  max_quantity numeric(14,3),
  unique (warehouse_id, product_id)
);

create table public.inventories (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  warehouse_id uuid not null references public.warehouses (id) on delete cascade,
  status text not null default 'preparing' check (status in ('preparing', 'counting', 'reviewing', 'validated', 'closed')),
  started_at timestamptz not null default now(),
  closed_at timestamptz,
  performed_by uuid references auth.users (id),
  created_at timestamptz not null default now()
);

create table public.inventory_lines (
  id uuid primary key default gen_random_uuid(),
  inventory_id uuid not null references public.inventories (id) on delete cascade,
  product_id uuid not null references public.products (id) on delete restrict,
  lot_number text,
  expected_quantity numeric(14,3) not null default 0,
  counted_quantity numeric(14,3),
  variance_reason text
);
