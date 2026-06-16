"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/footer/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Upload, ArrowRight, Loader2 } from "lucide-react";

export default function AIStudioPage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (ev) => setUploadedImage(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  }, []);

  const handleAnalyze = async () => {
    if (!uploadedImage) return;
    setAnalyzing(true);
    // Simulate AI analysis (will be replaced with real Replicate API call)
    await new Promise(r => setTimeout(r, 2500));
    setAnalysis({
      roomType: "Living Room — Open Plan",
      traffic: [
        "Main entry → seating zone: clear 1.2m path",
        "Seating → kitchen: diagonal flow, no obstacles",
        "Natural light corridor from windows to center",
      ],
      furniture: [
        { name: "Low-profile linen sofa", placement: "Against longest wall, facing windows", style: "Japandi" },
        { name: "Round oak coffee table", placement: "Center of seating zone, 45cm from sofa", style: "Scandinavian" },
        { name: "Floor lamp (arc)", placement: "Corner near reading chair", style: "Modern" },
        { name: "Media console", placement: "Opposite sofa, wall-mounted", style: "Minimal" },
      ],
      styles: [
        { name: "Japandi", match: 92, reason: "Clean lines + natural materials dominate the layout" },
        { name: "Scandinavian", match: 78, reason: "Light-filled open plan layout detected" },
        { name: "Wabi-Sabi", match: 65, reason: "Potential for organic textures and neutral palette" },
      ],
      palette: ["#F7F4EF", "#8FA88A", "#C4A882", "#5C4A3A", "#D4CAC0"],
    });
    setAnalyzing(false);
  };

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 px-6 md:px-10 lg:px-14 max-w-[1400px] mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif text-[#3D3227] mb-4" style={{ fontFamily: "'Playfair Display', ui-serif, Georgia, serif" }}>AI Studio</h1>
          <p className="text-[#A0988E] text-lg">Upload a floor plan or room photo — get AI-powered design analysis.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Upload Zone */}
          <div>
            <div
              onDrop={handleDrop}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all cursor-pointer ${dragOver ? "border-[#8FA88A] bg-[#E2EBDF]/30" : "border-[#D4C4AE]/40 hover:border-[#8FA88A]/50"} ${uploadedImage ? "pb-6" : "py-20"}`}
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              <input id="file-upload" type="file" accept="image/*" className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (ev) => setUploadedImage(ev.target?.result as string);
                    reader.readAsDataURL(file);
                  }
                }} />

              {uploadedImage ? (
                <img src={uploadedImage} alt="Floor plan" className="max-h-[300px] mx-auto rounded-lg" />
              ) : (
                <>
                  <Upload size={40} className="mx-auto mb-4 text-[#A0988E]" />
                  <p className="text-[#7A7065] font-medium mb-1">Drop your floor plan here</p>
                  <p className="text-xs text-[#A0988E]">PNG, JPG, or PDF — up to 10MB</p>
                </>
              )}
            </div>

            <button onClick={handleAnalyze} disabled={!uploadedImage || analyzing}
              className="mt-5 w-full flex items-center justify-center gap-2 bg-[#5C4A3A] text-white py-4 rounded-full text-sm tracking-wide hover:bg-[#8B7355] transition-all disabled:opacity-50 disabled:cursor-not-allowed">
              {analyzing ? <><Loader2 size={18} className="animate-spin" /> Analyzing...</> : <><Sparkles size={18} /> Analyze Floor Plan</>}
            </button>

            <p className="text-[10px] text-[#A0988E] mt-3 text-center">
              Powered by Replicate Vision AI · Analysis takes ~5 seconds
            </p>
          </div>

          {/* Results */}
          <div>
            {analysis ? (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
                {/* Room Type */}
                <Card>
                  <CardContent className="p-5">
                    <p className="text-xs text-[#8FA88A] tracking-wider mb-1">DETECTED SPACE</p>
                    <p className="text-xl font-serif text-[#3D3227]" style={{ fontFamily: "'Playfair Display', ui-serif, Georgia, serif" }}>{analysis.roomType}</p>
                  </CardContent>
                </Card>

                {/* Traffic Flow */}
                <Card>
                  <CardContent className="p-5">
                    <p className="text-xs text-[#8FA88A] tracking-wider mb-3">TRAFFIC FLOW</p>
                    {analysis.traffic.map((t: string, i: number) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-[#7A7065] py-1">
                        <ArrowRight size={14} className="mt-0.5 flex-shrink-0 text-[#8FA88A]" />
                        {t}
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Furniture */}
                <Card>
                  <CardContent className="p-5">
                    <p className="text-xs text-[#8FA88A] tracking-wider mb-3">FURNITURE PLACEMENT</p>
                    <div className="space-y-3">
                      {analysis.furniture.map((f: any, i: number) => (
                        <div key={i} className="flex items-center justify-between py-2 border-b border-[#D4C4AE]/10 last:border-0">
                          <div>
                            <p className="text-sm font-medium text-[#3D3227]">{f.name}</p>
                            <p className="text-xs text-[#A0988E]">{f.placement}</p>
                          </div>
                          <span className="text-[10px] px-2 py-1 bg-[#E2EBDF] text-[#5C4A3A] rounded-full">{f.style}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Style Recommendations */}
                <Card>
                  <CardContent className="p-5">
                    <p className="text-xs text-[#8FA88A] tracking-wider mb-3">STYLE MATCH</p>
                    {analysis.styles.map((s: any, i: number) => (
                      <div key={i} className="flex items-center gap-3 py-2">
                        <div className="flex-1">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-[#3D3227]">{s.name}</span>
                            <span className="text-[#8FA88A]">{s.match}%</span>
                          </div>
                          <div className="h-1.5 bg-[#EDE8E0] rounded-full overflow-hidden">
                            <div className="h-full bg-[#8FA88A] rounded-full" style={{ width: `${s.match}%` }} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Colors */}
                <Card>
                  <CardContent className="p-5">
                    <p className="text-xs text-[#8FA88A] tracking-wider mb-3">RECOMMENDED PALETTE</p>
                    <div className="flex gap-2">
                      {analysis.palette.map((c: string) => (
                        <div key={c} className="flex-1 aspect-square rounded-lg shadow-sm" style={{ backgroundColor: c }} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <div className="h-full flex items-center justify-center text-center py-20">
                <div>
                  <Sparkles size={32} className="mx-auto mb-4 text-[#A0988E]/40" />
                  <p className="text-[#A0988E] text-sm">Upload a floor plan to see AI analysis here</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
