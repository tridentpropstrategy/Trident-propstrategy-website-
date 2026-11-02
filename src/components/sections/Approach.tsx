
import React from "react";
import { Compass, Sparkles, UserCheck, CheckCircle2, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function Approach() {
  const pillars = [
    {
      roman: "I",
      icon: Compass,
      title: "GIS & Micro-Market Intelligence",
      description:
        "Data-backed positioning based on actual carpet rates, absorption speeds, and upcoming infrastructure timelines.",
      checks: [
        "Competitor rate mapping",
        "Infrastructure travel-time story",
        "Buyer absorption profiling",
      ],
      isHighlighted: false,
    },
    {
      roman: "II",
      icon: Sparkles,
      title: "Product & Location Repositioning",
      description:
        "Transforming perceived liabilities into high-conviction selling points through optimized buyer touchpoints.",
      checks: [
        "Layout space optimisation",
        "Model flat experience design",
        "Payment plan structuring",
      ],
      isHighlighted: false,
    },
    {
      roman: "III",
      icon: UserCheck,
      title: "Sales Training & CP Activation",
      description:
        "Intensive training for in-house teams and channel partners (CPs). Scripting objection handling, token closing urgency, and mandate workflow execution.",
      checks: [
        "Price objection handling",
        "CP Activation Masterclasses",
        "Urgency Closing Scripting",
      ],
      isHighlighted: false,
    },
  ];

  return (
    <section id="services" className="relative py-16 md:py-24 bg-[#162740]">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="The Strategic Mandate"
            title="The Trident"
            highlight="3-Pillar Framework"
            description="We do not just list properties. We re-engineer the entire commercial ecosystem around your KDMC development to drive predictable, fast absorption."
          />
        </Reveal>

        <RevealGroup className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;

            return (
              <RevealItem key={idx} className="h-full">
                <GlassCard
                  variant={pillar.isHighlighted ? "strong" : "standard"}
                  className={`p-8 flex flex-col h-full relative ${pillar.isHighlighted
                      ? "!border-[#d5b13a]/60 shadow-[0_12px_40px_rgba(213,177,58,0.22)] ring-1 ring-[#d5b13a]/40"
                      : "border-white/10"
                    }`}
                >
                  {pillar.isHighlighted && (
                    <div className="absolute -top-3.5 right-6 px-3 py-1 rounded-full bg-gradient-to-r from-[#e4c760] via-[#d5b13a] to-[#bd9424] text-[#162740] text-[11px] font-bold tracking-wider uppercase shadow-md flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                    </div>
                  )}

                  {/* Card Content */}
                  <div className="flex flex-1 flex-col">
                    {/* Header: Roman Numeral + Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-[#d5b13a]/10 border border-[#d5b13a]/30 flex items-center justify-center text-[#d5b13a]">
                        <Icon className="w-6 h-6" />
                      </div>

                      <span className="font-serif text-2xl font-bold text-[#d5b13a]/60">
                        {pillar.roman}
                      </span>
                    </div>

                    <h3 className="h3-fluid text-white font-medium mb-3">
                      {pillar.title}
                    </h3>

                    <p className="text-white/75 text-sm md:text-base leading-relaxed mb-6">
                      {pillar.description}
                    </p>

                    {/* Checklist */}
                    <div className="space-y-3 pt-4 border-t border-white/10">
                      {pillar.checks.map((chk, cIdx) => (
                        <div key={cIdx} className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-md bg-[#d5b13a]/15 flex items-center justify-center text-[#d5b13a] shrink-0">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </div>

                          <span className="text-xs md:text-sm text-white/90 font-medium">
                            {chk}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Button: Always Anchored at Bottom */}
                  <div className="pt-8 mt-auto">
                    <Button
                      variant={pillar.isHighlighted ? "primary" : "secondary"}
                      size="sm"
                      href="#contact"
                      className="w-full text-center"
                    >
                      <span>Explore Mandate</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
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
