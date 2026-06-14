import { NextRequest, NextResponse } from "next/server";

async function searchImages(query: string): Promise<string[]> {
  const pexelsKey = process.env.PEXELS_API_KEY;
  const unsplashKey = process.env.UNSPLASH_ACCESS_KEY;
  const results: string[] = [];

  // Pexels
  if (pexelsKey) {
    try {
      const res = await fetch(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(query + " interior design")}&per_page=8&orientation=landscape`,
        { headers: { Authorization: pexelsKey } }
      );
      const data = await res.json();
      results.push(...(data.photos || []).map((p: any) => p.src?.large).filter(Boolean));
    } catch {}
  }

  // Unsplash
  if (unsplashKey) {
    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query + " interior")}&per_page=8&orientation=landscape`,
        { headers: { Authorization: `Client-ID ${unsplashKey}` } }
      );
      const data = await res.json();
      results.push(...(data.results || []).map((r: any) => r.urls?.regular).filter(Boolean));
    } catch {}
  }

  return results.slice(0, 8);
}

export async function POST(req: NextRequest) {
  const { area, layout, style, budget, requirements, roomType } = await req.json();

  // Build a precise image search query
  const imgQuery = `${style || "modern"} ${roomType || "living room"} ${requirements || ""}`;

  // Fetch real images from Pexels + Unsplash
  const images = await searchImages(imgQuery);

  // Generate design advice
  const advice = `
**Design Brief — ${roomType || "Living Room"} in ${style || "Modern Natural"} Style**
**Space**: ${area || "Not specified"} | **Layout**: ${layout || "Open plan"} | **Budget**: ${budget || "Not specified"}

**🎨 Color Palette**
• Walls: Warm cream (#F7F4EF) — soft, light-reflective, calming
• Accent: Sage green (#8FA88A) — through textiles, plants, or one feature wall
• Anchor: Deep brown (#5C4A3A) — furniture legs, frames, or a statement piece

**🪑 Key Furniture — ${roomType || "Living Room"}**
• Main piece: Low-profile ${style?.includes("japan") ? "wooden platform sofa" : style?.includes("italian") ? "tufted velvet sofa" : "linen-upholstered sofa"} in neutral tones
• Coffee table: ${style?.includes("japan") ? "Solid oak with organic live-edge" : style?.includes("italian") ? "Travertine stone with brass inlay" : "Round oak with tapered legs"}
• Rug: ${style?.includes("morocco") ? "Handwoven Beni Ourain wool" : "Natural fiber (jute or wool) in cream"} to define the zone
• Lighting: Layered — warm 2700K LED + floor lamp + table accent

**🌿 Plants & Texture**
• ${roomType === "Living Room" ? "Fiddle leaf fig or olive tree in corner" : roomType === "Bedroom" ? "Snake plant or peace lily (air-purifying)" : "Small herb pots on windowsill"}
• Linen curtains (floor-to-ceiling), wool throw, ceramic vases

**📐 Layout Tips**
• ${layout?.includes("open") ? "Define zones with rugs and shelving — no walls needed" : "Create a focal point (fireplace, art wall, or window view)"}
• Float furniture away from walls for a more intimate feel
• Leave 90cm walkways between furniture pieces

${requirements?.includes("child") ? "**👶 Child-Friendly**: Rounded corners, washable slipcovers, non-toxic paint, hidden toy storage" : ""}
${requirements?.includes("pet") ? "**🐾 Pet-Friendly**: Performance fabrics (Crypton/Sunbrella), scratch-resistant surfaces, easy-clean rugs" : ""}
${requirements?.includes("office") ? "**💻 Home Office**: Dedicated desk zone near window, cable management, ergonomic chair" : ""}

**💰 Budget Allocation (${budget || "Mid-range"})**
• Furniture: ~45% | Lighting: ~15% | Textiles: ~15% | Decor & Art: ~15% | Plants: ~10%
`.trim();

  return NextResponse.json({ images, advice, query: imgQuery });
}
