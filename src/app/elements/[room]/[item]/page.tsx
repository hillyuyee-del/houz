import Link from "next/link";
import { rooms } from "@/lib/data";
import { ArrowLeft } from "lucide-react";

function itemImages(itemName: string, count = 12): string[] {
  return Array.from({ length: count }, (_, i) =>
    `/api/images?q=${encodeURIComponent(itemName + " interior design")}&i=${i}&w=800`
  );
}

export default async function ItemPage({
  params,
}: {
  params: Promise<{ room: string; item: string }>;
}) {
  const { room: roomSlug, item: itemSlug } = await params;
  const room = rooms.find((r) => r.slug === roomSlug);
  const item = room?.items.find((i) => i.slug === itemSlug);
  const images = itemImages(item?.name || itemSlug, 12);

  if (!room || !item) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F4EF]">
        <div className="text-center">
          <h1 className="heading-md text-[#3D3227] mb-4">Not Found</h1>
          <Link href="/#elements" className="text-sm text-[#8FA88A] hover:underline">← Back to Elements</Link>
        </div>
      </div>
    );
  }

  const displayName = item.name.charAt(0).toUpperCase() + item.name.slice(1);

  return (
    <div className="min-h-screen bg-[#F7F4EF]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-14 pt-28 pb-12">
        <Link href="/#elements" className="inline-flex items-center gap-2 text-sm text-[#8FA88A] hover:text-[#6B8B65] transition-colors mb-8">
          <ArrowLeft size={16} /> Back to Elements
        </Link>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
          <div>
            <p className="label mb-3 text-[#8FA88A]">{room.name} · {item.count} designs</p>
            <h1 className="heading-xl text-[#3D3227]" style={{ fontFamily: "'Playfair Display', ui-serif, Georgia, serif" }}>{displayName}</h1>
          </div>
          <p className="body-lg text-[#A0988E] max-w-[400px]">A curated collection of {displayName.toLowerCase()} across styles.</p>
        </div>
      </div>
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-14 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((img, i) => {
            const isLarge = i === 0 || i === 4 || i === 8;
            return (
              <div key={i} className={`overflow-hidden bg-[#EDE8E0] rounded-lg ${isLarge ? "md:col-span-2 lg:col-span-2" : ""} ${isLarge ? "aspect-[3/2]" : "aspect-[1/1]"}`}>
                <img src={img} alt={`${displayName} ${i + 1}`} className="w-full h-full object-cover transition-transform duration-1000 hover:scale-[1.02]" loading={i < 4 ? "eager" : "lazy"} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
