import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const CATEGORIES = {
  // Countries — strict interior focus
  "japan-interior": "japanese living room bedroom interior design wabi sabi wood minimal",
  "italy-interior": "italian luxury living room bedroom interior design fresco marble furniture",
  "france-interior": "parisian apartment living room interior design herringbone floor fireplace",
  "denmark-interior": "danish hygge living room bedroom interior design wood light cozy",
  "morocco-interior": "moroccan living room interior design zellige tile rug lantern",
  "china-interior": "chinese modern living room interior design wood tea courtyard",
  // Style tags — highly specific to each style's defining interior elements
  "japandi-style": "japandi living room interior design wood minimal natural light plant",
  "wabi-sabi-style": "wabi sabi living room interior design organic plaster clay handmade",
  "scandi-style": "scandinavian living room interior design light wood white cozy hygge",
  "french-cream-style": "parisian cream living room interior design herringbone marble moldings elegant",
  "industrial-style": "industrial loft apartment living room interior design exposed brick steel concrete",
  "minimal-style": "minimalist living room interior design white clean empty spacious",
  "mediterranean-style": "mediterranean living room interior design terracotta stone arches warm",
  "modern-luxury-style": "modern luxury living room interior design marble brass velvet elegant",
  "moroccan-style": "moroccan living room interior design zellige carved plaster rug lantern",
  "chinese-style": "chinese contemporary living room interior design wood screen tea modern",
  // Hotels — exact name + interior suite room to force indoor shots
  "aman-tokyo": "Aman Tokyo hotel suite bedroom bathroom interior design",
  "four-seasons-florence": "Four Seasons Firenze Florence hotel suite bedroom interior palazzo",
  "ace-hotel-kyoto": "Ace Hotel Kyoto room suite lobby interior design",
  "amangiri": "Amangiri Utah hotel suite bedroom interior desert luxury",
  "hoxton-paris": "Hoxton Paris hotel room suite bedroom interior design",
  "il-sereno-como": "Il Sereno Lake Como hotel suite bedroom interior lake view",
  "upper-house-hk": "Upper House Hong Kong hotel suite bedroom bathroom interior",
  "bulgari-milan": "Bulgari Hotel Milano Milan suite bedroom interior design",
  "soneva-fushi": "Soneva Fushi Maldives villa bedroom bathroom interior resort",
  "post-ranch-inn": "Post Ranch Inn Big Sur cabin suite bedroom interior",
  "marina-bay-sands": "Marina Bay Sands Singapore hotel suite bedroom interior",
  "ritz-paris": "Ritz Paris hotel suite bedroom bathroom interior design",
  // 8 NEW luxury design hotels
  "the-brando": "The Brando French Polynesia villa suite bedroom interior luxury resort",
  "fogo-island-inn": "Fogo Island Inn Newfoundland hotel suite bedroom interior design Atlantic",
  "hotel-de-crillon": "Hotel de Crillon Paris suite bedroom interior design luxury",
  "the-silo": "The Silo Hotel Cape Town suite bedroom interior design luxury",
  "giraffe-manor": "Giraffe Manor Nairobi Kenya hotel room interior design",
  "adrere-amellal": "Adrere Amellal Siwa Egypt hotel room interior design earthen",
  "hoshinoya-tokyo": "Hoshinoya Tokyo hotel suite bedroom interior design ryokan",
  "borgo-egnazia": "Borgo Egnazia Puglia Italy hotel suite bedroom interior design",
  // Elements
  "sofas": "sofa living room modern design",
  "coffee-tables": "coffee table wood modern interior",
  "rugs": "rug living room wool natural",
  "shelving": "bookshelf shelving interior styling",
  "lighting": "living room lighting pendant design",
  "beds": "bed bedroom luxury linen design",
  "nightstands": "nightstand bedside table wood",
  "bedding": "bedding linen textile bedroom aesthetic",
  "wardrobes": "wardrobe closet wood interior design",
  "lamps": "bedroom table lamp warm lighting",
  "kitchen-islands": "kitchen island marble modern design",
  "cabinetry": "kitchen cabinet wood modern design",
  "backsplash": "kitchen backsplash tile ceramic design",
  "faucets": "kitchen faucet brass modern design",
  "bar-stools": "bar stool kitchen counter modern",
  "vanities": "bathroom vanity wood marble design",
  "bathtubs": "freestanding bathtub bathroom spa design",
  "mirrors": "bathroom mirror round modern design",
  "tiles": "bathroom tile pattern ceramic design",
  "fixtures": "bathroom brass fixture modern design",
};

async function searchPexels(query: string): Promise<string[]> {
  const key = process.env.PEXELS_API_KEY;
  if (!key) return [];
  try {
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=30&orientation=landscape&size=large`,
      { headers: { Authorization: key } }
    );
    const data = await res.json();
    return (data.photos || []).map((p: any) => p.src?.large).filter(Boolean);
  } catch { return []; }
}

async function searchUnsplash(query: string): Promise<string[]> {
  const key = process.env.UNSPLASH_ACCESS_KEY;
  if (!key) return [];
  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=30&orientation=landscape`,
      { headers: { Authorization: `Client-ID ${key}` } }
    );
    const data = await res.json();
    return (data.results || []).map((r: any) => r.urls?.regular).filter(Boolean);
  } catch { return []; }
}

export async function GET() {
  const curated: Record<string, string[]> = {};

  for (const [key, query] of Object.entries(CATEGORIES)) {
    console.log(`Curating: ${key} → "${query}"`);
    const [pexels, unsplash] = await Promise.all([
      searchPexels(query),
      searchUnsplash(query),
    ]);

    // Merge, deduplicate
    const seen = new Set<string>();
    const all: string[] = [];
    for (const url of [...pexels, ...unsplash]) {
      if (!seen.has(url)) { seen.add(url); all.push(url); }
    }

    curated[key] = all;
    console.log(`  → ${all.length} images (${pexels.length} Pexels + ${unsplash.length} Unsplash)`);
  }

  // Save to file
  const filePath = path.join(process.cwd(), "src", "lib", "curated-images.json");
  fs.writeFileSync(filePath, JSON.stringify(curated, null, 2));

  return NextResponse.json({
    success: true,
    path: filePath,
    counts: Object.fromEntries(Object.entries(curated).map(([k, v]) => [k, v.length])),
  });
}
