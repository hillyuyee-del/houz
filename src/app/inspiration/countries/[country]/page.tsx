import Link from "next/link";
import { countries } from "@/lib/data";
import { ArrowLeft } from "lucide-react";

export default async function CountryPage({
  params,
}: {
  params: Promise<{ country: string }>;
}) {
  const { country: slug } = await params;
  const country = countries.find((c) => c.slug === slug);

  if (!country) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F4EF]">
        <div className="text-center">
          <h1 className="heading-md text-[#3D3227] mb-4">Country Not Found</h1>
          <Link href="/" className="text-sm text-[#8FA88A] hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F4EF]">
      {/* Header */}
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
            <p className="label mb-3 text-[#8FA88A]">{country.subtitle}</p>
            <h1
              className="heading-xl text-[#3D3227]"
              style={{ fontFamily: "'Playfair Display', ui-serif, Georgia, serif" }}
            >
              {country.name}
            </h1>
          </div>
          <p className="body-lg text-[#A0988E] max-w-[400px]">
            {country.description}
          </p>
        </div>
      </div>

      {/* Image Gallery — clean, spacious layout */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-14 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {country.images.map((img, i) => (
            <div
              key={i}
              className={`overflow-hidden bg-[#EDE8E0] ${
                i === 0 ? "md:col-span-2 aspect-[2/1]" : "aspect-[4/3]"
              }`}
            >
              <img
                src={img}
                alt={`${country.name} interior design ${i + 1}`}
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
