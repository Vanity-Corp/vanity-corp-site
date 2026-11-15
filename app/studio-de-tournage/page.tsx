import { getPage, getPricingPackages } from "@/lib/payload-cms";
import StudioPageClient from "./StudioPageClient";

export default async function StudioPage() {
  const [page, pricingPackages] = await Promise.all([
    getPage("studio-de-tournage"),
    getPricingPackages(),
  ]);
  return <StudioPageClient page={page} pricingPackages={pricingPackages} />;
}
