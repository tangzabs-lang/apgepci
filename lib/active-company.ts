import { cookies } from "next/headers";
import { getUserCompanies } from "@/lib/data/companies";

const COOKIE_NAME = "apgepci_active_company";

export async function getActiveCompany() {
  const companies = await getUserCompanies();
  if (companies.length === 0) return null;

  const cookieStore = await cookies();
  const preferred = cookieStore.get(COOKIE_NAME)?.value;
  const match = companies.find((c) => c.company_id === preferred);
  return match ?? companies[0];
}

export { COOKIE_NAME as ACTIVE_COMPANY_COOKIE };
