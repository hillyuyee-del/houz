import { NextRequest, NextResponse } from "next/server";

// ── AI Image Generation via Replicate Flux ──

async function generateWithReplicate(prompt: string, count: number = 4) {
  const token = process.env.REPLICATE_API_TOKEN;
  if (!token) return null;

  try {
    const res = await fetch("https://api.replicate.com/v1/models/black-forest-labs/flux-schnell/predictions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Prefer: "wait",
      },
      body: JSON.stringify({
        input: {
          prompt: `Interior design photograph, ${prompt}, high-end architectural photography, natural lighting, 4k, professional interior shot`,
          num_outputs: count,
          aspect_ratio: "4:3",
          output_format: "jpg",
        },
      }),
    });

    if (!res.ok) return null;
    const data = await res.json();
    return data.output as string[];
  } catch {
    return null;
  }
}

// ── Unsplash Image Search ──

async function searchUnsplash(query: string, count: number = 6) {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  if (!accessKey) return null;

  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query + " interior design")}&per_page=${count}&orientation=landscape`,
      { headers: { Authorization: `Client-ID ${accessKey}` } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.results.map((r: any) => r.urls.regular);
  } catch {
    return null;
  }
}

// ── Curated fallback images by style/room ──

const FALLBACK_POOL: Record<string, string[]> = {
  japandi: [
    "https://images.unsplash.com/photo-1598928506311-c55e8431f34b?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&auto=format&fit=crop",
  ],
  scandinavian: [
    "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1598928506311-c55e8431f34b?w=800&auto=format&fit=crop",
  ],
  mediterranean: [
    "https://images.unsplash.com/photo-1615572359976-1e23f59e265e?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&auto=format&fit=crop",
  ],
  modern: [
    "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800&auto=format&fit=crop",
  ],
  parisian: [
    "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800&auto=format&fit=crop",
  ],
  chinese: [
    "https://images.unsplash.com/photo-1604572244532-993c5a94c5a1?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1598928506311-c55e8431f34b?w=800&auto=format&fit=crop",
  ],
  "living-room": [
    "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&auto=format&fit=crop",
  ],
  bedroom: [
    "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop",
  ],
  kitchen: [
    "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&auto=format&fit=crop",
  ],
  bathroom: [
    "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1615572359976-1e23f59e265e?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&auto=format&fit=crop",
  ],
};

function matchFallback(style: string, room: string): string[] {
  const key = Object.keys(FALLBACK_POOL).find(
    (k) => style.toLowerCase().includes(k) || k.includes(style.toLowerCase())
  );
  const roomKey = Object.keys(FALLBACK_POOL).find(
    (k) => room.toLowerCase().includes(k) || k.includes(room.toLowerCase())
  );
  const pool = key ? FALLBACK_POOL[key] : roomKey ? FALLBACK_POOL[roomKey] : FALLBACK_POOL["modern"];
  // Shuffle for variety
  return pool.sort(() => Math.random() - 0.5);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const {
    area = "",
    layout = "",
    style = "modern natural",
    budget = "",
    requirements = "",
    roomType = "living room",
  } = body;

  // Build detailed prompt
  const prompt = `${style} style ${roomType} interior design, ${layout}, ${requirements}, warm natural lighting, professional interior photography`;

  let images: string[] = [];

  // Tier 1: Replicate AI (real image generation)
  const aiImages = await generateWithReplicate(prompt, 4);
  if (aiImages && aiImages.length > 0) {
    images = aiImages;
  }

  // Tier 2: Unsplash API search
  if (images.length === 0) {
    const unsplashImages = await searchUnsplash(`${style} ${roomType} interior`, 6);
    if (unsplashImages && unsplashImages.length > 0) {
      images = unsplashImages;
    }
  }

  // Tier 3: Curated fallback
  if (images.length === 0) {
    images = matchFallback(style, roomType);
  }

  // Generate design advice text
  const advice = `
**Design Brief for ${area || "your space"}**

**Style Direction**: ${style} aesthetic for a ${roomType}
**Layout**: ${layout || "Open, flowing layout with defined zones"}
**Budget Range**: ${budget || "Mid-range"}

**Color Palette Suggestion**:
• Primary: Warm cream (#F7F4EF) — walls and large surfaces
• Secondary: Sage green (#8FA88A) — accents, textiles, plants
• Tertiary: Deep brown (#5C4A3A) — furniture anchors, framing

**Key Furniture Pieces for ${roomType}**:
• Statement piece that anchors the room (sofa / bed / island depending on type)
• Natural material side tables (oak, travertine, or rattan)
• Layered lighting: ambient + task + accent (2700K warm)
• Textural rug to define the zone

**Special Considerations**:
${requirements.includes("child") ? "• Rounded corners on all furniture, non-toxic materials, washable slipcovers, hidden storage for toys" : ""}
${requirements.includes("pet") ? "• Performance fabrics (Crypton/Sunbrella), scratch-resistant surfaces, easy-clean flooring" : ""}
${!requirements.includes("child") && !requirements.includes("pet") ? "• Layer textures for depth — wool, linen, raw ceramic, patinated brass" : ""}

**Budget Breakdown**:
• Furniture: ~50% — invest in the statement pieces
• Lighting: ~15% — transformative impact
• Textiles/Rugs: ~15% — warmth and acoustics
• Decor/Art: ~10% — personal touches
• Plants/Greenery: ~10% — living elements
`.trim();

  return NextResponse.json({
    images,
    advice,
    prompt,
    source: images.length > 0 && images[0]?.includes("replicate") ? "ai" : images.length > 0 && images[0]?.includes("unsplash") ? "search" : "curated",
  });
}
