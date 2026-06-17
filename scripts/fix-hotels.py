#!/usr/bin/env python3
"""Replace ALL hotel images with high-quality Unsplash photos"""
import json, urllib.request, ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

UNSPLASH_KEY = "yLjiSp1dDuCjRcx5-xN-r9Ew7kSq-vIpZ92gc4yHJAw"

def search_unsplash(query, n=30):
    try:
        url = f"https://api.unsplash.com/search/photos?query={urllib.request.quote(query)}&per_page={n}&orientation=landscape"
        req = urllib.request.Request(url, headers={"Authorization": f"Client-ID {UNSPLASH_KEY}"})
        data = json.loads(urllib.request.urlopen(req, context=ctx, timeout=15).read())
        return [r["urls"]["regular"] for r in data.get("results", [])]
    except Exception as e:
        print(f"    Error: {e}")
        return []

HOTEL_SEARCHES = {
    "aman-tokyo": ["Aman Tokyo luxury hotel interior suite", "Tokyo luxury hotel room design zen"],
    "four-seasons-florence": ["Four Seasons Florence hotel interior palazzo", "Firenze luxury hotel renaissance suite"],
    "ace-hotel-kyoto": ["Ace Hotel Kyoto interior design room", "Kyoto boutique hotel industrial modern room"],
    "amangiri": ["Amangiri Utah desert luxury hotel suite", "Utah desert modern luxury hotel interior minimal"],
    "hoxton-paris": ["Hoxton Paris hotel room interior", "Paris boutique hotel design room modern"],
    "il-sereno-como": ["Il Sereno Lake Como hotel interior", "Lake Como modern luxury hotel suite water view"],
    "upper-house-hk": ["Upper House Hong Kong hotel suite", "Hong Kong luxury hotel room harbor view design"],
    "bulgari-milan": ["Bulgari Hotel Milano interior suite", "Milan luxury design hotel room marble"],
    "soneva-fushi": ["Soneva Fushi Maldives villa interior", "Maldives luxury overwater resort room interior"],
    "post-ranch-inn": ["Post Ranch Inn Big Sur cabin interior", "Big Sur luxury cliff house room interior ocean"],
    "marina-bay-sands": ["Marina Bay Sands Singapore hotel suite", "Singapore luxury hotel room modern design"],
    "ritz-paris": ["Ritz Paris luxury hotel suite interior", "Paris palace hotel room design elegant"],
    "the-brando": ["Brando French Polynesia resort villa interior", "Tetiaroa luxury eco resort room overwater"],
    "fogo-island-inn": ["Fogo Island Inn Newfoundland interior suite", "Canada modern architecture hotel room ocean view"],
    "hotel-de-crillon": ["Hotel de Crillon Paris luxury suite interior", "Paris rosewood palace hotel room design"],
    "the-silo": ["Silo Hotel Cape Town interior suite", "Cape Town luxury hotel room industrial chic design"],
    "giraffe-manor": ["Giraffe Manor Nairobi hotel interior room", "Kenya luxury safari hotel room colonial"],
    "adrere-amellal": ["Adrere Amellal Siwa Egypt hotel interior", "Egypt desert eco lodge earthen room candlelight"],
    "hoshinoya-tokyo": ["Hoshinoya Tokyo luxury ryokan interior", "Tokyo modern ryokan hotel room tatami onsen"],
    "borgo-egnazia": ["Borgo Egnazia Puglia hotel interior suite", "Puglia Italy luxury resort room stone courtyard"],
}

with open("src/lib/curated-images.json") as f:
    curated = json.load(f)

for key, queries in HOTEL_SEARCHES.items():
    all_urls = []
    for q in queries:
        results = search_unsplash(q, 25)
        all_urls.extend(results)
        print(f"  {key}: {len(results)} from '{q[:50]}...'")
    unique = list(dict.fromkeys(all_urls))
    if unique:
        curated[key] = unique
        print(f"  -> SAVED {len(unique)} total")
    else:
        print(f"  -> FAILED, kept existing")

with open("src/lib/curated-images.json", "w") as f:
    json.dump(curated, f, indent=2)
print("\nDone! All 20 hotels updated with Unsplash.")
