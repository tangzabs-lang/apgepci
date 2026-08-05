-- Extensions
create extension if not exists pgcrypto;
create extension if not exists pg_trgm;
create extension if not exists btree_gist;

-- Generic updated_at trigger
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Platform-wide administrators (Administrateur général APGEPCI)
create table public.platform_admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  granted_by uuid references auth.users (id),
  created_at timestamptz not null default now()
);

alter table public.platform_admins enable row level security;

create or replace function public.is_platform_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.platform_admins pa where pa.user_id = auth.uid()
  );
$$;

create policy "platform admins are readable by platform admins"
  on public.platform_admins for select
  using (public.is_platform_admin());
