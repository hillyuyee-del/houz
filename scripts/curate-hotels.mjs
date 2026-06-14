// Curate real hotel images from Unsplash (travel photographers upload real hotel photos)
const UNSPLASH_KEY = "yLjiSp1dDuCjRcx5-xN-r9Ew7kSq-vIpZ92gc4yHJAw";
const PEXELS_KEY = "hkv2TWNv9xVPQSXos2Ix2PKOd2tJSnTeKHObxZWHXmAlZS5Xp7EQkBZz";

const HOTELS = {
  "aman-tokyo": ["Aman Tokyo hotel interior", "Aman Tokyo suite lobby", "東京 アマン ホテル 内装"],
  "four-seasons-florence": ["Four Seasons Firenze hotel interior", "Four Seasons Florence palazzo suite", "Firenze Four Seasons hotel camera"],
  "ace-hotel-kyoto": ["Ace Hotel Kyoto interior", "Ace Hotel Kyoto room design", "エースホテル京都 内装"],
  "amangiri": ["Amangiri Utah hotel interior", "Amangiri desert luxury suite", "Amangiri resort inside"],
  "hoxton-paris": ["Hoxton Paris hotel interior", "Hoxton Paris room suite", "Hoxton Paris chambre"],
  "il-sereno-como": ["Il Sereno Lake Como hotel interior", "Il Sereno Como luxury room", "Il Sereno Lago di Como suite"],
  "upper-house-hk": ["Upper House Hong Kong hotel interior", "Upper House HK suite room", "奕居 酒店 香港 室內"],
  "bulgari-milan": ["Bulgari Hotel Milan interior", "Bulgari Milano hotel suite", "Bulgari Hotel Milano camera"],
  "soneva-fushi": ["Soneva Fushi Maldives villa interior", "Soneva Fushi resort inside", "Soneva Fushi luxury room"],
  "post-ranch-inn": ["Post Ranch Inn Big Sur interior", "Post Ranch Inn cabin room", "Post Ranch Inn California suite"],
  "marina-bay-sands": ["Marina Bay Sands hotel suite interior", "Marina Bay Sands room inside", "Marina Bay Sands Singapore camera"],
  "ritz-paris": ["Ritz Paris hotel suite interior", "Ritz Paris luxury room", "Ritz Paris chambre luxe"],
};

// Style-specific interior searches
const STYLES = {
  "italy-interior": ["Italian luxury living room interior design", "Italian classic bedroom furniture decor", "casa italiana salotto arredamento lusso"],
  "france-interior": ["Parisian apartment living room interior design", "French chateau bedroom decor", "appartement haussmannien salon décoration"],
  "japan-interior": ["Japanese wabi sabi living room interior", "Japanese modern bedroom zen design", "和モダン リビング インテリア"],
};

async function searchUnsplash(query) {
  const res = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=20&orientation=landscape`, {
    headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` }
  });
  const data = await res.json();
  return (data.results || []).map(r => r.urls.regular);
}

async function searchPexels(query) {
  const res = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=15&orientation=landscape&size=large`, {
    headers: { Authorization: PEXELS_KEY }
  });
  const data = await res.json();
  return (data.photos || []).map(p => p.src.large);
}

async function curate() {
  const fs = await import("fs");

  // Read existing curated data
  const existing = JSON.parse(fs.readFileSync("src/lib/curated-images.json", "utf-8"));

  // Process hotels + styles
  const allCategories = { ...HOTELS, ...STYLES };

  for (const [key, queries] of Object.entries(allCategories)) {
    console.log(`Curating: ${key}...`);
    const allUrls = new Set();

    for (const query of queries) {
      const [pexels, unsplash] = await Promise.all([
        searchPexels(query).catch(() => []),
        searchUnsplash(query).catch(() => []),
      ]);
      pexels.forEach(u => allUrls.add(u));
      unsplash.forEach(u => allUrls.add(u));
    }

    const urls = [...allUrls];
    console.log(`  → ${urls.length} unique images from ${queries.length} queries`);

    if (urls.length > 0) {
      existing[key] = urls;
    }
  }

  fs.writeFileSync("src/lib/curated-images.json", JSON.stringify(existing, null, 2));
  console.log("\nDone! Updated curated-images.json");

  for (const [key, queries] of Object.entries(allCategories)) {
    console.log(`  ${key}: ${(existing[key] || []).length} images`);
  }
}

curate().catch(console.error);
