import AccompagnementView from "@/components/accompagnement/AccompagnementView";
import { getClients, getPage } from "@/lib/payload-cms";

// Server wrapper: fetches CMS content (hero + strategic clients) and passes it
// to the client view. Falls back to built-in content when the CMS is empty.
export default async function AccompagnementPage() {
  const [page, strategic] = await Promise.all([
    getPage("accompagnement"),
    getClients("strategic_client"),
  ]);

  const hero = (page?.sections ?? []).find(
    (s) => s.blockType === "richSection" && s.key === "hero",
  );

  const strategicClients = strategic.map((c) => ({
    name: c.name,
    sector: c.sector ?? undefined,
    focus: c.focus ?? undefined,
  }));

  return (
    <AccompagnementView
      heroEyebrow={hero?.eyebrow ?? undefined}
      heroBody={hero?.body ?? undefined}
      strategicClients={strategicClients.length ? strategicClients : undefined}
    />
  );
}
