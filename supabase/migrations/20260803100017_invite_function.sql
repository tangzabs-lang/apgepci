-- Permet à un administrateur d'entreprise d'ajouter un utilisateur existant
-- (déjà inscrit sur APGEPCI) à son entreprise à partir de son e-mail, sans
-- exposer la table auth.users côté client.
create or replace function public.invite_user_by_email(
  p_company_id uuid, p_email text, p_role_key text, p_org_unit_id uuid default null, p_scope_level text default 'own'
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid;
  v_role_id uuid;
  v_membership_id uuid;
begin
  if not public.has_permission(p_company_id, 'admin', 'administer') then
    raise exception 'Permission refusée.';
  end if;

  select id into v_user_id from auth.users where lower(email) = lower(p_email);
  if v_user_id is null then
    raise exception 'Aucun utilisateur inscrit avec cet e-mail.';
  end if;

  select id into v_role_id from public.roles where company_id = p_company_id and key = p_role_key;
  if v_role_id is null then
    raise exception 'Rôle introuvable.';
  end if;

  insert into public.company_users (company_id, user_id, role_id, org_unit_id, scope_level, invited_by, status)
  values (p_company_id, v_user_id, v_role_id, p_org_unit_id, p_scope_level, auth.uid(), 'active')
  on conflict (company_id, user_id) do update
    set role_id = excluded.role_id, org_unit_id = excluded.org_unit_id, scope_level = excluded.scope_level, status = 'active'
  returning id into v_membership_id;

  return v_membership_id;
end;
$$;
