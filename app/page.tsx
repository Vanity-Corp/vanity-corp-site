import HomeView from "@/components/home/HomeView";
import { getClients, clientImage } from "@/lib/payload-cms";

// Server wrapper: fetches CMS content and passes it to the (client) HomeView.
// If the CMS is unreachable or empty, props are undefined and HomeView's
// sliders fall back to their built-in data — so the page never breaks.
export default async function Home() {
  const [brands, artists] = await Promise.all([
    getClients("brand"),
    getClients("artist"),
  ]);

  const brandItems = brands
    .map((c) => ({ image: clientImage(c) ?? "", name: c.name }))
    .filter((b) => b.image);
  const half = Math.ceil(brandItems.length / 2);
  const brands1 = brandItems.slice(0, half);
  const brands2 = brandItems.slice(half);

  const artistItems = artists
    .map((c, i) => ({
      id: c.id ?? i + 1,
      name: c.name,
      image: clientImage(c) ?? "",
      link: c.link ?? "#",
    }))
    .filter((a) => a.image);

  // TEMP debug — remove after diagnosis
  console.log(
    `[home] fetched brands=${brands.length} artists=${artists.length} | usable brandItems=${brandItems.length} artistItems=${artistItems.length}`,
  );

  return (
    <HomeView
      brands1={brands1.length ? brands1 : undefined}
      brands2={brands2.length ? brands2 : undefined}
      artists={artistItems.length ? artistItems : undefined}
    />
  );
}
