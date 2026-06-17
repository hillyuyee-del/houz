"use client";

import { Navbar } from "@/components/navigation/navbar";
import { HeroSection } from "@/components/hero/hero-section";
import { StyleCategories } from "@/components/home/style-categories";
import { CountryExplorer } from "@/components/home/country-explorer";
import { HomeMasonry } from "@/components/home/home-masonry";
import { Footer } from "@/components/footer/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <StyleCategories />
        <CountryExplorer />
        <HomeMasonry />
      </main>
      <Footer />
    </>
  );
}
