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
      title: "Audit",
      description:
        "Comprehensive on-ground evaluation of your unsold inventory, floor plans, and pricing matrix.",
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
                <RevealItem key={idx}>
                  <GlassCard className="p-6 md:p-7 flex flex-col justify-between h-full border-white/10 hover:border-[#e4bd21]/50">
                    <div>
                      {/* Step Header */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-12 h-12 rounded-xl bg-[#e4bd21]/15 border border-[#e4bd21]/30 flex items-center justify-center text-[#e4bd21] shadow-[0_0_20px_rgba(228,189,33,0.15)]">
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

                    <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-[11px] text-[#e4bd21]/80 font-medium uppercase tracking-wider">
                      <span>Phase {step.number}</span>
                      <span>Verified Milestone</span>
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
