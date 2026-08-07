import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/data/companies";
import { SiteHeader } from "@/components/landing/site-header";
import { LandingPage } from "@/components/landing/landing-page";
import { SiteFooter } from "@/components/landing/site-footer";
import { WhatsAppButton } from "@/components/whatsapp-button";

export default async function Home() {
  const user = await getCurrentUser();
  if (user) redirect("/dashboard");

  return (
    <>
      <SiteHeader />
      <LandingPage />
      <SiteFooter />
      <WhatsAppButton />
    </>
  );
}
