-- Permet l'embedding Postgrest company_users -> profiles (les deux référencent
-- auth.users, mais aucune relation directe n'existe entre elles sans ce FK).
alter table public.company_users
  add constraint company_users_user_id_profiles_fkey
  foreign key (user_id) references public.profiles (id) on delete cascade;
