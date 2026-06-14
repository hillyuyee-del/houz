import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const CATEGORIES = {
  // Countries
  "japan-interior": "japanese living room wabi sabi interior design",
  "italy-interior": "italian mediterranean villa luxury interior design",
  "france-interior": "parisian haussmann apartment french interior design",
  "denmark-interior": "danish hygge scandinavian living room interior design",
  "morocco-interior": "moroccan riad zellige tile interior design",
  "china-interior": "chinese modern luxury living room interior design",
  // Designers
  "maximalist-luxury": "luxury maximalist interior marble brass design",
  "wabi-minimal": "wabi sabi minimal raw concrete stone interior",
  "cozy-natural": "cozy warm natural textile wool interior wellbeing",
  "concrete-arch": "concrete architecture minimal light shadow interior",
  "playful-modern": "colorful playful curved modern furniture interior",
  "vibrant-color": "vibrant colorful pastel pink curved interior design",
  // Hotels - search by name on Unsplash
  "aman-tokyo": "Aman Tokyo hotel interior",
  "four-seasons-florence": "Four Seasons Florence palazzo hotel interior",
  "ace-hotel-kyoto": "Ace Hotel Kyoto boutique interior",
  "amangiri": "Amangiri Utah desert luxury hotel architecture",
  "hoxton-paris": "Hoxton Paris hotel historic interior",
  "il-sereno-como": "Il Sereno Lake Como luxury hotel",
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
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=15&orientation=landscape&size=large`,
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
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=15&orientation=landscape`,
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
