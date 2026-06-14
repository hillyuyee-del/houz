// ── Shared design inspiration data ──
// Images via /api/images — dual-source: Pexels + Unsplash, merged & shuffled

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

// ── Countries (aesthetic keywords: wood, plant, natural light, minimal) ──

export const countries: Country[] = [
  { slug: "japan", name: "Japan", subtitle: "Wabi-sabi & Zen Minimalism",
    description: "Imperfect beauty, natural materials, and the poetry of empty space.",
    cover: img("japanese wabi sabi wood interior plant natural light aesthetic", 1200),
    images: gallery("japanese wabi sabi zen wood interior plant natural light minimal aesthetic", 24), },
  { slug: "italy", name: "Italy", subtitle: "Mediterranean & Modern Classic",
    description: "Sun-drenched stone, classical proportions, effortless elegance.",
    cover: img("italian mediterranean villa stone interior terracotta aesthetic", 1200),
    images: gallery("italian mediterranean villa tuscan stone terracotta interior design aesthetic", 24), },
  { slug: "france", name: "France", subtitle: "Parisian & Provençal Charm",
    description: "Classical bones, romantic spirit, herringbone floors, marble mantels.",
    cover: img("parisian apartment haussmann herringbone interior elegant aesthetic", 1200),
    images: gallery("parisian french provencal chateau herringbone interior elegant aesthetic", 24), },
  { slug: "denmark", name: "Denmark", subtitle: "Scandinavian & Hygge Warmth",
    description: "Light-filled simplicity — functional beauty meets hygge coziness.",
    cover: img("danish hygge scandinavian living room wood light aesthetic", 1200),
    images: gallery("danish scandinavian nordic hygge wood interior bright plant aesthetic", 24), },
  { slug: "morocco", name: "Morocco", subtitle: "Islamic Geometry & Berber Craft",
    description: "Intricate zellige tiles, carved plaster, richly layered textiles.",
    cover: img("moroccan riad zellige tile courtyard interior plant aesthetic", 1200),
    images: gallery("moroccan riad marrakech zellige tile carved plaster interior aesthetic", 24), },
  { slug: "china", name: "China", subtitle: "Contemporary Eastern Aesthetics",
    description: "Ming dynasty philosophy reimagined through a modernist lens.",
    cover: img("chinese contemporary modern courtyard interior wood plant aesthetic", 1200),
    images: gallery("chinese modern traditional courtyard tea room wood bamboo interior aesthetic", 24), },
];

// ── Designers ──

export const designers: Designer[] = [
  { slug: "kelly-wearstler", name: "Kelly Wearstler", origin: "USA", style: "Maximalist Luxury",
    description: "Bold juxtapositions of texture, pattern, and sculptural forms.",
    cover: img("luxury maximalist interior marble brass sculptural design aesthetic", 1200),
    images: gallery("luxury maximalist bold sculptural interior marble brass design aesthetic", 24), },
  { slug: "axel-vervoordt", name: "Axel Vervoordt", origin: "Belgium", style: "Wabi Minimalism",
    description: "Timeless spaces honoring raw materials, emptiness, and patina.",
    cover: img("wabi sabi minimal interior raw stone wood patina aesthetic", 1200),
    images: gallery("wabi sabi minimal raw concrete stone wood natural interior aesthetic", 24), },
  { slug: "ilse-crawford", name: "Ilse Crawford", origin: "UK", style: "Human-Centric Design",
    description: "Spaces for wellbeing — materiality, comfort, sensory delight.",
    cover: img("cozy natural warm interior wood wool wellbeing aesthetic", 1200),
    images: gallery("cozy warm natural tactile wool linen wood interior design aesthetic", 24), },
  { slug: "tadao-ando", name: "Tadao Ando", origin: "Japan", style: "Concrete Poetry",
    description: "Light, shadow, and exposed concrete in profound spatial harmony.",
    cover: img("tadao ando concrete architecture light shadow interior minimal aesthetic", 1200),
    images: gallery("concrete architecture minimal light shadow zen interior aesthetic", 24), },
  { slug: "patricia-urquiola", name: "Patricia Urquiola", origin: "Spain", style: "Playful Modernism",
    description: "Feminine lines, innovative materials, joyful color and organic form.",
    cover: img("colorful modern curved furniture playful interior plant aesthetic", 1200),
    images: gallery("colorful playful modern curved organic furniture interior design aesthetic", 24), },
  { slug: "india-mahdavi", name: "India Mahdavi", origin: "France/Iran", style: "Chromatic Joy",
    description: "Vibrant palettes and curved forms celebrating cultural fusion.",
    cover: img("vibrant colorful pink curved arch interior design aesthetic", 1200),
    images: gallery("vibrant colorful pastel pink curved arch interior design aesthetic", 24), },
];

// ── Hotels ──

export const hotels: Hotel[] = [
  { slug: "aman-tokyo", name: "Aman Tokyo", location: "Tokyo, Japan", style: "Zen Urban Sanctuary",
    description: "A floating temple of calm — washi paper, stone, and water.",
    cover: img("aman luxury hotel zen japanese interior washi stone water aesthetic", 1200),
    images: gallery("aman luxury hotel zen japanese interior spa washi paper stone water aesthetic", 24), },
  { slug: "four-seasons-florence", name: "Four Seasons Firenze", location: "Florence, Italy", style: "Renaissance Palazzo",
    description: "Frescoed ceilings, terraced gardens, Tuscan nobility.",
    cover: img("renaissance palazzo fresco italian luxury hotel garden aesthetic", 1200),
    images: gallery("renaissance palazzo fresco italian luxury hotel garden interior aesthetic", 24), },
  { slug: "ace-hotel-kyoto", name: "Ace Hotel Kyoto", location: "Kyoto, Japan", style: "East-Meets-West Cool",
    description: "Historic brick meets Japanese craft — cultures colliding.",
    cover: img("boutique design hotel brick japanese modern lobby plant aesthetic", 1200),
    images: gallery("boutique design hotel industrial japanese modern craft interior aesthetic", 24), },
  { slug: "amangiri", name: "Amangiri", location: "Utah, USA", style: "Desert Modernism",
    description: "Raw concrete emerging from sandstone — dissolving into desert.",
    cover: img("amangiri desert luxury hotel concrete sandstone architecture aesthetic", 1200),
    images: gallery("desert luxury hotel concrete architecture sandstone minimal interior aesthetic", 24), },
  { slug: "hoxton-paris", name: "The Hoxton Paris", location: "Paris, France", style: "18th-Century Reinvented",
    description: "Historic hôtel particulier — rococo bones, mid-century design.",
    cover: img("historic hotel paris rococo mid century modern interior design aesthetic", 1200),
    images: gallery("historic hotel paris rococo modern eclectic interior design aesthetic", 24), },
  { slug: "il-sereno", name: "Il Sereno", location: "Lake Como, Italy", style: "Modernist Lakeside",
    description: "Clean lines meet Alpine waters — contemporary lake luxury.",
    cover: img("lake como modern luxury hotel water view interior aesthetic", 1200),
    images: gallery("lake como modern luxury hotel lakeside water glass interior aesthetic", 24), },
];

// ── Rooms & Elements ──

export const rooms: Room[] = [
  { slug: "living-room", name: "Living Room", subtitle: "Gathering & Comfort",
    cover: img("beautiful living room natural light wood plant aesthetic", 1200),
    items: [
      { name: "Sofas", slug: "sofas", image: img("sofa living room design aesthetic"), count: 124 },
      { name: "Coffee Tables", slug: "coffee-tables", image: img("coffee table wood interior design aesthetic"), count: 98 },
      { name: "Rugs", slug: "rugs", image: img("rug living room wool interior aesthetic"), count: 156 },
      { name: "Shelving", slug: "shelving", image: img("bookshelf shelving interior styling aesthetic"), count: 87 },
      { name: "Lighting", slug: "lighting", image: img("living room lighting pendant lamp aesthetic"), count: 203 },
    ], },
  { slug: "bedroom", name: "Bedroom", subtitle: "Rest & Restoration",
    cover: img("calm bedroom interior natural light wood plant aesthetic", 1200),
    items: [
      { name: "Beds", slug: "beds", image: img("bed bedroom design linen aesthetic"), count: 112 },
      { name: "Nightstands", slug: "nightstands", image: img("nightstand bedside table wood aesthetic"), count: 76 },
      { name: "Bedding", slug: "bedding", image: img("bedding linen textile bedroom aesthetic"), count: 189 },
      { name: "Wardrobes", slug: "wardrobes", image: img("wardrobe closet design wood aesthetic"), count: 64 },
      { name: "Lamps", slug: "lamps", image: img("bedroom table lamp warm lighting aesthetic"), count: 145 },
    ], },
  { slug: "kitchen", name: "Kitchen", subtitle: "Craft & Nourishment",
    cover: img("beautiful kitchen interior design wood plant aesthetic", 1200),
    items: [
      { name: "Islands", slug: "islands", image: img("kitchen island marble wood design aesthetic"), count: 82 },
      { name: "Cabinetry", slug: "cabinetry", image: img("kitchen cabinet cabinetry wood aesthetic"), count: 103 },
      { name: "Backsplash", slug: "backsplash", image: img("kitchen backsplash tile ceramic aesthetic"), count: 91 },
      { name: "Faucets", slug: "faucets", image: img("kitchen faucet brass design aesthetic"), count: 68 },
      { name: "Bar Stools", slug: "bar-stools", image: img("bar stool kitchen counter wood aesthetic"), count: 55 },
    ], },
  { slug: "bathroom", name: "Bathroom", subtitle: "Ritual & Renewal",
    cover: img("spa bathroom interior design stone plant aesthetic", 1200),
    items: [
      { name: "Vanities", slug: "vanities", image: img("bathroom vanity wood marble design aesthetic"), count: 73 },
      { name: "Bathtubs", slug: "bathtubs", image: img("freestanding bathtub bathroom stone aesthetic"), count: 58 },
      { name: "Mirrors", slug: "mirrors", image: img("bathroom mirror round design aesthetic"), count: 94 },
      { name: "Tiles", slug: "tiles", image: img("bathroom tile pattern ceramic aesthetic"), count: 137 },
      { name: "Fixtures", slug: "fixtures", image: img("bathroom brass fixture design aesthetic"), count: 81 },
    ], },
];
