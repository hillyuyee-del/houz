import { NextRequest, NextResponse } from "next/server";

// In-memory cache: query → {urls, expires}
const cache = new Map<string, { urls: string[]; expires: number }>();
const CACHE_TTL = 30 * 60 * 1000; // 30 min
const PER_PAGE = 30; // Fetch plenty so indices don't repeat

async function searchPexels(query: string): Promise<string[]> {
  const key = process.env.PEXELS_API_KEY;
  if (!key) return [];

  try {
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query + " interior")}&per_page=${PER_PAGE}&orientation=landscape&size=large`,
      { headers: { Authorization: key } }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.photos?.map((p: any) => p.src?.large || p.src?.original) || [];
  } catch {
    return [];
  }
}

async function getImages(query: string): Promise<string[]> {
  const cached = cache.get(query);
  if (cached && cached.expires > Date.now()) {
    return cached.urls;
  }

  const urls = await searchPexels(query);
  if (urls.length > 0) {
    cache.set(query, { urls, expires: Date.now() + CACHE_TTL });
  }
  return urls;
}

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q") || "interior design";
  const i = parseInt(req.nextUrl.searchParams.get("i") || "0");
  const w = parseInt(req.nextUrl.searchParams.get("w") || "800");

  const urls = await getImages(q);

  if (urls.length === 0) {
    // Fallback: redirect to loremflickr
    const h = Math.round(w * 0.75);
    return NextResponse.redirect(
      `https://loremflickr.com/${w}/${h}/${encodeURIComponent(q)}?random=${i}`
    );
  }

  // Pick image at index, wrapping around
  const idx = i % urls.length;
  const url = urls[idx];

  // Resize via Pexels URL params: append ?w=800&h=600&fit=crop
  const sizedUrl = url.includes("?")
    ? `${url}&w=${w}&fit=crop&auto=format`
    : `${url}?w=${w}&fit=crop&auto=format`;

  return NextResponse.redirect(sizedUrl);
}
