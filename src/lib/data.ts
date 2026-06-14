// ── Shared design inspiration data ──
// Images via Pexels API proxy — precise, search-matched interior photos

function img(kw: string, w = 800, i = 0) {
  return `/api/images?q=${encodeURIComponent(kw)}&i=${i}&w=${w}`;
}
function gallery(kw: string, count: number, w = 1000): string[] {
  return Array.from({ length: count }, (_, i) => img(kw, w, i));
}

export interface InspirationItem { slug: string; name: string; description: string; cover: string; images: string[]; }
export interface Country extends InspirationItem { subtitle: string; }
export interface Designer extends InspirationItem { origin: string; style: string; }
export interface Hotel extends InspirationItem { location: string; style: string; }
export interface RoomItem { name: string; slug: string; image: string; count: number; }
export interface Room { slug: string; name: string; subtitle: string; cover: string; items: RoomItem[]; }

export const countries: Country[] = [
  { slug: "japan", name: "Japan", subtitle: "Wabi-sabi & Zen Minimalism",
    description: "Imperfect beauty, natural materials, and the poetry of empty space — where every object is chosen with intention.",
    cover: img("japanese wabi-sabi living room zen", 1200),
    images: gallery("japanese wabi-sabi interior zen minimalist", 16), },
  { slug: "italy", name: "Italy", subtitle: "Mediterranean & Modern Classic",
    description: "Sun-drenched stone, classical proportions, and the effortless elegance of la dolce vita.",
    cover: img("italian mediterranean villa interior", 1200),
    images: gallery("italian mediterranean villa tuscan interior", 16), },
  { slug: "france", name: "France", subtitle: "Parisian & Provençal Charm",
    description: "Classical bones meet romantic spirit — herringbone floors, marble mantels, refined living.",
    cover: img("parisian apartment haussmann interior", 1200),
    images: gallery("parisian french provencal chateau interior", 16), },
  { slug: "denmark", name: "Denmark", subtitle: "Scandinavian & Hygge Warmth",
    description: "Light-filled simplicity where functional beauty meets hygge — the Danish art of cozy contentment.",
    cover: img("danish hygge scandinavian living room", 1200),
    images: gallery("danish scandinavian nordic hygge interior", 16), },
  { slug: "morocco", name: "Morocco", subtitle: "Islamic Geometry & Berber Craft",
    description: "Intricate zellige tiles, carved plaster, and richly layered textiles.",
    cover: img("moroccan riad interior zellige", 1200),
    images: gallery("moroccan riad marrakech zellige interior", 16), },
  { slug: "china", name: "China", subtitle: "Contemporary Eastern Aesthetics",
    description: "Ming dynasty philosophy reimagined through a modernist lens — heritage meets innovation.",
    cover: img("chinese contemporary modern eastern interior", 1200),
    images: gallery("chinese modern traditional courtyard interior design", 16), },
];

export const designers: Designer[] = [
  { slug: "kelly-wearstler", name: "Kelly Wearstler", origin: "USA", style: "Maximalist Luxury",
    description: "Bold juxtapositions of texture, pattern, and sculptural forms — fearless compositions.",
    cover: img("luxury maximalist interior marble brass", 1200),
    images: gallery("luxury maximalist bold interior design hotel", 16), },
  { slug: "axel-vervoordt", name: "Axel Vervoordt", origin: "Belgium", style: "Wabi Minimalism",
    description: "Timeless spaces honoring raw materials, emptiness, and the beauty of patina.",
    cover: img("wabi sabi minimal interior raw stone", 1200),
    images: gallery("wabi sabi minimal raw concrete natural interior", 16), },
  { slug: "ilse-crawford", name: "Ilse Crawford", origin: "UK", style: "Human-Centric Design",
    description: "Spaces for wellbeing — materiality, comfort, and sensory delight in every decision.",
    cover: img("cozy natural warm interior wellbeing", 1200),
    images: gallery("cozy natural warm tactile interior design wellbeing", 16), },
  { slug: "tadao-ando", name: "Tadao Ando", origin: "Japan", style: "Concrete Poetry",
    description: "Light, shadow, and exposed concrete in profound spatial harmony.",
    cover: img("tadao ando concrete architecture light shadow", 1200),
    images: gallery("concrete architecture minimal light shadow interior", 16), },
  { slug: "patricia-urquiola", name: "Patricia Urquiola", origin: "Spain", style: "Playful Modernism",
    description: "Feminine lines, innovative materials — warmth through joyful color and organic form.",
    cover: img("colorful modern curved furniture playful interior", 1200),
    images: gallery("colorful playful modern curved furniture interior design", 16), },
  { slug: "india-mahdavi", name: "India Mahdavi", origin: "France/Iran", style: "Chromatic Joy",
    description: "Vibrant palettes and curved forms celebrating cultural fusion.",
    cover: img("vibrant colorful pink curved restaurant interior", 1200),
    images: gallery("vibrant colorful pastel curved interior design", 16), },
];

export const hotels: Hotel[] = [
  { slug: "aman-tokyo", name: "Aman Tokyo", location: "Tokyo, Japan", style: "Zen Urban Sanctuary",
    description: "A floating temple of calm — washi paper, stone, and water with monastic precision.",
    cover: img("aman tokyo luxury hotel zen interior", 1200),
    images: gallery("aman luxury hotel zen japanese interior spa", 16), },
  { slug: "four-seasons-florence", name: "Four Seasons Firenze", location: "Florence, Italy", style: "Renaissance Palazzo",
    description: "Frescoed ceilings, terraced gardens, and the soul of Tuscan nobility.",
    cover: img("renaissance palazzo fresco italian luxury hotel", 1200),
    images: gallery("renaissance palazzo italian luxury hotel fresco", 16), },
  { slug: "ace-hotel-kyoto", name: "Ace Hotel Kyoto", location: "Kyoto, Japan", style: "East-Meets-West Cool",
    description: "Historic brick meets Japanese craft — cultures colliding in design.",
    cover: img("boutique hotel brick japanese modern lobby", 1200),
    images: gallery("boutique design hotel industrial japanese modern interior", 16), },
  { slug: "amangiri", name: "Amangiri", location: "Utah, USA", style: "Desert Modernism",
    description: "Raw concrete emerging from sandstone — architecture dissolving into desert.",
    cover: img("amangiri desert luxury hotel concrete", 1200),
    images: gallery("desert luxury hotel concrete architecture minimal", 16), },
  { slug: "hoxton-paris", name: "The Hoxton Paris", location: "Paris, France", style: "18th-Century Reinvented",
    description: "A historic hôtel particulier reimagined — rococo bones meet mid-century design.",
    cover: img("hoxton hotel paris historic modern interior", 1200),
    images: gallery("historic hotel paris rococo modern interior design", 16), },
  { slug: "il-sereno", name: "Il Sereno", location: "Lake Como, Italy", style: "Modernist Lakeside",
    description: "Clean lines meet Alpine waters — contemporary luxury on Lake Como.",
    cover: img("lake como modern luxury hotel water view", 1200),
    images: gallery("lake como modern luxury hotel lakeside water view", 16), },
];

export const rooms: Room[] = [
  { slug: "living-room", name: "Living Room", subtitle: "Gathering & Comfort",
    cover: img("beautiful living room natural light interior", 1200),
    items: [
      { name: "Sofas", slug: "sofas", image: img("sofa living room design"), count: 124 },
      { name: "Coffee Tables", slug: "coffee-tables", image: img("coffee table interior design"), count: 98 },
      { name: "Rugs", slug: "rugs", image: img("rug living room interior"), count: 156 },
      { name: "Shelving", slug: "shelving", image: img("bookshelf shelving interior styling"), count: 87 },
      { name: "Lighting", slug: "lighting", image: img("living room lighting pendant lamp"), count: 203 },
    ], },
  { slug: "bedroom", name: "Bedroom", subtitle: "Rest & Restoration",
    cover: img("calm bedroom interior natural light", 1200),
    items: [
      { name: "Beds", slug: "beds", image: img("bed bedroom design"), count: 112 },
      { name: "Nightstands", slug: "nightstands", image: img("nightstand bedside table"), count: 76 },
      { name: "Bedding", slug: "bedding", image: img("bedding linen textile bedroom"), count: 189 },
      { name: "Wardrobes", slug: "wardrobes", image: img("wardrobe closet design"), count: 64 },
      { name: "Lamps", slug: "lamps", image: img("bedroom table lamp lighting"), count: 145 },
    ], },
  { slug: "kitchen", name: "Kitchen", subtitle: "Craft & Nourishment",
    cover: img("beautiful kitchen interior design", 1200),
    items: [
      { name: "Islands", slug: "islands", image: img("kitchen island design"), count: 82 },
      { name: "Cabinetry", slug: "cabinetry", image: img("kitchen cabinet cabinetry"), count: 103 },
      { name: "Backsplash", slug: "backsplash", image: img("kitchen backsplash tile"), count: 91 },
      { name: "Faucets", slug: "faucets", image: img("kitchen faucet design"), count: 68 },
      { name: "Bar Stools", slug: "bar-stools", image: img("bar stool kitchen counter"), count: 55 },
    ], },
  { slug: "bathroom", name: "Bathroom", subtitle: "Ritual & Renewal",
    cover: img("spa bathroom interior design", 1200),
    items: [
      { name: "Vanities", slug: "vanities", image: img("bathroom vanity design"), count: 73 },
      { name: "Bathtubs", slug: "bathtubs", image: img("freestanding bathtub bathroom"), count: 58 },
      { name: "Mirrors", slug: "mirrors", image: img("bathroom mirror design"), count: 94 },
      { name: "Tiles", slug: "tiles", image: img("bathroom tile pattern"), count: 137 },
      { name: "Fixtures", slug: "fixtures", image: img("bathroom brass fixture"), count: 81 },
    ], },
];
