-- ============================================================
-- Cartographie des cycles et processus
-- ============================================================
create table public.processes (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  cycle text not null check (cycle in (
    'ressources_humaines', 'achats', 'production', 'stockage', 'ventes',
    'relation_client', 'chaine_approvisionnement', 'logistique', 'depenses',
    'projets_marches', 'documentaire', 'maintenance', 'qualite', 'formation', 'administration'
  )),
  name text not null,
  objective text,
  responsible_company_user_id uuid references public.company_users (id) on delete set null,
  org_unit_id uuid references public.org_units (id) on delete set null,
  starting_point text,
  steps jsonb not null default '[]'::jsonb,
  actors jsonb not null default '[]'::jsonb,
  documents_used text,
  information_collected text,
  validations_required text,
  expected_result text,
  risks text,
  indicators jsonb not null default '{}'::jsonb,
  frequency text,
  status text not null default 'draft'
    check (status in ('draft', 'in_review', 'submitted', 'validated', 'rejected', 'archived')),
  created_by uuid references auth.users (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger processes_set_updated_at before update on public.processes
  for each row execute function public.set_updated_at();

create table public.process_status_history (
  id uuid primary key default gen_random_uuid(),
  process_id uuid not null references public.processes (id) on delete cascade,
  from_status text,
  to_status text not null,
  comment text,
  changed_by uuid references auth.users (id),
  changed_at timestamptz not null default now()
);

-- ============================================================
-- Modèles sectoriels (3 niveaux : essentiel / opérationnel / avancé)
-- gérés par l'administrateur général, proposés aux entreprises
-- ============================================================
create table public.model_templates (
  id uuid primary key default gen_random_uuid(),
  sector_id uuid references public.sectors (id),
  process_key text not null,
  level smallint not null check (level in (1, 2, 3)),
  name text not null,
  description text,
  advantages text,
  limitations text,
  definition jsonb not null default '{}'::jsonb,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_by uuid references auth.users (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger model_templates_set_updated_at before update on public.model_templates
  for each row execute function public.set_updated_at();

create table public.company_model_selections (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  process_key text not null,
  template_id uuid references public.model_templates (id),
  customizations jsonb not null default '{}'::jsonb,
  status text not null default 'draft'
    check (status in ('draft', 'tested', 'submitted', 'validated', 'active', 'archived')),
  submitted_by uuid references auth.users (id),
  validated_by uuid references auth.users (id),
  validated_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (company_id, process_key)
);
create trigger company_model_selections_set_updated_at before update on public.company_model_selections
  for each row execute function public.set_updated_at();

-- ============================================================
-- Générateur de modèles d'information : tables et champs personnalisables
-- Les entités "système" (clients, articles, ventes...) acceptent des champs
-- personnalisés stockés dans leur colonne custom_fields (jsonb).
-- Les entités totalement personnalisées ("nouvelles tables") sont stockées
-- de façon générique dans custom_records.
-- ============================================================
create type public.field_type as enum (
  'short_text', 'long_text', 'integer', 'decimal', 'amount', 'percentage',
  'date', 'time', 'datetime', 'boolean', 'single_choice', 'multiple_choice',
  'auto_code', 'reference_number', 'address', 'phone', 'email',
  'attachment', 'photo', 'signature', 'status', 'relation', 'formula'
);

create table public.entity_definitions (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  key text not null,
  name text not null,
  plural_name text not null,
  code text,
  description text,
  responsible_company_user_id uuid references public.company_users (id) on delete set null,
  module_key text references public.app_modules (key),
  process_id uuid references public.processes (id) on delete set null,
  source text not null default 'custom' check (source in ('system', 'custom')),
  status text not null default 'draft' check (status in ('draft', 'validated', 'active', 'archived')),
  created_by uuid references auth.users (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (company_id, key)
);
create trigger entity_definitions_set_updated_at before update on public.entity_definitions
  for each row execute function public.set_updated_at();

create table public.field_definitions (
  id uuid primary key default gen_random_uuid(),
  entity_id uuid not null references public.entity_definitions (id) on delete cascade,
  key text not null,
  label text not null,
  field_type public.field_type not null,
  is_required boolean not null default false,
  is_unique boolean not null default false,
  default_value jsonb,
  options jsonb not null default '[]'::jsonb,
  help_text text,
  validation jsonb not null default '{}'::jsonb,
  section text,
  order_index integer not null default 0,
  status text not null default 'active' check (status in ('draft', 'active', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (entity_id, key)
);
create trigger field_definitions_set_updated_at before update on public.field_definitions
  for each row execute function public.set_updated_at();

create table public.entity_relations (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  from_entity_id uuid not null references public.entity_definitions (id) on delete cascade,
  to_entity_id uuid not null references public.entity_definitions (id) on delete cascade,
  field_key text not null,
  relation_type text not null default 'many_to_one' check (relation_type in ('one_to_many', 'many_to_one', 'many_to_many')),
  created_at timestamptz not null default now()
);

create table public.custom_records (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  entity_id uuid not null references public.entity_definitions (id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  status text not null default 'draft' check (status in ('draft', 'submitted', 'validated', 'active', 'archived', 'trashed')),
  created_by uuid references auth.users (id),
  updated_by uuid references auth.users (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);
create index custom_records_entity_idx on public.custom_records (entity_id);
create index custom_records_data_gin_idx on public.custom_records using gin (data);
create trigger custom_records_set_updated_at before update on public.custom_records
  for each row execute function public.set_updated_at();
