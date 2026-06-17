// ── Luxury Hospitality Data ──
// Brands → Properties → Collections

export interface HotelProperty {
  slug: string;
  name: string;
  location: string;
  brand: string;
  style: string;
  description: string;
  imageQuery: string; // Unsplash search query
}

export interface HotelBrand {
  slug: string;
  name: string;
  description: string;
  properties: HotelProperty[];
}

export interface Collection {
  slug: string;
  title: string;
  description: string;
  imageQuery: string;
  tags: string[];
}

// ── Luxury Hotel Brands ──

export const hotelBrands: HotelBrand[] = [
  {
    slug: "aman",
    name: "Aman",
    description: "Sanctuaries of peace — each Aman is a one-of-a-kind retreat in an extraordinary location.",
    properties: [
      { slug: "aman-tokyo", name: "Aman Tokyo", location: "Tokyo, Japan", brand: "Aman", style: "Zen Urban Sanctuary",
        description: "A floating temple of calm 30 floors above the city — washi paper, stone, water.",
        imageQuery: "Aman Tokyo hotel suite interior design zen luxury" },
      { slug: "aman-venice", name: "Aman Venice", location: "Venice, Italy", brand: "Aman", style: "Palazzo Grandeur",
        description: "16th-century palazzo on the Grand Canal — Tiepolo frescoes, gilded ceilings.",
        imageQuery: "Aman Venice palazzo hotel interior luxury suite" },
      { slug: "aman-giri", name: "Amangiri", location: "Utah, USA", brand: "Aman", style: "Desert Modernism",
        description: "Raw concrete emerging from sandstone — dissolving into the vast desert.",
        imageQuery: "Amangiri Utah desert luxury hotel suite interior" },
      { slug: "aman-jiwo", name: "Amanjiwo", location: "Java, Indonesia", brand: "Aman", style: "Temple Spirituality",
        description: "Borobudur's spiritual twin — circular limestone monolith facing ancient stupas.",
        imageQuery: "Amanjiwo Java luxury resort suite interior" },
      { slug: "aman-new-york", name: "Aman New York", location: "New York, USA", brand: "Aman", style: "Urban Sanctuary",
        description: "Crown Building penthouse transformed — 25m pool, jazz bar, Japanese garden.",
        imageQuery: "Aman New York hotel luxury suite interior" },
    ],
  },
  {
    slug: "rosewood",
    name: "Rosewood",
    description: "A Sense of Place — each property reflects the history, culture, and sensibilities of its location.",
    properties: [
      { slug: "rosewood-hk", name: "Rosewood Hong Kong", location: "Hong Kong", brand: "Rosewood", style: "Harbourfront Grandeur",
        description: "Tony Chi's masterpiece — Victoria Harbour views, butterfly art, marble baths.",
        imageQuery: "Rosewood Hong Kong hotel luxury suite interior" },
      { slug: "rosewood-london", name: "Rosewood London", location: "London, UK", brand: "Rosewood", style: "Edwardian Elegance",
        description: "1914 Belle Époque building — 12 galleries, Sense spa, Scarfes Bar.",
        imageQuery: "Rosewood London hotel luxury suite interior" },
      { slug: "rosewood-paris", name: "Hôtel de Crillon", location: "Paris, France", brand: "Rosewood", style: "18th-Century Grandeur",
        description: "Place de la Concorde icon — Karl Lagerfeld suites, Les Ambassadeurs bar.",
        imageQuery: "Hotel de Crillon Paris luxury suite interior" },
    ],
  },
  {
    slug: "edition",
    name: "EDITION",
    description: "Ian Schrager's boutique revolution — sophisticated, original, and one-of-a-kind.",
    properties: [
      { slug: "edition-tokyo", name: "The Tokyo EDITION Toranomon", location: "Tokyo, Japan", brand: "EDITION", style: "Modern Tokyo",
        description: "Kengo Kuma-designed — walnut, gold leaf, and sweeping bay views.",
        imageQuery: "Tokyo EDITION hotel luxury suite interior design" },
      { slug: "edition-miami", name: "The Miami Beach EDITION", location: "Miami, USA", brand: "EDITION", style: "Tropical Modernism",
        description: "Mid-century modern on Collins Avenue — white marble, gold accents, ocean breeze.",
        imageQuery: "Miami Beach EDITION hotel luxury suite interior" },
    ],
  },
  {
    slug: "six-senses",
    name: "Six Senses",
    description: "Sustainability meets sensory luxury — wellness, nature, and extraordinary design.",
    properties: [
      { slug: "six-senses-douro", name: "Six Senses Douro Valley", location: "Douro, Portugal", brand: "Six Senses", style: "Wine Country Retreat",
        description: "19th-century manor house — vineyard views, spa, and Michelin-star dining.",
        imageQuery: "Six Senses Douro Valley luxury resort interior" },
      { slug: "six-senses-bhutan", name: "Six Senses Bhutan", location: "Bhutan", brand: "Six Senses", style: "Himalayan Sanctuary",
        description: "Five lodges across the Dragon Kingdom — prayer flags, stone, and sky.",
        imageQuery: "Six Senses Bhutan luxury lodge interior" },
      { slug: "six-senses-ibiza", name: "Six Senses Ibiza", location: "Ibiza, Spain", brand: "Six Senses", style: "Bohemian Cala",
        description: "Xarraca Bay cliffside — recording studio, organic gardens, crystal healing.",
        imageQuery: "Six Senses Ibiza luxury resort suite interior" },
    ],
  },
  {
    slug: "bulgari",
    name: "Bulgari Hotels",
    description: "Roman jeweler turned hotelier — Italian luxury expressed through architecture.",
    properties: [
      { slug: "bulgari-milan", name: "Bulgari Hotel Milano", location: "Milan, Italy", brand: "Bulgari", style: "Italian Modernist",
        description: "18th-century palazzo — black marble, teak, 4000sqm private garden.",
        imageQuery: "Bulgari Hotel Milano Milan luxury suite interior" },
      { slug: "bulgari-paris", name: "Bulgari Hotel Paris", location: "Paris, France", brand: "Bulgari", style: "Golden Triangle",
        description: "Avenue George V — Italian craftsmanship meets Parisian elegance.",
        imageQuery: "Bulgari Hotel Paris luxury suite interior" },
      { slug: "bulgari-bali", name: "Bulgari Resort Bali", location: "Bali, Indonesia", brand: "Bulgari", style: "Cliffside Sanctuary",
        description: "150m above the Indian Ocean — volcanic stone, thatched roofs, infinity.",
        imageQuery: "Bulgari Resort Bali luxury villa interior" },
    ],
  },
  {
    slug: "park-hyatt",
    name: "Park Hyatt",
    description: "Understated luxury — residential warmth in the world's most vibrant cities.",
    properties: [
      { slug: "park-hyatt-tokyo", name: "Park Hyatt Tokyo", location: "Tokyo, Japan", brand: "Park Hyatt", style: "Lost in Translation",
        description: "Shinjuku sky-high — H-shaped tower, New York Bar, 47th-floor pool.",
        imageQuery: "Park Hyatt Tokyo hotel luxury suite interior" },
      { slug: "park-hyatt-kyoto", name: "Park Hyatt Kyoto", location: "Kyoto, Japan", brand: "Park Hyatt", style: "Higashiyama Heritage",
        description: "Ninenzaka hillside — tatami suites, tea house, Yasaka Pagoda views.",
        imageQuery: "Park Hyatt Kyoto luxury hotel suite interior" },
      { slug: "park-hyatt-milan", name: "Park Hyatt Milano", location: "Milan, Italy", brand: "Park Hyatt", style: "Galleria Grandeur",
        description: "Steps from Duomo — travertine, Murano glass, Michelin-star dining.",
        imageQuery: "Park Hyatt Milan luxury hotel suite interior" },
    ],
  },
];

// ── Netflix-style Collections ──

export const hotelCollections: Collection[] = [
  {
    slug: "best-bathrooms",
    title: "Best Hotel Bathrooms",
    description: "Marble sanctuaries, soaking tubs with views, and rain showers worth traveling for.",
    imageQuery: "luxury hotel bathroom marble bathtub spa interior design",
    tags: ["bathroom", "spa", "marble", "bathtub", "luxury"],
  },
  {
    slug: "tokyo-luxury",
    title: "Tokyo Luxury Hotels",
    description: "The world's most sophisticated hotel city — from Shinjuku skyscrapers to Higashiyama hideaways.",
    imageQuery: "Tokyo luxury hotel suite interior design minimal",
    tags: ["tokyo", "japan", "luxury", "modern"],
  },
  {
    slug: "minimalist-bedrooms",
    title: "Minimalist Hotel Bedrooms",
    description: "When less is more — serene hotel bedrooms that prove restraint is the ultimate luxury.",
    imageQuery: "minimalist luxury hotel bedroom interior design serene",
    tags: ["bedroom", "minimal", "serene", "luxury"],
  },
  {
    slug: "lobby-design",
    title: "World's Best Hotel Lobbies",
    description: "First impressions that take your breath away — soaring ceilings, statement art, unforgettable arrivals.",
    imageQuery: "luxury hotel lobby interior design dramatic architecture",
    tags: ["lobby", "architecture", "dramatic", "design"],
  },
  {
    slug: "pool-perfection",
    title: "Pool Perfection",
    description: "Infinity edges, rooftop views, and desert oases — pools that redefine the art of doing nothing.",
    imageQuery: "luxury hotel infinity pool view design architecture",
    tags: ["pool", "outdoor", "infinity", "water"],
  },
  {
    slug: "japanese-ryokan",
    title: "Japanese Ryokan & Onsen",
    description: "Centuries of tradition in timber, stone, and hot spring water — Japan's original luxury.",
    imageQuery: "japanese ryokan onsen luxury hotel interior tatami",
    tags: ["japan", "ryokan", "onsen", "traditional", "tatami"],
  },
];
