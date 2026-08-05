-- La politique de lecture sur companies exigeait d'être déjà membre
-- (is_company_member), mais ce lien n'est créé qu'après coup par le trigger
-- on_company_created. Cela bloquait la clause RETURNING juste après l'INSERT
-- (violation RLS) car, au moment de son évaluation, le créateur n'est pas
-- encore reconnu comme membre. Le créateur doit pouvoir voir l'entreprise
-- qu'il vient de créer, indépendamment du trigger.
drop policy if exists companies_select on public.companies;
create policy companies_select on public.companies for select
  using (public.is_company_member(id) or created_by = auth.uid());
