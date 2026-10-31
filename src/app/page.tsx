import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { OrbBackground } from "@/components/ui/OrbBackground";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Approach } from "@/components/sections/Approach";
import { Markets } from "@/components/sections/Markets";
import { WhyTrident } from "@/components/sections/WhyTrident";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Results } from "@/components/sections/Results";
import { ChannelPartner } from "@/components/sections/ChannelPartner";
import { Contact } from "@/components/sections/Contact";
import { LeadFormProvider } from "@/context/LeadFormContext";

export default function HomePage() {
  return (
    <LeadFormProvider>
      <div className="relative min-h-screen flex flex-col bg-[#162740] text-white selection:bg-[#e4bd21] selection:text-[#162740]">
        {/* Ambient GPU-Accelerated Floating Background Orbs */}
        <OrbBackground />

        {/* 0. Top Announcement Bar */}
        <AnnouncementBar />

        {/* 1. Sticky Navigation Header */}
        <Header />

        {/* Main Content Sections */}
        <main id="main-content" className="flex-1 pb-20 md:pb-0 z-10">
          {/* 2. Hero Section */}
          <Hero />

          {/* 3. Problem Section */}
          <Problem />

          {/* 4. Approach / Services Section */}
          <Approach />

          {/* 5. KDMC Markets Interactive Matrix */}
          <Markets />

          {/* 6. Why Trident Comparison */}
          <WhyTrident />

          {/* 7. How It Works - 4 Steps */}
          <HowItWorks />

          {/* 8. Results / Track Record (Conditionally rendered if case studies exist) */}
          <Results />

          {/* 9. Channel Partner Network Strip */}
          <ChannelPartner />

          {/* 10. Contact Section with Developer Audit Form */}
          <Contact />
        </main>

        {/* 11. Footer */}
        <Footer />

        {/* Mobile Sticky Bottom Action Bar (visible below md only) */}
        <MobileActionBar />

        {/* Tablet & Desktop Floating WhatsApp Button (visible md and up) */}
        <WhatsAppFloat />
      </div>
    </LeadFormProvider>
  );
}
