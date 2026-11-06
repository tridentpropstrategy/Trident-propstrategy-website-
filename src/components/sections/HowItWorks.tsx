"use client";

import React from "react";
import { Search, Compass, Users2, LineChart } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: Search,
      title: "Market Analysis",
      description:
        "In-depth evaluation of micro-market demand, competitor pricing, buyer demographics, and project positioning across key growth corridors.",
    },
    {
      number: "02",
      icon: Compass,
      title: "Strategy",
      description:
        "Custom positioning roadmap, buyer absorption persona, and objection-handling scripts.",
    },
    {
      number: "03",
      icon: Users2,
      title: "Team & CP Activation",
      description:
        "Sales executive masterclasses combined with high-conviction channel partner briefings across MMR.",
    },
    {
      number: "04",
      icon: LineChart,
      title: "Sales Tracking",
      description:
        "Weekly conversion tracking, walk-in pipeline audits, and milestone inventory liquidation.",
    },

  ];

  return (
    <section id="how" className="relative py-16 md:py-24 bg-[#162740] overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Proven 4-Step Process"
            title="From Stalled Inventory to"
            highlight="Active Absorption"
            description="Our structured mandate lifecycle takes your project from stagnation to predictable monthly sales in 4 disciplined phases."
          />
        </Reveal>

        {/* Steps Grid */}
        <RevealGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <RevealItem key={idx} className="h-full">
                <GlassCard className="h-full border-white/10 hover:border-[#d5b13a]/50">
                  {/* This wrapper owns the padding and the full-height flex column */}
                  <div className="flex flex-col h-full p-6 md:p-7">
                    {/* Content grows to fill, pushing the footer to the bottom */}
                    <div className="flex-1">
                      {/* Step Header */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-12 h-12 rounded-xl bg-[#d5b13a]/15 border border-[#d5b13a]/30 flex items-center justify-center text-[#d5b13a] shadow-[0_0_20px_rgba(213,177,58,0.18)]">
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="font-serif text-3xl font-bold text-white/20">
                          {step.number}
                        </span>
                      </div>

                      <h3 className="h3-fluid text-white font-medium mb-2.5">
                        {step.title}
                      </h3>

                      <p className="text-white/70 text-xs md:text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {/* Footer: always pinned to the bottom */}
                    <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-[11px] text-[#d5b13a]/80 font-medium uppercase tracking-wider">
                      <span>Phase {step.number}</span>
                      <span>Verified Milestone</span>
                    </div>
                  </div>
                </GlassCard>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}