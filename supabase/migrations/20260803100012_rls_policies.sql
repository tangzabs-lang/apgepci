-- ============================================================
-- Politiques RLS génériques : isolation stricte par entreprise (2.1)
-- + contrôle par permission de rôle (31.2)
-- ============================================================

create or replace function public.apply_standard_tenant_policies(
  p_table text, p_module text, p_select_action public.permission_action default 'view'
)
returns void language plpgsql as $$
begin
  execute format('alter table public.%I enable row level security', p_table);
  execute format(
    'create policy %I on public.%I for select using (public.has_permission(company_id, %L, %L::public.permission_action))',
    p_table || '_select', p_table, p_module, p_select_action::text
  );
  execute format(
    'create policy %I on public.%I for insert with check (public.has_permission(company_id, %L, ''add''::public.permission_action))',
    p_table || '_insert', p_table, p_module
  );
  execute format(
    'create policy %I on public.%I for update using (public.has_permission(company_id, %L, ''edit''::public.permission_action)) with check (public.has_permission(company_id, %L, ''edit''::public.permission_action))',
    p_table || '_update', p_table, p_module, p_module
  );
  execute format(
    'create policy %I on public.%I for delete using (public.has_permission(company_id, %L, ''delete''::public.permission_action))',
    p_table || '_delete', p_table, p_module
  );
end;
$$;

create or replace function public.apply_child_tenant_policies(
  p_child text, p_parent text, p_fk text, p_module text
)
returns void language plpgsql as $$
begin
  execute format('alter table public.%I enable row level security', p_child);
  execute format(
    'create policy %I on public.%I for select using (exists (select 1 from public.%I par where par.id = public.%I.%I and public.has_permission(par.company_id, %L, ''view''::public.permission_action)))',
    p_child || '_select', p_child, p_parent, p_child, p_fk, p_module
  );
  execute format(
    'create policy %I on public.%I for insert with check (exists (select 1 from public.%I par where par.id = public.%I.%I and public.has_permission(par.company_id, %L, ''add''::public.permission_action)))',
    p_child || '_insert', p_child, p_parent, p_child, p_fk, p_module
  );
  execute format(
    'create policy %I on public.%I for update using (exists (select 1 from public.%I par where par.id = public.%I.%I and public.has_permission(par.company_id, %L, ''edit''::public.permission_action)))',
    p_child || '_update', p_child, p_parent, p_child, p_fk, p_module
  );
  execute format(
    'create policy %I on public.%I for delete using (exists (select 1 from public.%I par where par.id = public.%I.%I and public.has_permission(par.company_id, %L, ''delete''::public.permission_action)))',
    p_child || '_delete', p_child, p_parent, p_child, p_fk, p_module
  );
end;
$$;

-- ------------------------------------------------------------
-- Socle : entreprises, organigramme, rôles, membres
-- ------------------------------------------------------------
alter table public.companies enable row level security;
create policy companies_select on public.companies for select
  using (public.is_company_member(id) or created_by = auth.uid());
create policy companies_insert on public.companies for insert
  with check (auth.uid() is not null and created_by = auth.uid());
create policy companies_update on public.companies for update
  using (public.has_permission(id, 'admin', 'edit'))
  with check (public.has_permission(id, 'admin', 'edit'));

alter table public.company_sectors enable row level security;
create policy company_sectors_select on public.company_sectors for select
  using (public.is_company_member(company_id));
create policy company_sectors_write on public.company_sectors for all
  using (public.has_permission(company_id, 'admin', 'edit'))
  with check (public.has_permission(company_id, 'admin', 'edit'));

select public.apply_standard_tenant_policies('sites', 'admin');
select public.apply_standard_tenant_policies('org_units', 'org');

alter table public.roles enable row level security;
create policy roles_select on public.roles for select using (public.is_company_member(company_id));
create policy roles_write on public.roles for all
  using (public.has_permission(company_id, 'admin', 'administer'))
  with check (public.has_permission(company_id, 'admin', 'administer'));

alter table public.role_permissions enable row level security;
create policy role_permissions_select on public.role_permissions for select using (
  exists (select 1 from public.roles r where r.id = role_permissions.role_id and public.is_company_member(r.company_id))
);
create policy role_permissions_write on public.role_permissions for all using (
  exists (select 1 from public.roles r where r.id = role_permissions.role_id and public.has_permission(r.company_id, 'admin', 'administer'))
) with check (
  exists (select 1 from public.roles r where r.id = role_permissions.role_id and public.has_permission(r.company_id, 'admin', 'administer'))
);

alter table public.company_users enable row level security;
create policy company_users_select on public.company_users for select using (public.is_company_member(company_id));
create policy company_users_write on public.company_users for all
  using (public.has_permission(company_id, 'admin', 'administer'))
  with check (public.has_permission(company_id, 'admin', 'administer'));

-- ------------------------------------------------------------
-- Profils (auth.users mirror)
-- ------------------------------------------------------------
alter table public.profiles enable row level security;
create policy profiles_select_self on public.profiles for select using (id = auth.uid());
create policy profiles_select_colleagues on public.profiles for select using (
  exists (
    select 1 from public.company_users cu1
    join public.company_users cu2 on cu2.company_id = cu1.company_id
    where cu1.user_id = auth.uid() and cu2.user_id = profiles.id
  )
);
create policy profiles_update_self on public.profiles for update using (id = auth.uid()) with check (id = auth.uid());

-- ------------------------------------------------------------
-- Secteurs, catalogue de modules, modèles sectoriels : lecture publique,
-- écriture réservée à l'administrateur général APGEPCI
-- ------------------------------------------------------------
alter table public.sectors enable row level security;
create policy sectors_select_all on public.sectors for select using (true);
create policy sectors_write_platform_admin on public.sectors for all
  using (public.is_platform_admin()) with check (public.is_platform_admin());

alter table public.app_modules enable row level security;
create policy app_modules_select_all on public.app_modules for select using (true);

alter table public.model_templates enable row level security;
create policy model_templates_select_all on public.model_templates for select using (status = 'published' or public.is_platform_admin());
create policy model_templates_write_platform_admin on public.model_templates for all
  using (public.is_platform_admin()) with check (public.is_platform_admin());

-- ------------------------------------------------------------
-- Processus et générateur de modèles
-- ------------------------------------------------------------
select public.apply_standard_tenant_policies('processes', 'org');
select public.apply_child_tenant_policies('process_status_history', 'processes', 'process_id', 'org');

select public.apply_standard_tenant_policies('company_model_selections', 'models');
select public.apply_standard_tenant_policies('entity_definitions', 'models');
select public.apply_child_tenant_policies('field_definitions', 'entity_definitions', 'entity_id', 'models');

alter table public.entity_relations enable row level security;
create policy entity_relations_select on public.entity_relations for select using (public.is_company_member(company_id));
create policy entity_relations_write on public.entity_relations for all
  using (public.has_permission(company_id, 'models', 'edit'))
  with check (public.has_permission(company_id, 'models', 'edit'));

select public.apply_standard_tenant_policies('custom_records', 'models');

-- ------------------------------------------------------------
-- Documents, collaboration, audit, requêtes, tableaux de bord
-- ------------------------------------------------------------
alter table public.documents enable row level security;
create policy documents_select on public.documents for select using (
  public.is_company_member(company_id)
  and (confidentiality <> 'confidential' or uploaded_by = auth.uid() or public.has_permission(company_id, 'documents', 'administer'))
);
create policy documents_insert on public.documents for insert with check (public.is_company_member(company_id));
create policy documents_update on public.documents for update using (
  uploaded_by = auth.uid() or public.has_permission(company_id, 'documents', 'edit')
);
create policy documents_delete on public.documents for delete using (
  uploaded_by = auth.uid() or public.has_permission(company_id, 'documents', 'delete')
);
select public.apply_child_tenant_policies('document_versions', 'documents', 'document_id', 'documents');

alter table public.comments enable row level security;
create policy comments_select on public.comments for select using (public.is_company_member(company_id));
create policy comments_insert on public.comments for insert with check (public.is_company_member(company_id) and author_id = auth.uid());
create policy comments_update on public.comments for update using (author_id = auth.uid());
create policy comments_delete on public.comments for delete using (author_id = auth.uid() or public.has_permission(company_id, 'admin', 'administer'));

alter table public.tasks enable row level security;
create policy tasks_select on public.tasks for select using (public.is_company_member(company_id));
create policy tasks_insert on public.tasks for insert with check (public.is_company_member(company_id) and created_by = auth.uid());
create policy tasks_update on public.tasks for update using (
  created_by = auth.uid() or assignee_id = auth.uid() or public.has_permission(company_id, 'admin', 'administer')
);
create policy tasks_delete on public.tasks for delete using (
  created_by = auth.uid() or public.has_permission(company_id, 'admin', 'administer')
);

alter table public.notifications enable row level security;
create policy notifications_select_self on public.notifications for select using (user_id = auth.uid());
create policy notifications_update_self on public.notifications for update using (user_id = auth.uid()) with check (user_id = auth.uid());

alter table public.audit_log enable row level security;
create policy audit_log_select on public.audit_log for select using (
  company_id is null and public.is_platform_admin()
  or public.has_permission(company_id, 'audit', 'view')
);

alter table public.saved_queries enable row level security;
create policy saved_queries_select on public.saved_queries for select using (
  owner_id = auth.uid() or (is_shared and public.is_company_member(company_id))
);
create policy saved_queries_insert on public.saved_queries for insert with check (public.is_company_member(company_id) and owner_id = auth.uid());
create policy saved_queries_update on public.saved_queries for update using (owner_id = auth.uid());
create policy saved_queries_delete on public.saved_queries for delete using (owner_id = auth.uid());

select public.apply_standard_tenant_policies('report_definitions', 'reports');
select public.apply_child_tenant_policies('report_schedules', 'report_definitions', 'report_id', 'reports');
select public.apply_standard_tenant_policies('dashboards', 'dashboards');
select public.apply_standard_tenant_policies('indicators', 'dashboards');

alter table public.import_jobs enable row level security;
create policy import_jobs_select on public.import_jobs for select using (
  public.has_permission(company_id, entity_key, 'view'::public.permission_action)
  or public.has_permission(company_id, entity_key, 'import'::public.permission_action)
);
create policy import_jobs_insert on public.import_jobs for insert with check (
  public.has_permission(company_id, entity_key, 'import'::public.permission_action)
);
create policy import_jobs_update on public.import_jobs for update using (
  public.has_permission(company_id, entity_key, 'import'::public.permission_action)
);

alter table public.alerts enable row level security;
create policy alerts_select on public.alerts for select using (public.is_company_member(company_id));
create policy alerts_update on public.alerts for update using (public.is_company_member(company_id));

alter table public.approval_steps enable row level security;
create policy approval_steps_select on public.approval_steps for select using (public.is_company_member(company_id));
create policy approval_steps_update on public.approval_steps for update using (
  approver_user_id = auth.uid() or public.has_permission(company_id, 'admin', 'administer')
);
create policy approval_steps_insert on public.approval_steps for insert with check (public.is_company_member(company_id));

-- ------------------------------------------------------------
-- Catalogue et clients
-- ------------------------------------------------------------
select public.apply_standard_tenant_policies('units_of_measure', 'catalog');
select public.apply_standard_tenant_policies('product_categories', 'catalog');
select public.apply_standard_tenant_policies('suppliers', 'purchasing');
select public.apply_standard_tenant_policies('products', 'catalog');
select public.apply_child_tenant_policies('product_prices', 'products', 'product_id', 'catalog');
select public.apply_standard_tenant_policies('client_categories', 'clients');
select public.apply_standard_tenant_policies('clients', 'clients');

-- ------------------------------------------------------------
-- Ventes
-- ------------------------------------------------------------
alter table public.sales_rep_profiles enable row level security;
create policy sales_rep_profiles_select on public.sales_rep_profiles for select using (
  exists (select 1 from public.company_users cu where cu.id = sales_rep_profiles.company_user_id and public.is_company_member(cu.company_id))
);
create policy sales_rep_profiles_write on public.sales_rep_profiles for all using (
  exists (select 1 from public.company_users cu where cu.id = sales_rep_profiles.company_user_id and public.has_permission(cu.company_id, 'sales', 'edit'))
) with check (
  exists (select 1 from public.company_users cu where cu.id = sales_rep_profiles.company_user_id and public.has_permission(cu.company_id, 'sales', 'edit'))
);

alter table public.sales_rep_assignments enable row level security;
create policy sales_rep_assignments_select on public.sales_rep_assignments for select using (
  exists (select 1 from public.company_users cu where cu.id = sales_rep_assignments.company_user_id and public.is_company_member(cu.company_id))
);
create policy sales_rep_assignments_write on public.sales_rep_assignments for all using (
  exists (select 1 from public.company_users cu where cu.id = sales_rep_assignments.company_user_id and public.has_permission(cu.company_id, 'sales', 'edit'))
) with check (
  exists (select 1 from public.company_users cu where cu.id = sales_rep_assignments.company_user_id and public.has_permission(cu.company_id, 'sales', 'edit'))
);

select public.apply_standard_tenant_policies('objectives', 'sales');
select public.apply_standard_tenant_policies('sales', 'sales');
select public.apply_child_tenant_policies('sale_lines', 'sales', 'sale_id', 'sales');
select public.apply_child_tenant_policies('sale_status_history', 'sales', 'sale_id', 'sales');

-- ------------------------------------------------------------
-- Dépenses et prévisions
-- ------------------------------------------------------------
select public.apply_standard_tenant_policies('expense_categories', 'expenses');
select public.apply_standard_tenant_policies('expenses', 'expenses');
select public.apply_standard_tenant_policies('forecasts', 'forecasts');
select public.apply_child_tenant_policies('forecast_actuals_manual', 'forecasts', 'forecast_id', 'forecasts');
select public.apply_child_tenant_policies('variance_comments', 'forecasts', 'forecast_id', 'forecasts');

-- ------------------------------------------------------------
-- Ressources humaines
-- ------------------------------------------------------------
select public.apply_standard_tenant_policies('positions', 'hr');
select public.apply_standard_tenant_policies('employees', 'hr');
select public.apply_child_tenant_policies('employee_assignment_history', 'employees', 'employee_id', 'hr');
select public.apply_standard_tenant_policies('salary_entries', 'hr', 'view_salaries');

-- ------------------------------------------------------------
-- Achats
-- ------------------------------------------------------------
select public.apply_standard_tenant_policies('purchase_requests', 'purchasing');
select public.apply_child_tenant_policies('purchase_request_lines', 'purchase_requests', 'request_id', 'purchasing');
select public.apply_standard_tenant_policies('purchase_orders', 'purchasing');
select public.apply_child_tenant_policies('purchase_order_lines', 'purchase_orders', 'order_id', 'purchasing');
select public.apply_standard_tenant_policies('receptions', 'purchasing');
select public.apply_child_tenant_policies('reception_lines', 'receptions', 'reception_id', 'purchasing');

-- ------------------------------------------------------------
-- Stock
-- ------------------------------------------------------------
select public.apply_standard_tenant_policies('warehouses', 'stock');
select public.apply_standard_tenant_policies('stock_movements', 'stock');
select public.apply_standard_tenant_policies('stock_thresholds', 'stock');
select public.apply_standard_tenant_policies('inventories', 'stock');
select public.apply_child_tenant_policies('inventory_lines', 'inventories', 'inventory_id', 'stock');
alter view public.stock_levels set (security_invoker = on);

-- ------------------------------------------------------------
-- CRM, projets, logistique
-- ------------------------------------------------------------
select public.apply_standard_tenant_policies('prospects', 'crm');
select public.apply_standard_tenant_policies('interactions', 'crm');
select public.apply_standard_tenant_policies('opportunities', 'crm');
select public.apply_standard_tenant_policies('complaints', 'crm');

select public.apply_standard_tenant_policies('projects', 'projects');
select public.apply_child_tenant_policies('project_tasks', 'projects', 'project_id', 'projects');
select public.apply_child_tenant_policies('project_revenues', 'projects', 'project_id', 'projects');
select public.apply_child_tenant_policies('project_deliverables', 'projects', 'project_id', 'projects');

select public.apply_standard_tenant_policies('shipments', 'logistics');
