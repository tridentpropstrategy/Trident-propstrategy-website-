"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ArrowRight, Building2, TrendingUp, Route, Sparkles } from "lucide-react";
import { markets } from "@/data/markets";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { useLeadForm } from "@/context/LeadFormContext";

export function Markets() {
  const [selectedId, setSelectedId] = useState<string>(markets[0]?.id || "");
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { selectMarketAndScroll } = useLeadForm();

  const selectedMarket = markets.find((m) => m.id === selectedId) || markets[0];
  const selectedIndex = markets.findIndex((m) => m.id === selectedId);

  const isFirstRender = useRef(true);

  // Scroll active tab horizontally in mobile container on user selection (never on initial page load)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (
      selectedIndex !== -1 &&
      tabsRef.current[selectedIndex] &&
      scrollContainerRef.current
    ) {
      const activeTabEl = tabsRef.current[selectedIndex];
      const container = scrollContainerRef.current;
      const tabLeft = activeTabEl.offsetLeft;
      const tabWidth = activeTabEl.offsetWidth;
      const containerWidth = container.offsetWidth;
      container.scrollTo({
        left: tabLeft - containerWidth / 2 + tabWidth / 2,
        behavior: "smooth",
      });
    }
  }, [selectedIndex]);

  // Keyboard navigation for tablist (ArrowLeft, ArrowRight, Home, End)
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex: number | null = null;
    if (e.key === "ArrowRight") {
      nextIndex = (index + 1) % markets.length;
    } else if (e.key === "ArrowLeft") {
      nextIndex = (index - 1 + markets.length) % markets.length;
    } else if (e.key === "Home") {
      nextIndex = 0;
    } else if (e.key === "End") {
      nextIndex = markets.length - 1;
    }

    if (nextIndex !== null) {
      e.preventDefault();
      setSelectedId(markets[nextIndex].id);
      tabsRef.current[nextIndex]?.focus();
    }
  };

  const handleConsultClick = (e: React.MouseEvent, marketLabel: string) => {
    e.preventDefault();
    selectMarketAndScroll(marketLabel);
  };

  if (!markets || markets.length === 0) {
    return null;
  }

  return (
    <section id="markets" className="relative py-16 md:py-24 bg-[#162740]">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Hyper-Local Feasibility"
            title="KDMC Real Estate"
            highlight="Data Matrix"
            description="Explore verified carpet rates, infrastructure catalysts, and buyer profiles across Kalyan-Dombivli municipal micro-markets."
          />
        </Reveal>

        {/* Tablist with edge fade mask on mobile */}
        <div className="relative mb-8">
          <div
            ref={scrollContainerRef}
            role="tablist"
            aria-label="KDMC Micro-Markets"
            className="no-scrollbar flex items-center md:flex-wrap md:justify-center gap-2 overflow-x-auto py-2 px-1 scroll-smooth snap-x snap-mandatory"
          >
            {markets.map((market, idx) => {
              const isSelected = market.id === selectedId;
              return (
                <button
                  key={market.id}
                  ref={(el) => {
                    tabsRef.current[idx] = el;
                  }}
                  role="tab"
                  id={`market-tab-${market.id}`}
                  aria-selected={isSelected}
                  aria-controls={`market-panel-${market.id}`}
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => setSelectedId(market.id)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  className={`relative shrink-0 snap-center min-h-[44px] px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer select-none border focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d5b13a] ${
                    isSelected
                      ? "text-[#162740] border-[#d5b13a] shadow-[0_4px_20px_rgba(213,177,58,0.3)] font-bold"
                      : "text-white/80 border-[#d5b13a]/20 glass hover:border-[#d5b13a]/50 hover:text-white"
                  }`}
                >
                  {/* Sliding gold pill background using layoutId */}
                  {isSelected && (
                    <motion.div
                      layoutId="activeMarketPill"
                      className="absolute inset-0 bg-gradient-to-r from-[#e4c760] via-[#d5b13a] to-[#bd9424] rounded-full z-0"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {market.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detail Panel with Stable Min-Height and AnimatePresence */}
        <div className="min-h-[420px] relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedMarket.id}
              role="tabpanel"
              id={`market-panel-${selectedMarket.id}`}
              aria-labelledby={`market-tab-${selectedMarket.id}`}
              initial={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 12 }
              }
              animate={{ opacity: 1, y: 0 }}
              exit={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: -12 }
              }
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="glass-strong p-6 sm:p-8 md:p-10 rounded-[20px] border border-[#d5b13a]/30 shadow-2xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                {/* Left Column: Sector, Label, Rates, Demand, Buyer Profile */}
                <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d5b13a]/15 border border-[#d5b13a]/30 mb-3">
                      <Building2 className="w-3.5 h-3.5 text-[#d5b13a]" />
                      <span className="eyebrow !text-[11px]">{selectedMarket.sector}</span>
                    </div>

                    <h3 className="h2-fluid text-white font-medium mb-2">
                      {selectedMarket.label}
                    </h3>
                    <p className="text-white/70 text-sm italic mb-6">
                      {selectedMarket.headline}
                    </p>

                    {/* Two Mini Glass Tiles */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div className="glass p-4 rounded-xl border-white/10">
                        <span className="block text-[11px] uppercase tracking-wider text-white/50 mb-1">
                          Avg Carpet Rate
                        </span>
                        <span className="font-serif text-lg sm:text-xl font-bold text-gold-gradient">
                          {selectedMarket.carpetRate}
                        </span>
                      </div>

                      <div className="glass p-4 rounded-xl border-white/10">
                        <span className="block text-[11px] uppercase tracking-wider text-white/50 mb-1">
                          Absorption Demand
                        </span>
                        <span className="font-semibold text-sm sm:text-base text-white/90 flex items-center gap-1.5">
                          <TrendingUp className="w-4 h-4 text-[#d5b13a]" />
                          {selectedMarket.demand}
                        </span>
                      </div>
                    </div>

                    {/* Target Buyer Profile */}
                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                      <h4 className="text-xs uppercase font-semibold tracking-wider text-[#d5b13a] mb-1.5 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        Target Buyer Profile
                      </h4>
                      <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                        {selectedMarket.buyerProfile}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Column (Darker Glass Box): Catalysts, Pitch Angle, CTA */}
                <div className="lg:col-span-6 flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-black/25 border border-white/10 space-y-6">
                  <div className="space-y-6">
                    {/* Key Infrastructure Catalysts */}
                    <div>
                      <h4 className="text-xs uppercase font-semibold tracking-wider text-[#d5b13a] mb-2 flex items-center gap-1.5">
                        <Route className="w-3.5 h-3.5" />
                        Key Infrastructure Catalysts
                      </h4>
                      <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
                        {selectedMarket.infrastructure}
                      </p>
                    </div>

                    <div className="h-[1px] bg-white/10" />

                    {/* Recommended Trident Pitch Angle */}
                    <div>
                      <h4 className="text-xs uppercase font-semibold tracking-wider text-[#d5b13a] mb-2 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        Recommended Trident Pitch Angle
                      </h4>
                      <p className="text-white/85 text-xs sm:text-sm leading-relaxed">
                        {selectedMarket.pitchAngle}
                      </p>
                    </div>
                  </div>

                  {/* Preselect and Scroll Link */}
                  <div className="pt-4 border-t border-white/10">
                    <button
                      type="button"
                      onClick={(e) => handleConsultClick(e, selectedMarket.label)}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#d5b13a] hover:text-white transition-colors cursor-pointer group"
                    >
                      <span>Consult a {selectedMarket.label} strategy advisor</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
