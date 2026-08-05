-- ============================================================
-- Gestion documentaire
-- ============================================================
create table public.documents (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  entity_table text not null,
  entity_id uuid not null,
  category text,
  confidentiality text not null default 'internal' check (confidentiality in ('public', 'internal', 'confidential')),
  file_path text not null,
  file_name text not null,
  mime_type text,
  file_size bigint,
  version integer not null default 1,
  expires_at date,
  uploaded_by uuid references auth.users (id),
  created_at timestamptz not null default now()
);
create index documents_entity_idx on public.documents (entity_table, entity_id);
create index documents_company_idx on public.documents (company_id);

create table public.document_versions (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references public.documents (id) on delete cascade,
  file_path text not null,
  file_name text not null,
  version integer not null,
  replaced_by uuid references auth.users (id),
  created_at timestamptz not null default now()
);

-- ============================================================
-- Collaboration : commentaires, mentions, tâches, notifications
-- ============================================================
create table public.comments (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  entity_table text not null,
  entity_id uuid not null,
  author_id uuid not null references auth.users (id),
  body text not null,
  mentions uuid[] not null default '{}',
  created_at timestamptz not null default now()
);
create index comments_entity_idx on public.comments (entity_table, entity_id);

create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  title text not null,
  description text,
  assignee_id uuid references auth.users (id),
  due_date date,
  priority text not null default 'normal' check (priority in ('low', 'normal', 'high', 'urgent')),
  status text not null default 'open' check (status in ('open', 'in_progress', 'done', 'cancelled')),
  entity_table text,
  entity_id uuid,
  created_by uuid references auth.users (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger tasks_set_updated_at before update on public.tasks
  for each row execute function public.set_updated_at();

create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  type text not null,
  title text not null,
  body text,
  link text,
  read_at timestamptz,
  created_at timestamptz not null default now()
);
create index notifications_user_idx on public.notifications (user_id, read_at);

-- ============================================================
-- Journal d'audit et traçabilité
-- ============================================================
create table public.audit_log (
  id uuid primary key default gen_random_uuid(),
  company_id uuid references public.companies (id) on delete cascade,
  user_id uuid references auth.users (id),
  action text not null,
  module text,
  entity_table text,
  entity_id uuid,
  before_data jsonb,
  after_data jsonb,
  reason text,
  risk_level text not null default 'normal' check (risk_level in ('low', 'normal', 'high')),
  created_at timestamptz not null default now()
);
create index audit_log_company_idx on public.audit_log (company_id, created_at desc);
create index audit_log_entity_idx on public.audit_log (entity_table, entity_id);

create or replace function public.write_audit_log(
  p_company_id uuid, p_action text, p_module text, p_entity_table text,
  p_entity_id uuid, p_before jsonb, p_after jsonb, p_reason text default null,
  p_risk_level text default 'normal'
)
returns uuid
language plpgsql
security definer set search_path = public
as $$
declare
  v_id uuid;
begin
  insert into public.audit_log (company_id, user_id, action, module, entity_table, entity_id, before_data, after_data, reason, risk_level)
  values (p_company_id, auth.uid(), p_action, p_module, p_entity_table, p_entity_id, p_before, p_after, p_reason, p_risk_level)
  returning id into v_id;
  return v_id;
end;
$$;

-- ============================================================
-- Requêtes enregistrées, états, tableaux de bord, indicateurs
-- ============================================================
create table public.saved_queries (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  owner_id uuid not null references auth.users (id),
  name text not null,
  query_type text not null default 'detailed_search' check (query_type in (
    'detailed_search', 'group_and_total', 'ranking', 'period_comparison',
    'forecast_vs_actual', 'variance_analysis', 'expense_analysis',
    'margin_analysis', 'anomaly_detection', 'cross_analysis'
  )),
  config jsonb not null default '{}'::jsonb,
  is_shared boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger saved_queries_set_updated_at before update on public.saved_queries
  for each row execute function public.set_updated_at();

create table public.report_definitions (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  name text not null,
  description text,
  source text not null,
  config jsonb not null default '{}'::jsonb,
  is_standard boolean not null default false,
  created_by uuid references auth.users (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger report_definitions_set_updated_at before update on public.report_definitions
  for each row execute function public.set_updated_at();

create table public.report_schedules (
  id uuid primary key default gen_random_uuid(),
  report_id uuid not null references public.report_definitions (id) on delete cascade,
  frequency text not null check (frequency in ('daily', 'weekly', 'monthly', 'quarterly', 'yearly')),
  recipients text[] not null default '{}',
  is_active boolean not null default true,
  next_run_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.dashboards (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  key text not null,
  name text not null,
  layout jsonb not null default '[]'::jsonb,
  created_by uuid references auth.users (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (company_id, key)
);
create trigger dashboards_set_updated_at before update on public.dashboards
  for each row execute function public.set_updated_at();

create table public.indicators (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  name text not null,
  objective text,
  source text not null,
  period_type text not null default 'monthly',
  calculation_method jsonb not null default '{}'::jsonb,
  target_value numeric,
  alert_threshold numeric,
  responsible_company_user_id uuid references public.company_users (id) on delete set null,
  display_mode text not null default 'number'
    check (display_mode in ('number', 'percentage', 'table', 'curve', 'bar', 'ranking', 'progress', 'alert', 'comparison')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger indicators_set_updated_at before update on public.indicators
  for each row execute function public.set_updated_at();

-- ============================================================
-- Imports
-- ============================================================
create table public.import_jobs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  entity_key text not null,
  file_name text not null,
  status text not null default 'pending'
    check (status in ('pending', 'mapping', 'validating', 'previewing', 'completed', 'failed', 'cancelled')),
  total_rows integer not null default 0,
  success_rows integer not null default 0,
  error_rows integer not null default 0,
  column_mapping jsonb not null default '{}'::jsonb,
  error_report jsonb not null default '[]'::jsonb,
  created_by uuid references auth.users (id),
  created_at timestamptz not null default now(),
  completed_at timestamptz,
  undone_at timestamptz
);

-- ============================================================
-- Alertes et anomalies
-- ============================================================
create table public.alerts (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  type text not null check (type in (
    'missing_data', 'duplicate', 'unusual_expense', 'low_sales', 'objective_missed',
    'delay', 'expired_document', 'critical_stock', 'inactive_user',
    'pending_validation', 'inventory_variance', 'incomplete_import'
  )),
  severity text not null default 'medium' check (severity in ('low', 'medium', 'high')),
  entity_table text,
  entity_id uuid,
  title text not null,
  description text,
  status text not null default 'open' check (status in ('open', 'assigned', 'commented', 'treated', 'postponed', 'closed', 'reopened')),
  assigned_to uuid references auth.users (id),
  created_at timestamptz not null default now(),
  closed_at timestamptz
);
create index alerts_company_idx on public.alerts (company_id, status);

-- ============================================================
-- Validations et circuits d'approbation (générique)
-- ============================================================
create table public.approval_steps (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  entity_table text not null,
  entity_id uuid not null,
  step_order integer not null default 1,
  approver_role_id uuid references public.roles (id),
  approver_user_id uuid references auth.users (id),
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected', 'delegated')),
  comment text,
  decided_at timestamptz,
  created_at timestamptz not null default now()
);
create index approval_steps_entity_idx on public.approval_steps (entity_table, entity_id);
