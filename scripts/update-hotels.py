#!/usr/bin/env python3
"""Update all 20 hotel images using Unsplash + Pexels APIs"""
import json, urllib.request, ssl

# Fix SSL for macOS Python
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

PEXELS_KEY = "hkv2TWNv9xVPQSXos2Ix2PKOd2tJSnTeKHObxZWHXmAlZS5Xp7EQkBZz"
UNSPLASH_KEY = "yLjiSp1dDuCjRcx5-xN-r9Ew7kSq-vIpZ92gc4yHJAw"
JSON_PATH = "src/lib/curated-images.json"

def search_pexels(query, n=30):
    try:
        url = f"https://api.pexels.com/v1/search?query={urllib.request.quote(query)}&per_page={n}&orientation=landscape&size=large"
        req = urllib.request.Request(url, headers={"Authorization": PEXELS_KEY})
        data = json.loads(urllib.request.urlopen(req, context=ctx, timeout=15).read())
        return [p["src"]["large"] for p in data.get("photos", [])]
    except Exception as e:
        return []

def search_unsplash(query, n=30):
    try:
        url = f"https://api.unsplash.com/search/photos?query={urllib.request.quote(query)}&per_page={n}&orientation=landscape"
        req = urllib.request.Request(url, headers={"Authorization": f"Client-ID {UNSPLASH_KEY}"})
        data = json.loads(urllib.request.urlopen(req, context=ctx, timeout=15).read())
        return [r["urls"]["regular"] for r in data.get("results", [])]
    except Exception as e:
        return []

HOTELS = {
    "aman-tokyo": "Aman Tokyo luxury hotel suite bedroom bathroom interior design",
    "four-seasons-florence": "Four Seasons Firenze Florence luxury palazzo hotel suite bedroom interior",
    "ace-hotel-kyoto": "Ace Hotel Kyoto boutique luxury hotel room lobby interior design",
    "amangiri": "Amangiri Utah desert luxury hotel suite bedroom interior",
    "hoxton-paris": "Hoxton Paris luxury hotel room suite bedroom interior design",
    "il-sereno-como": "Il Sereno Lake Como luxury hotel suite room interior design",
    "upper-house-hk": "Upper House Hong Kong luxury hotel suite bedroom bathroom interior",
    "bulgari-milan": "Bulgari Hotel Milano Milan luxury suite bedroom interior design",
    "soneva-fushi": "Soneva Fushi Maldives luxury resort villa bedroom bathroom interior",
    "post-ranch-inn": "Post Ranch Inn Big Sur luxury cabin suite bedroom interior",
    "marina-bay-sands": "Marina Bay Sands Singapore hotel luxury suite bedroom interior",
    "ritz-paris": "Ritz Paris luxury hotel suite bedroom bathroom interior design",
    "the-brando": "The Brando French Polynesia luxury resort villa suite interior",
    "fogo-island-inn": "Fogo Island Inn Newfoundland luxury hotel suite interior architecture",
    "hotel-de-crillon": "Hotel de Crillon Paris luxury suite bedroom interior design",
    "the-silo": "The Silo Hotel Cape Town luxury suite bedroom interior design",
    "giraffe-manor": "Giraffe Manor Nairobi Kenya luxury hotel interior room",
    "adrere-amellal": "Adrere Amellal Siwa Egypt luxury hotel interior design earthen",
    "hoshinoya-tokyo": "Hoshinoya Tokyo luxury ryokan hotel suite interior design",
    "borgo-egnazia": "Borgo Egnazia Puglia Italy luxury hotel suite interior design",
}

with open(JSON_PATH) as f:
    curated = json.load(f)

for key, query in HOTELS.items():
    print(f"Searching: {key}...")
    pexels = search_pexels(query, 25)
    unsplash = search_unsplash(query, 25)
    all_urls = list(dict.fromkeys(unsplash + pexels))
    if all_urls:
        curated[key] = all_urls
        print(f"  -> {len(all_urls)} images (Unsplash:{len(unsplash)} + Pexels:{len(pexels)})")
    else:
        print(f"  -> keeping existing {len(curated.get(key,[]))}")

with open(JSON_PATH, "w") as f:
    json.dump(curated, f, indent=2)
print(f"\nDone! {len(HOTELS)} hotels updated.")
PYEOF
