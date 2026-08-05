-- ============================================================
-- Secteurs d'activité (catalogue global, gérable par l'administrateur général)
-- ============================================================
create table public.sectors (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  name text not null,
  description text,
  parent_id uuid references public.sectors (id),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger sectors_set_updated_at before update on public.sectors
  for each row execute function public.set_updated_at();

-- ============================================================
-- Profils utilisateurs (miroir de auth.users)
-- ============================================================
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  avatar_url text,
  phone text,
  locale text not null default 'fr',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger profiles_set_updated_at before update on public.profiles
  for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- Entreprises (tenants)
-- ============================================================
create table public.companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  trade_name text,
  legal_form text,
  founded_date date,
  country text,
  city text,
  address text,
  contacts jsonb not null default '{}'::jsonb,
  logo_url text,
  currency text not null default 'XOF',
  language text not null default 'fr',
  timezone text not null default 'Africa/Abidjan',
  employees_count_declared integer,
  sites_count_declared integer,
  size_estimate text,
  activity_description text,
  fiscal_year_start_month integer not null default 1,
  status text not null default 'active' check (status in ('active', 'suspended', 'archived')),
  created_by uuid references auth.users (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger companies_set_updated_at before update on public.companies
  for each row execute function public.set_updated_at();

create table public.company_sectors (
  company_id uuid not null references public.companies (id) on delete cascade,
  sector_id uuid not null references public.sectors (id),
  is_primary boolean not null default false,
  primary key (company_id, sector_id)
);

-- ============================================================
-- Sites / agences / magasins / ateliers / établissements
-- ============================================================
create table public.sites (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  name text not null,
  code text,
  type text not null default 'agence'
    check (type in ('siege', 'agence', 'magasin', 'entrepot', 'atelier', 'etablissement', 'autre')),
  country text,
  city text,
  address text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (company_id, code)
);
create trigger sites_set_updated_at before update on public.sites
  for each row execute function public.set_updated_at();

-- ============================================================
-- Organigramme
-- ============================================================
create table public.org_units (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  parent_id uuid references public.org_units (id) on delete set null,
  site_id uuid references public.sites (id) on delete set null,
  name text not null,
  code text,
  type text not null default 'service'
    check (type in ('direction_generale', 'direction', 'departement', 'service', 'unite',
                     'agence', 'magasin', 'atelier', 'etablissement', 'equipe', 'poste')),
  mission text,
  objectives text,
  functions text,
  indicators jsonb not null default '{}'::jsonb,
  responsible_company_user_id uuid,
  status text not null default 'active' check (status in ('active', 'inactive')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (company_id, code)
);
create index org_units_parent_idx on public.org_units (parent_id);
create index org_units_company_idx on public.org_units (company_id);
create trigger org_units_set_updated_at before update on public.org_units
  for each row execute function public.set_updated_at();

-- ============================================================
-- Rôles, permissions, membres d'entreprise
-- ============================================================
create table public.app_modules (
  key text primary key,
  name text not null,
  order_index integer not null default 0
);

insert into public.app_modules (key, name, order_index) values
  ('admin', 'Administration', 0),
  ('org', 'Organigramme et processus', 1),
  ('models', 'Générateur de modèles', 2),
  ('catalog', 'Articles et services', 3),
  ('clients', 'Clients', 4),
  ('sales', 'Ventes', 5),
  ('expenses', 'Dépenses', 6),
  ('forecasts', 'Prévisions et écarts', 7),
  ('hr', 'Ressources humaines', 8),
  ('purchasing', 'Achats', 9),
  ('stock', 'Stock', 10),
  ('production', 'Production', 11),
  ('crm', 'Relation client', 12),
  ('projects', 'Projets et marchés', 13),
  ('logistics', 'Logistique', 14),
  ('documents', 'Documents', 15),
  ('reports', 'Requêtes et états', 16),
  ('dashboards', 'Tableaux de bord', 17),
  ('audit', 'Journal d''audit', 18);

create type public.permission_action as enum (
  'view', 'add', 'edit', 'delete', 'archive', 'validate', 'reject',
  'import', 'export', 'print', 'share', 'view_history', 'view_amounts',
  'view_salaries', 'administer'
);

create table public.roles (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  key text not null,
  name text not null,
  description text,
  is_system boolean not null default false,
  created_at timestamptz not null default now(),
  unique (company_id, key)
);

create table public.role_permissions (
  role_id uuid not null references public.roles (id) on delete cascade,
  module_key text not null references public.app_modules (key),
  action public.permission_action not null,
  primary key (role_id, module_key, action)
);

create table public.company_users (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  role_id uuid not null references public.roles (id),
  org_unit_id uuid references public.org_units (id) on delete set null,
  site_id uuid references public.sites (id) on delete set null,
  scope_level text not null default 'own'
    check (scope_level in ('own', 'team', 'service', 'department', 'site', 'project', 'company')),
  status text not null default 'active' check (status in ('active', 'suspended')),
  invited_by uuid references auth.users (id),
  joined_at timestamptz not null default now(),
  unique (company_id, user_id)
);
create index company_users_user_idx on public.company_users (user_id);

alter table public.org_units
  add constraint org_units_responsible_fk
  foreign key (responsible_company_user_id) references public.company_users (id) on delete set null;

-- ============================================================
-- Rôles par défaut créés automatiquement à la création d'une entreprise
-- ============================================================
create or replace function public.create_default_roles(p_company_id uuid)
returns void
language plpgsql
security definer set search_path = public
as $$
declare
  v_role_id uuid;
  v_all_actions public.permission_action[] := enum_range(null::public.permission_action);
  v_all_modules text[];
  v_module text;
  v_action public.permission_action;
begin
  select array_agg(key) into v_all_modules from public.app_modules;

  -- Propriétaire : tous les droits sur tous les modules
  insert into public.roles (company_id, key, name, description, is_system)
  values (p_company_id, 'owner', 'Propriétaire / Dirigeant', 'Accès complet à l''entreprise', true)
  returning id into v_role_id;
  foreach v_module in array v_all_modules loop
    foreach v_action in array v_all_actions loop
      insert into public.role_permissions (role_id, module_key, action) values (v_role_id, v_module, v_action)
      on conflict do nothing;
    end loop;
  end loop;

  -- Administrateur entreprise : tout sauf administration plateforme
  insert into public.roles (company_id, key, name, description, is_system)
  values (p_company_id, 'company_admin', 'Administrateur de l''entreprise', 'Gestion quotidienne de l''espace', true)
  returning id into v_role_id;
  foreach v_module in array v_all_modules loop
    foreach v_action in array v_all_actions loop
      if not (v_module = 'admin' and v_action = 'administer') then
        insert into public.role_permissions (role_id, module_key, action) values (v_role_id, v_module, v_action)
        on conflict do nothing;
      end if;
    end loop;
  end loop;

  -- Responsable de service : voir/ajouter/modifier/valider/exporter/imprimer sur son périmètre
  insert into public.roles (company_id, key, name, description, is_system)
  values (p_company_id, 'department_manager', 'Responsable de service', 'Gestion des données de son périmètre', true)
  returning id into v_role_id;
  foreach v_module in array v_all_modules loop
    if v_module not in ('admin', 'audit') then
      foreach v_action in array array['view','add','edit','validate','reject','export','print','view_history']::public.permission_action[] loop
        insert into public.role_permissions (role_id, module_key, action) values (v_role_id, v_module, v_action)
        on conflict do nothing;
      end loop;
    end if;
  end loop;

  -- Agent de saisie : voir/ajouter/modifier (non validé)
  insert into public.roles (company_id, key, name, description, is_system)
  values (p_company_id, 'data_entry', 'Agent de saisie', 'Saisie des données', true)
  returning id into v_role_id;
  foreach v_module in array v_all_modules loop
    if v_module not in ('admin', 'audit') then
      foreach v_action in array array['view','add','edit']::public.permission_action[] loop
        insert into public.role_permissions (role_id, module_key, action) values (v_role_id, v_module, v_action)
        on conflict do nothing;
      end loop;
    end if;
  end loop;

  -- Analyste / contrôleur : lecture, requêtes, exports
  insert into public.roles (company_id, key, name, description, is_system)
  values (p_company_id, 'analyst', 'Analyste / Contrôleur', 'Analyse et reporting', true)
  returning id into v_role_id;
  foreach v_module in array v_all_modules loop
    foreach v_action in array array['view','export','print']::public.permission_action[] loop
      insert into public.role_permissions (role_id, module_key, action) values (v_role_id, v_module, v_action)
      on conflict do nothing;
    end loop;
  end loop;

  -- Auditeur : lecture seule + historique
  insert into public.roles (company_id, key, name, description, is_system)
  values (p_company_id, 'auditor', 'Auditeur', 'Accès en lecture seule', true)
  returning id into v_role_id;
  foreach v_module in array v_all_modules loop
    foreach v_action in array array['view','view_history']::public.permission_action[] loop
      insert into public.role_permissions (role_id, module_key, action) values (v_role_id, v_module, v_action)
      on conflict do nothing;
    end loop;
  end loop;

  -- Utilisateur simple : lecture limitée (le périmètre est géré via scope_level)
  insert into public.roles (company_id, key, name, description, is_system)
  values (p_company_id, 'simple_user', 'Utilisateur simple', 'Accès limité à ses propres données', true)
  returning id into v_role_id;
  foreach v_module in array v_all_modules loop
    if v_module not in ('admin', 'audit') then
      insert into public.role_permissions (role_id, module_key, action) values (v_role_id, v_module, 'view')
      on conflict do nothing;
    end if;
  end loop;
end;
$$;

create or replace function public.handle_new_company()
returns trigger
language plpgsql
security definer set search_path = public
as $$
declare
  v_owner_role_id uuid;
begin
  perform public.create_default_roles(new.id);
  select id into v_owner_role_id from public.roles where company_id = new.id and key = 'owner';
  if new.created_by is not null then
    insert into public.company_users (company_id, user_id, role_id, scope_level, status)
    values (new.id, new.created_by, v_owner_role_id, 'company', 'active');
  end if;
  return new;
end;
$$;

create trigger on_company_created
  after insert on public.companies
  for each row execute function public.handle_new_company();

-- ============================================================
-- Fonctions utilitaires d'accès (utilisées par les policies RLS)
-- ============================================================
create or replace function public.my_company_ids()
returns setof uuid
language sql
security definer
set search_path = public
stable
as $$
  select company_id from public.company_users
  where user_id = auth.uid() and status = 'active';
$$;

create or replace function public.is_company_member(p_company_id uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.company_users
    where company_id = p_company_id and user_id = auth.uid() and status = 'active'
  ) or public.is_platform_admin();
$$;

create or replace function public.has_permission(p_company_id uuid, p_module text, p_action public.permission_action)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.company_users cu
    join public.role_permissions rp on rp.role_id = cu.role_id
    where cu.company_id = p_company_id
      and cu.user_id = auth.uid()
      and cu.status = 'active'
      and rp.module_key = p_module
      and rp.action = p_action
  ) or public.is_platform_admin();
$$;

-- Unités de l'organigramme accessibles selon le périmètre (scope) de l'utilisateur
create or replace function public.user_org_scope_ids(p_company_id uuid)
returns setof uuid
language sql
security definer
set search_path = public
stable
as $$
  with recursive my_membership as (
    select org_unit_id, scope_level
    from public.company_users
    where company_id = p_company_id and user_id = auth.uid() and status = 'active'
  ),
  descendants as (
    select ou.id, ou.parent_id
    from public.org_units ou, my_membership m
    where m.scope_level in ('service', 'department', 'team') and ou.id = m.org_unit_id
    union all
    select child.id, child.parent_id
    from public.org_units child
    join descendants d on child.parent_id = d.id
  )
  select id from descendants
  union
  select org_unit_id from my_membership where org_unit_id is not null;
$$;
