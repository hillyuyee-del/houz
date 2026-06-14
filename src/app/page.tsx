"use client";

import { Navbar } from "@/components/navigation/navbar";
import { HeroSection } from "@/components/hero/hero-section";
import { InspirationSection } from "@/components/inspiration/inspiration-section";
import { ChatSection } from "@/components/design-chat/chat-section";
import { ElementsSection } from "@/components/elements/elements-section";
import { Footer } from "@/components/footer/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <InspirationSection />
        <ChatSection />
        <ElementsSection />
      </main>
      <Footer />
    </>
  );
}
