-- ============================================================
-- Stockage de fichiers (logos, pièces jointes, documents)
-- Convention de chemin : <company_id>/<dossier libre>/<fichier>
-- ============================================================
insert into storage.buckets (id, name, public)
values ('company-files', 'company-files', false)
on conflict (id) do nothing;

create policy "company_files_select" on storage.objects for select
  using (
    bucket_id = 'company-files'
    and public.is_company_member((storage.foldername(name))[1]::uuid)
  );

create policy "company_files_insert" on storage.objects for insert
  with check (
    bucket_id = 'company-files'
    and public.is_company_member((storage.foldername(name))[1]::uuid)
  );

create policy "company_files_update" on storage.objects for update
  using (
    bucket_id = 'company-files'
    and public.is_company_member((storage.foldername(name))[1]::uuid)
  );

create policy "company_files_delete" on storage.objects for delete
  using (
    bucket_id = 'company-files'
    and public.is_company_member((storage.foldername(name))[1]::uuid)
  );
