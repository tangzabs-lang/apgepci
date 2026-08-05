-- ============================================================
-- Relation client et suivi commercial
-- ============================================================
create table public.prospects (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  name text not null,
  origin text,
  needs text,
  potential text,
  responsible_company_user_id uuid references public.company_users (id) on delete set null,
  status text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'converted', 'lost')),
  next_action text,
  next_action_date date,
  converted_client_id uuid references public.clients (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger prospects_set_updated_at before update on public.prospects
  for each row execute function public.set_updated_at();

create table public.interactions (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  subject_type text not null check (subject_type in ('prospect', 'client')),
  subject_id uuid not null,
  interaction_type text not null check (interaction_type in ('call', 'meeting', 'visit', 'message', 'mail', 'complaint', 'proposal', 'followup')),
  notes text,
  occurred_at timestamptz not null default now(),
  created_by uuid references auth.users (id)
);
create index interactions_subject_idx on public.interactions (subject_type, subject_id);

create table public.opportunities (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  subject_type text not null check (subject_type in ('prospect', 'client')),
  subject_id uuid not null,
  need text,
  estimated_value numeric(14,2),
  probability integer check (probability between 0 and 100),
  stage text not null default 'new'
    check (stage in ('new', 'qualification', 'proposal', 'negotiation', 'won', 'lost')),
  sales_rep_id uuid references public.company_users (id) on delete set null,
  expected_date date,
  result text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger opportunities_set_updated_at before update on public.opportunities
  for each row execute function public.set_updated_at();

create table public.complaints (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  client_id uuid references public.clients (id) on delete set null,
  subject text not null,
  priority text not null default 'normal' check (priority in ('low', 'normal', 'high', 'urgent')),
  assigned_to uuid references auth.users (id),
  deadline date,
  response text,
  status text not null default 'open' check (status in ('open', 'assigned', 'in_progress', 'answered', 'closed')),
  root_cause text,
  created_at timestamptz not null default now(),
  closed_at timestamptz
);

-- ============================================================
-- Projets, contrats et marchés
-- ============================================================
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  code text,
  title text not null,
  client_id uuid references public.clients (id) on delete set null,
  responsible_company_user_id uuid references public.company_users (id) on delete set null,
  start_date date,
  end_date date,
  budget numeric(14,2),
  objectives text,
  status text not null default 'draft'
    check (status in ('draft', 'active', 'on_hold', 'completed', 'cancelled')),
  custom_fields jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (company_id, code)
);
create trigger projects_set_updated_at before update on public.projects
  for each row execute function public.set_updated_at();

alter table public.expenses
  add constraint expenses_project_fk foreign key (project_id) references public.projects (id) on delete set null;
alter table public.purchase_requests
  add constraint purchase_requests_project_fk foreign key (project_id) references public.projects (id) on delete set null;

create table public.project_tasks (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  title text not null,
  responsible_company_user_id uuid references public.company_users (id) on delete set null,
  due_date date,
  progress integer not null default 0 check (progress between 0 and 100),
  status text not null default 'pending' check (status in ('pending', 'in_progress', 'blocked', 'done')),
  blocked_reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger project_tasks_set_updated_at before update on public.project_tasks
  for each row execute function public.set_updated_at();

create table public.project_revenues (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  amount numeric(14,2) not null,
  revenue_date date not null default current_date,
  description text,
  created_at timestamptz not null default now()
);

create table public.project_deliverables (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  name text not null,
  due_date date,
  status text not null default 'pending' check (status in ('pending', 'delivered', 'accepted', 'rejected')),
  document_id uuid
);

-- ============================================================
-- Chaîne d'approvisionnement et logistique
-- ============================================================
create table public.shipments (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  reference text not null,
  origin text,
  destination text,
  carrier text,
  driver text,
  vehicle text,
  goods_description text,
  quantity numeric(14,3),
  planned_date date,
  actual_date date,
  status text not null default 'planned'
    check (status in ('planned', 'in_transit', 'delivered', 'delayed', 'incident', 'cancelled')),
  incidents text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (company_id, reference)
);
create trigger shipments_set_updated_at before update on public.shipments
  for each row execute function public.set_updated_at();
