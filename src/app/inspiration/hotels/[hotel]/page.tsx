import Link from "next/link";
import { hotels } from "@/lib/data";
import { ArrowLeft } from "lucide-react";

export default async function HotelPage({
  params,
}: {
  params: Promise<{ hotel: string }>;
}) {
  const { hotel: slug } = await params;
  const hotel = hotels.find((h) => h.slug === slug);

  if (!hotel) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F4EF]">
        <div className="text-center">
          <h1 className="heading-md text-[#3D3227] mb-4">Hotel Not Found</h1>
          <Link href="/" className="text-sm text-[#8FA88A] hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F4EF]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-14 pt-28 pb-12">
        <Link
          href="/#inspiration"
          className="inline-flex items-center gap-2 text-sm text-[#8FA88A] hover:text-[#6B8B65] transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to Inspiration
        </Link>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
          <div>
            <p className="label mb-3 text-[#8FA88A]">
              {hotel.location} · {hotel.style}
            </p>
            <h1
              className="heading-xl text-[#3D3227]"
              style={{ fontFamily: "'Playfair Display', ui-serif, Georgia, serif" }}
            >
              {hotel.name}
            </h1>
          </div>
          <p className="body-lg text-[#A0988E] max-w-[400px]">
            {hotel.description}
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-14 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {hotel.images.map((img, i) => (
            <div
              key={i}
              className={`overflow-hidden bg-[#EDE8E0] ${
                i === 0 ? "md:col-span-2 aspect-[2/1]" : "aspect-[4/3]"
              }`}
            >
              <img
                src={img}
                alt={`${hotel.name} interior ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-[1.02]"
                loading={i === 0 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
