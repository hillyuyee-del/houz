// Seed Supabase with curated images + content data
// Usage: SUPABASE_URL=https://xxx.supabase.co SUPABASE_SERVICE_KEY=xxx node scripts/seed-database.mjs
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import "dotenv/config";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment");
  process.exit(1);
}

const supabase = createClient(url, key);

const curated = JSON.parse(readFileSync("src/lib/curated-images.json", "utf-8"));

async function seed() {
  let imageCount = 0;

  // Insert all curated images
  for (const [category, urls] of Object.entries(curated)) {
    console.log(`Seeding: ${category} (${urls.length} images)`);

    const images = urls.map((url, i) => ({
      url,
      alt_text: `${category} interior design ${i}`,
      source: url.includes("pexels") ? "pexels" : "unsplash",
      is_curated: true,
      tags: category.split("-"),
      curation_score: 0.8,
    }));

    // Insert in batches of 20
    for (let i = 0; i < images.length; i += 20) {
      const batch = images.slice(i, i + 20);
      const { error } = await supabase.from("images").upsert(batch, { onConflict: "url" });
      if (error) console.error(`  Error: ${error.message}`);
      else imageCount += batch.length;
    }
  }

  console.log(`\nSeeded ${imageCount} images`);

  // Insert styles
  const styles = [
    { slug: "japandi", name: "Japandi", origin: "Japan + Scandinavia", description: "The art of minimal warmth — clean lines meet natural materials in perfect harmony." },
    { slug: "wabi-sabi", name: "Wabi-Sabi", origin: "Japan", description: "Beauty in imperfection — celebrating the transient nature of all things." },
    { slug: "scandinavian", name: "Scandinavian", origin: "Nordic Region", description: "Light-filled simplicity — functionality embraces natural light." },
    { slug: "french-cream", name: "French Cream", origin: "France", description: "Effortless elegance — classical bones with a romantic, contemporary spirit." },
    { slug: "industrial", name: "Industrial", origin: "Global", description: "Raw materials celebrated — exposed brick, steel, and concrete." },
    { slug: "minimal", name: "Minimal", origin: "Global", description: "Less is more — spaces stripped to their purest essence." },
    { slug: "mediterranean", name: "Mediterranean", origin: "Southern Europe", description: "Sun-drenched textures and organic forms — the warmth of coastal living." },
    { slug: "modern-luxury", name: "Modern Luxury", origin: "Global", description: "Refined opulence — rich materials and sculptural forms." },
  ];
  for (const s of styles) {
    await supabase.from("styles").upsert(s, { onConflict: "slug" });
  }
  console.log(`Seeded ${styles.length} styles`);

  // Insert hotels
  const hotels = [
    { slug: "aman-tokyo", name: "Aman Tokyo", location: "Tokyo, Japan", style_label: "Zen Urban Sanctuary", description: "A floating temple of calm above the city — washi paper, stone, water." },
    { slug: "four-seasons-florence", name: "Four Seasons Firenze", location: "Florence, Italy", style_label: "Renaissance Palazzo", description: "Frescoed ceilings, terraced gardens — a 15th-century palazzo reborn." },
    { slug: "ace-hotel-kyoto", name: "Ace Hotel Kyoto", location: "Kyoto, Japan", style_label: "East-Meets-West Cool", description: "Historic brick meets Japanese craft." },
    { slug: "amangiri", name: "Amangiri", location: "Utah, USA", style_label: "Desert Modernism", description: "Raw concrete emerging from sandstone — dissolving into desert." },
    { slug: "hoxton-paris", name: "The Hoxton Paris", location: "Paris, France", style_label: "18th-Century Reinvented", description: "Rococo bones, mid-century soul." },
    { slug: "il-sereno", name: "Il Sereno", location: "Lake Como, Italy", style_label: "Modernist Lakeside", description: "Clean lines meet Alpine waters." },
  ];
  for (const h of hotels) {
    await supabase.from("hotels").upsert(h, { onConflict: "slug" });
  }
  console.log(`Seeded ${hotels.length} hotels`);

  // Insert color palettes
  const palettes = [
    { slug: "warm-earth", name: "Warm Earth", mood: "Grounded & Serene", colors: ["#D4C5B9", "#C4A882", "#A89880", "#8B7355", "#6B5B4F"], description: "Rooted in nature — warm neutrals for quiet contemplation." },
    { slug: "sage-calm", name: "Sage Calm", mood: "Fresh & Peaceful", colors: ["#E2EBDF", "#B8C9B2", "#8FA88A", "#6B8B65", "#4A5C3F"], description: "Green-driven serenity — botanical calm for every room." },
    { slug: "coastal-haze", name: "Coastal Haze", mood: "Airy & Luminous", colors: ["#F5F0EB", "#E8E0D8", "#D4CAC0", "#C5BFB5", "#B8B0A6"], description: "Misted coastlines and sun-bleached stone." },
    { slug: "deep-cocoa", name: "Deep Cocoa", mood: "Dramatic & Refined", colors: ["#3C3028", "#4A3F35", "#5C4A3A", "#7A6050", "#A08464"], description: "Dark, sophisticated tones for architectural spaces." },
    { slug: "terracotta-bloom", name: "Terracotta Bloom", mood: "Warm & Inviting", colors: ["#C4956A", "#D4A87C", "#E8D5C0", "#F0E8DD", "#A08060"], description: "Sun-baked clay and desert bloom." },
    { slug: "nordic-light", name: "Nordic Light", mood: "Clean & Bright", colors: ["#FAFAF8", "#E8E4DD", "#D5CFC7", "#C0B8AE", "#A0988E"], description: "The gentle light of Nordic mornings." },
  ];
  for (const p of palettes) {
    await supabase.from("color_palettes").upsert(p, { onConflict: "slug" });
  }
  console.log(`Seeded ${palettes.length} color palettes`);
  console.log("\n✅ Seed complete!");
}

seed().catch(console.error);
