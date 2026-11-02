"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { ShieldCheck, Database, Award, ArrowUpRight } from "lucide-react";
import { stats, hasVerifiedStats } from "@/data/stats";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { TridentWatermark } from "@/components/ui/TridentWatermark";
// import { HeroForm } from "@/components/ui/HeroForm";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const showStats = hasVerifiedStats(stats);

  const headlineParts = [
    { text: "Transform your Stalled Inventory into ", isGold: false },
    { text: "High-Velocity Sales", isGold: true },
  ];

  return (
    <section
      id="top"
      className="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden"
    >
      {/* Background Decorative Layer & Trident Watermark */}
      <div
        className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden"
        aria-hidden="true"
      >
        {/* Ambient Warm Gold Central Spotlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[900px] h-[500px] md:h-[700px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#e4bd21]/15 via-[#162740]/40 to-transparent blur-3xl opacity-80" />

        {/* Concentric Architectural Rings */}
        <div className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] md:w-[640px] md:h-[640px] rounded-full border border-[#e4bd21]/15" />
        <div className="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] md:w-[440px] md:h-[440px] rounded-full border border-[#e4bd21]/20 border-dashed" />

        {/* Vertical Center Axis / Apex Guide */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-[520px] bg-gradient-to-b from-[#e4bd21]/0 via-[#e4bd21]/20 to-transparent" />

        {/* Trident Emblem Watermark */}
        {/* <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[420px] md:w-[500px] lg:w-[560px] opacity-30 md:opacity-35 drop-shadow-[0_0_35px_rgba(228,189,33,0.25)] transition-opacity duration-700">
          <TridentWatermark className="w-full h-auto" />
        </div> */}

        {/* Hero Grid Pattern Mask */}
        <div className="absolute inset-0 hero-grid-pattern opacity-80" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-5 md:px-8">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          {/* Eyebrow Pill */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e4bd21]/10 border border-[#e4bd21]/30 mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#e4bd21] animate-pulse" />
            <span className="eyebrow">Sales strategy for KDMC developers</span>
          </motion.div>

          {/* H1 Headline */}
          <motion.h1
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="h1-fluid text-white font-medium mb-4 max-w-3xl"
          >
            {headlineParts.map((part, idx) => (
              <span
                key={idx}
                className={part.isGold ? "text-[#e4bd21] italic" : "text-white"}
              >
                {part.text}
              </span>
            ))}
          </motion.h1>

          {/* Golden Subtitle */}
          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="text-[#e4bd21] font-serif text-lg sm:text-xl md:text-2xl font-medium tracking-wide mb-6 max-w-2xl leading-snug"
          >
            The Growth Engine for Suburban Real Estate Mandates & Sales Execution
          </motion.p>

          {/* Paragraph Description */}
          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="text-white/80 text-base md:text-lg leading-relaxed mb-8 max-w-2xl"
          >
            Trident PropStrategy drives end-to-end sales acceleration for developers and asset owners across the Greater Kalyan-Dombivli region and Central Metropolitan corridors. From pre-launch strategic positioning and pricing optimization to dedicated CP network deployment and closing management, we scale sales velocity and deliver predictable revenue outcomes.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-10"
          >
            <Button variant="primary" size="lg" href="#contact">
              <span>Book Strategy Audit</span>
              <ArrowUpRight className="w-4 h-4" />
            </Button>

            <Button variant="secondary" size="lg" href="#markets">
              <span>Explore KDMC Markets</span>
            </Button>
          </motion.div>

          {/* Trust Row */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 max-w-xl w-full border-t border-white/10 pt-6 justify-items-center"
          >
            <div className="flex items-center gap-2.5 text-xs text-white/80">
              <div className="w-7 h-7 rounded-lg bg-[#e4bd21]/15 border border-[#e4bd21]/30 flex items-center justify-center text-[#e4bd21] shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="font-medium">Strict NDA</span>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-white/80">
              <div className="w-7 h-7 rounded-lg bg-[#e4bd21]/15 border border-[#e4bd21]/30 flex items-center justify-center text-[#e4bd21] shrink-0">
                <Database className="w-4 h-4" />
              </div>
              <span className="font-medium">Hyper-local Data</span>
            </div>

            <div className="flex items-center gap-2.5 text-xs text-white/80">
              <div className="w-7 h-7 rounded-lg bg-[#e4bd21]/15 border border-[#e4bd21]/30 flex items-center justify-center text-[#e4bd21] shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <span className="font-medium">Zero Generic Advice</span>
            </div>
          </motion.div>

          {/* Stat Tiles (Conditional: hides automatically if all values start with "[") */}
          {showStats && (
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl w-full mt-6"
            >
              {stats.map((st, idx) => (
                <GlassCard key={idx} variant="subtle" className="p-4 text-center">
                  <div className="font-serif text-2xl font-bold text-[#e4bd21] mb-1">
                    {st.value}
                  </div>
                  <div className="text-xs text-white/75 font-medium leading-tight">
                    {st.label}
                  </div>
                </GlassCard>
              ))}
            </motion.div>
          )}

          {/* Hero Form - Commented out as requested */}
          {/*
          <div className="w-full max-w-lg mt-10">
            <HeroForm />
          </div>
          */}
        </div>
      </div>
    </section>
  );
}
