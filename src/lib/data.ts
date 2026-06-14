// ── Static Curated Image Database ──
// Images curated once via /api/curate, saved as fixed data — never random
import curatedRaw from "./curated-images.json";

const C = curatedRaw as Record<string, string[]>;

function get(k: string, fallback?: string): string[] {
  const urls = C[k];
  if (urls && urls.length > 0) return urls;
  if (fallback && C[fallback]) return C[fallback];
  return [];
}

function cover(k: string, fb?: string): string {
  const urls = get(k, fb);
  return urls[0] || "";
}

export interface InspirationItem { slug: string; name: string; description: string; cover: string; images: string[]; }
export interface Country extends InspirationItem { subtitle: string; }
export interface Designer extends InspirationItem { origin: string; style: string; }
export interface Hotel extends InspirationItem { location: string; style: string; }
export interface RoomItem { name: string; slug: string; image: string; count: number; }
export interface Room { slug: string; name: string; subtitle: string; cover: string; items: RoomItem[]; }

export const countries: Country[] = [
  { slug: "japan", name: "Japan", subtitle: "Wabi-sabi & Zen Minimalism",
    description: "Imperfect beauty, natural materials, and the poetry of empty space.",
    cover: cover("japan-interior"), images: get("japan-interior"), },
  { slug: "italy", name: "Italy", subtitle: "Mediterranean & Modern Classic",
    description: "Sun-drenched stone, classical proportions, effortless elegance.",
    cover: cover("italy-interior"), images: get("italy-interior"), },
  { slug: "france", name: "France", subtitle: "Parisian & Provençal Charm",
    description: "Classical bones, romantic spirit, herringbone floors, marble mantels.",
    cover: cover("france-interior"), images: get("france-interior"), },
  { slug: "denmark", name: "Denmark", subtitle: "Scandinavian & Hygge Warmth",
    description: "Light-filled simplicity — functional beauty meets hygge coziness.",
    cover: cover("denmark-interior"), images: get("denmark-interior"), },
  { slug: "morocco", name: "Morocco", subtitle: "Islamic Geometry & Berber Craft",
    description: "Intricate zellige tiles, carved plaster, richly layered textiles.",
    cover: cover("morocco-interior"), images: get("morocco-interior"), },
  { slug: "china", name: "China", subtitle: "Contemporary Eastern Aesthetics",
    description: "Ming dynasty philosophy reimagined through a modernist lens.",
    cover: cover("china-interior"), images: get("china-interior"), },
];

export const designers: Designer[] = [
  { slug: "kelly-wearstler", name: "Kelly Wearstler", origin: "USA", style: "Maximalist Luxury",
    description: "Bold juxtapositions of texture, pattern, and sculptural forms.",
    cover: cover("maximalist-luxury"), images: get("maximalist-luxury"), },
  { slug: "axel-vervoordt", name: "Axel Vervoordt", origin: "Belgium", style: "Wabi Minimalism",
    description: "Timeless spaces honoring raw materials, emptiness, and patina.",
    cover: cover("wabi-minimal"), images: get("wabi-minimal"), },
  { slug: "ilse-crawford", name: "Ilse Crawford", origin: "UK", style: "Human-Centric Design",
    description: "Spaces for wellbeing — materiality, comfort, sensory delight.",
    cover: cover("cozy-natural"), images: get("cozy-natural"), },
  { slug: "tadao-ando", name: "Tadao Ando", origin: "Japan", style: "Concrete Poetry",
    description: "Light, shadow, and exposed concrete in profound spatial harmony.",
    cover: cover("concrete-arch"), images: get("concrete-arch"), },
  { slug: "patricia-urquiola", name: "Patricia Urquiola", origin: "Spain", style: "Playful Modernism",
    description: "Feminine lines, innovative materials, joyful color and organic form.",
    cover: cover("playful-modern"), images: get("playful-modern"), },
  { slug: "india-mahdavi", name: "India Mahdavi", origin: "France/Iran", style: "Chromatic Joy",
    description: "Vibrant palettes and curved forms celebrating cultural fusion.",
    cover: cover("vibrant-color"), images: get("vibrant-color"), },
];

export const hotels: Hotel[] = [
  { slug: "aman-tokyo", name: "Aman Tokyo", location: "Tokyo, Japan", style: "Zen Urban Sanctuary",
    description: "A floating temple of calm — washi paper, stone, and water, 30m above the city.",
    cover: cover("aman-tokyo"), images: get("aman-tokyo"), },
  { slug: "four-seasons-florence", name: "Four Seasons Firenze", location: "Florence, Italy", style: "Renaissance Palazzo",
    description: "Frescoed ceilings, terraced gardens — a 15th-century palazzo reborn.",
    cover: cover("four-seasons-florence"), images: get("four-seasons-florence"), },
  { slug: "ace-hotel-kyoto", name: "Ace Hotel Kyoto", location: "Kyoto, Japan", style: "East-Meets-West Cool",
    description: "Historic brick meets Japanese craft — a collision of cultures.",
    cover: cover("ace-hotel-kyoto"), images: get("ace-hotel-kyoto"), },
  { slug: "amangiri", name: "Amangiri", location: "Utah, USA", style: "Desert Modernism",
    description: "Raw concrete emerging from sandstone — dissolving into the vast desert.",
    cover: cover("amangiri"), images: get("amangiri"), },
  { slug: "hoxton-paris", name: "The Hoxton Paris", location: "Paris, France", style: "18th-Century Reinvented",
    description: "A historic hôtel particulier — rococo bones, mid-century soul.",
    cover: cover("hoxton-paris"), images: get("hoxton-paris"), },
  { slug: "il-sereno", name: "Il Sereno", location: "Lake Como, Italy", style: "Modernist Lakeside",
    description: "Clean lines meet Alpine waters — contemporary luxury on Lake Como.",
    cover: cover("il-sereno-como"), images: get("il-sereno-como"), },
];

export const rooms: Room[] = [
  { slug: "living-room", name: "Living Room", subtitle: "Gathering & Comfort",
    cover: cover("japan-interior"),
    items: [
      { name: "Sofas", slug: "sofas", image: cover("sofas"), count: 124 },
      { name: "Coffee Tables", slug: "coffee-tables", image: cover("coffee-tables"), count: 98 },
      { name: "Rugs", slug: "rugs", image: cover("rugs"), count: 156 },
      { name: "Shelving", slug: "shelving", image: cover("shelving"), count: 87 },
      { name: "Lighting", slug: "lighting", image: cover("lighting"), count: 203 },
    ], },
  { slug: "bedroom", name: "Bedroom", subtitle: "Rest & Restoration",
    cover: cover("beds"),
    items: [
      { name: "Beds", slug: "beds", image: cover("beds"), count: 112 },
      { name: "Nightstands", slug: "nightstands", image: cover("nightstands"), count: 76 },
      { name: "Bedding", slug: "bedding", image: cover("bedding"), count: 189 },
      { name: "Wardrobes", slug: "wardrobes", image: cover("wardrobes"), count: 64 },
      { name: "Lamps", slug: "lamps", image: cover("lamps"), count: 145 },
    ], },
  { slug: "kitchen", name: "Kitchen", subtitle: "Craft & Nourishment",
    cover: cover("kitchen-islands"),
    items: [
      { name: "Islands", slug: "islands", image: cover("kitchen-islands"), count: 82 },
      { name: "Cabinetry", slug: "cabinetry", image: cover("cabinetry"), count: 103 },
      { name: "Backsplash", slug: "backsplash", image: cover("backsplash"), count: 91 },
      { name: "Faucets", slug: "faucets", image: cover("faucets"), count: 68 },
      { name: "Bar Stools", slug: "bar-stools", image: cover("bar-stools"), count: 55 },
    ], },
  { slug: "bathroom", name: "Bathroom", subtitle: "Ritual & Renewal",
    cover: cover("bathtubs"),
    items: [
      { name: "Vanities", slug: "vanities", image: cover("vanities"), count: 73 },
      { name: "Bathtubs", slug: "bathtubs", image: cover("bathtubs"), count: 58 },
      { name: "Mirrors", slug: "mirrors", image: cover("mirrors"), count: 94 },
      { name: "Tiles", slug: "tiles", image: cover("tiles"), count: 137 },
      { name: "Fixtures", slug: "fixtures", image: cover("fixtures"), count: 81 },
    ], },
];
