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

async function generateDesignAdvice(
  style: string,
  roomType: string,
  requirements: string,
): Promise<string> {
  const apiKey = process.env.DEEPSEEK_API_KEY;

  if (!apiKey) {
    return getFallbackAdvice(roomType, style);
  }

  try {
    const systemPrompt = `You are an expert interior design consultant at aetherhouz, a premium interior design platform. Generate concise, actionable design advice for the user's specific space.

You MUST respond with exactly 5 sections in this order using this exact formatting:

**Color Palette**
• [3-4 specific color recommendations with hex codes]

**Key Furniture**
• [3-4 furniture pieces specific to the room and style]

**Plants & Texture**
• [2-3 plant and texture recommendations]

**Layout Tips**
• [2-3 spatial arrangement tips]

**Budget Allocation (Mid-range)**
• [3-4 percentage-based budget categories summing to ~100%]

CRITICAL RULES:
- Use the project's signature sage green (#8FA88A), warm brown (#5C4A3A), and cream (#F7F4EF) as accent colors where appropriate
- Use **bold** for every section header exactly as shown above
- Use the bullet character • for every bullet point (NOT - or *)
- Keep every section to 2-4 concise, actionable bullets
- Be specific: name actual furniture pieces, plant species, and hex color codes
- Personalize EVERY recommendation to the user's chosen style and room type
- If special requirements exist, integrate them naturally into the relevant sections
- Do NOT mention specific dollar amounts — keep allocations as percentages
- Total budget allocation should sum to approximately 100%`;

    const userPrompt = `Style: ${style || "Modern Natural"}
Room Type: ${roomType || "Living Room"}
Special requirements: ${requirements || "None"}`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    const res = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        max_tokens: 1024,
        temperature: 0.7,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) {
      console.error("DeepSeek API error:", res.status, await res.text());
      return getFallbackAdvice(roomType, style);
    }

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content;

    if (content && typeof content === "string" && content.trim().length > 0) {
      return content.trim();
    }

    return getFallbackAdvice(roomType, style);
  } catch (error) {
    console.error("DeepSeek API error:", error);
    return getFallbackAdvice(roomType, style);
  }
}

function getFallbackAdvice(roomType: string, style: string): string {
  return `
**Color Palette**
• Walls: Warm cream (#F7F4EF) — soft, light-reflective, calming
• Accent: Sage green (#8FA88A) through textiles, plants, and accessories
• Anchor: Deep brown (#5C4A3A) for furniture legs, frames, or statement pieces
• Neutral: Warm taupe (#C8B6A6) for rugs, upholstery, and layering

**Key Furniture**
• Low-profile sofa in neutral linen or cotton-blend tones
• Round coffee table with tapered wooden legs
• Natural fiber rug (jute or wool) in cream to define the zone
• Layered lighting — warm 2700K LED + floor lamp + table accent

**Plants & Texture**
• Fiddle leaf fig or olive tree for height and natural greenery
• Linen curtains (floor-to-ceiling), wool throw, ceramic vases for tactile variety

**Layout Tips**
• Create a focal point — art wall, window view, or statement furniture piece
• Float furniture away from walls for a more intimate, conversational feel
• Leave 90cm walkways between furniture pieces for comfortable flow

**Budget Allocation (Mid-range)**
• Furniture: ~45%
• Lighting: ~15%
• Textiles & Decor: ~25%
• Plants & Greenery: ~15%
`.trim();
}

export async function POST(req: NextRequest) {
  const { style, requirements, roomType } = await req.json();

  // Build a precise image search query
  const imgQuery = `${style || "modern"} ${roomType || "living room"} ${requirements || ""}`;

  // Fetch real images from Pexels + Unsplash
  const images = await searchImages(imgQuery);

  // Generate design advice via DeepSeek AI (with fallback)
  const advice = await generateDesignAdvice(
    style || "Modern Natural",
    roomType || "Living Room",
    requirements || "",
  );

  return NextResponse.json({ images, advice, query: imgQuery });
}
