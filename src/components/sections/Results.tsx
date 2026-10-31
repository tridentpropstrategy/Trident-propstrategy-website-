import React from "react";
import { TrendingUp, MapPin, Building2 } from "lucide-react";
import { caseStudies } from "@/data/caseStudies";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

export function Results() {
  // If array is empty, hide the section automatically per instructions
  if (!caseStudies || caseStudies.length === 0) {
    return null;
  }

  return (
    <section id="results" className="relative py-16 md:py-24 bg-[#111d30]">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Mandate Execution Track Record"
            title="Demonstrated Velocity in"
            highlight="KDMC Suburbs"
            description="Proven sales acceleration frameworks applied to complex micro-market inventories across Kalyan, Dombivli, and the central growth belt."
          />
        </Reveal>

        <RevealGroup className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {caseStudies.map((item) => (
            <RevealItem key={item.id} className="h-full">
              <GlassCard className="p-7 flex flex-col h-full border-white/10 hover:border-[#e4bd21]/50">
                {/* Main Content */}
                <div>
                  {/* Location & Project Meta */}
                  <div className="flex items-center justify-between text-xs text-white/50 mb-4 pb-3 border-b border-white/10">
                    <span className="flex items-center gap-1.5 text-white/80">
                      <MapPin className="w-3.5 h-3.5 text-[#e4bd21]" />
                      {item.location}
                    </span>

                    <span className="flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5" />
                      {item.projectType}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="h3-fluid text-white font-medium mb-3">
                    {item.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-white/70 text-sm leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                {/* Bottom Content - Always Aligned */}
                <div className="mt-auto pt-6">
                  {/* Highlighted Result Box */}
                  <div className="min-h-[124px] p-4 rounded-xl bg-[#e4bd21]/[0.08] border border-[#e4bd21]/25 flex flex-col justify-center">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#e4bd21] font-semibold mb-1">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>{item.resultLabel}</span>
                    </div>

                    <div className="font-serif text-2xl font-bold text-white">
                      {item.resultValue}
                    </div>
                  </div>

                  {/* Promoter */}
                  <div className="mt-6 pt-4 border-t border-white/10 text-sm text-white/60">
                    <span>Promoter </span>
                    <span className="text-white font-medium">
                      {item.promoter}
                    </span>
                  </div>
                </div>
              </GlassCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}