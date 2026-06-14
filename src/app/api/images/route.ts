import { NextRequest, NextResponse } from "next/server";

// In-memory cache: query → {urls, expires}
const cache = new Map<string, { urls: string[]; expires: number }>();
const CACHE_TTL = 45 * 60 * 1000;

async function searchPexels(query: string): Promise<string[]> {
  const key = process.env.PEXELS_API_KEY;
  if (!key) return [];
  try {
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=30&orientation=landscape&size=large`,
      { headers: { Authorization: key } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.photos?.map((p: any) => p.src?.large || p.src?.original) || [];
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
    if (!res.ok) return [];
    const data = await res.json();
    return data.results?.map((r: any) => r.urls?.regular || r.urls?.small) || [];
  } catch { return []; }
}

async function getAllImages(query: string): Promise<string[]> {
  const cached = cache.get(query);
  if (cached && cached.expires > Date.now()) return cached.urls;

  // Always add "interior design" to force interior photos
  const mainQuery = query.includes("interior") ? query : `${query} interior design`;

  // Backup query: strip to just essential keywords + interior
  const words = query.split(" ").filter((w) => w.length > 3).slice(0, 4);
  const backupQuery = `${words.join(" ")} home decor room`;

  // Fetch both main + backup from both sources
  const [pexels1, unsplash1, pexels2, unsplash2] = await Promise.all([
    searchPexels(mainQuery),
    searchUnsplash(mainQuery),
    searchPexels(backupQuery),
    searchUnsplash(backupQuery),
  ]);

  // Merge all, deduplicate, shuffle
  const seen = new Set<string>();
  const merged: string[] = [];
  for (const url of [...pexels1, ...unsplash1, ...pexels2, ...unsplash2]) {
    if (!seen.has(url)) {
      seen.add(url);
      merged.push(url);
    }
  }

  // Shuffle
  for (let i = merged.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [merged[i], merged[j]] = [merged[j], merged[i]];
  }

  if (merged.length > 0) {
    cache.set(query, { urls: merged, expires: Date.now() + CACHE_TTL });
  }
  return merged;
}

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q") || "interior design";
  const i = parseInt(req.nextUrl.searchParams.get("i") || "0");
  const w = parseInt(req.nextUrl.searchParams.get("w") || "800");

  const urls = await getAllImages(q);

  if (urls.length === 0) {
    // Last-resort fallback
    return NextResponse.redirect(
      `https://loremflickr.com/${w}/${Math.round(w * 0.75)}/${encodeURIComponent(q)}?random=${i}`
    );
  }

  const url = urls[i % urls.length];

  // Smart resize: Pexels URLs get ?w=, Unsplash get &w=
  const sep = url.includes("?") ? "&" : "?";
  const sizedUrl = `${url}${sep}w=${w}&fit=crop&auto=format`;

  return NextResponse.redirect(sizedUrl);
}
