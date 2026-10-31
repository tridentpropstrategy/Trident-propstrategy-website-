"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { ShieldCheck, Database, Award, ArrowUpRight } from "lucide-react";
import { stats, hasVerifiedStats } from "@/data/stats";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { HeroForm } from "@/components/ui/HeroForm";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const showStats = hasVerifiedStats(stats);

  const headlineParts = [
    { text: "Transform Stalled KDMC Inventory into ", isGold: false },
    { text: "High-Velocity Sales", isGold: true },
  ];

  return (
    <section
      id="top"
      className="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden"
    >
      {/* Hero Grid Pattern Mask */}
      <div
        className="absolute inset-0 hero-grid-pattern pointer-events-none z-0"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & Trust & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start">
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
              className="h1-fluid text-white font-medium mb-6"
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

            {/* Subtext */}
            <motion.p
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-white/80 text-base md:text-lg leading-relaxed mb-8 max-w-xl"
            >
              We partner with small developers and mandate owners in Kalyan,
              Dombivli and the central suburbs. Hyper-local market intelligence,
              sales team training and our channel partner network, working
              together to move your inventory.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10"
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
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full border-t border-white/10 pt-6"
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
                className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full mt-6"
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
          </div>

          {/* Right Column: Glass-Strong Hero Form Card */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 w-full"
          >
            <HeroForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
