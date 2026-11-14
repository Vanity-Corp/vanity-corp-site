import { getPage } from "@/lib/payload-cms";
import StudioPageClient from "./StudioPageClient";

export default async function StudioPage() {
  const page = await getPage("studio-de-tournage");
  return <StudioPageClient page={page} />;
}
