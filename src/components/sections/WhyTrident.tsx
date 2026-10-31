import React from "react";
import { Check, X, ShieldAlert, Award } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

export function WhyTrident() {
  const comparisons = [
    {
      dimension: "Operational Focus",
      traditional: "Passive lead passing and listings",
      trident: "End-to-end sales strategy and mandate execution",
    },
    {
      dimension: "Infrastructure Pitch",
      traditional: "Generic area statements, no ROI data",
      trident: "Travel-time and metro catalyst narratives",
    },
    {
      dimension: "Sales Team Training",
      traditional: "None; executives rely on brochures",
      trident: "Masterclasses on objection clearing",
    },
    {
      dimension: "Pricing Resistance",
      traditional: "Pushes developer to discount rates",
      trident: "Builds product value to protect margins",
    },
    {
      dimension: "Channel Partner Activation",
      traditional: "Random WhatsApp broadcasts",
      trident: "Structured CP briefings and incentive alignment",
    },
  ];

  return (
    <section id="why" className="relative py-16 md:py-24 bg-[#111d30]">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Strategic Difference"
            title="Traditional Brokerage vs"
            highlight="Trident Prop Strategy"
            description="Most KDMC brokers collect listings and wait. Trident acts as your on-ground sales command center, transforming buyer psychology and broker momentum."
          />
        </Reveal>

        {/* Desktop Table View (Hidden on mobile) */}
        <Reveal className="hidden md:block">
          <div className="glass overflow-hidden rounded-[20px] border border-white/10 shadow-xl">
            <div className="grid grid-cols-12 text-sm font-semibold border-b border-white/15">
              <div className="col-span-4 p-5 text-white/60 uppercase tracking-wider text-xs">
                Strategic Dimension
              </div>
              <div className="col-span-4 p-5 text-white/50 bg-black/20 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-white/40" />
                <span>Traditional Brokerage</span>
              </div>
              <div className="col-span-4 p-5 text-[#e4bd21] bg-[#e4bd21]/[0.09] border-l border-[#e4bd21]/30 flex items-center gap-2">
                <Award className="w-4 h-4 text-[#e4bd21]" />
                <span>Trident Prop Strategy</span>
              </div>
            </div>

            <div className="divide-y divide-white/10">
              {comparisons.map((row, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-12 text-sm transition-colors hover:bg-white/[0.02]"
                >
                  {/* Dimension */}
                  <div className="col-span-4 p-5 font-medium text-white/90 flex items-center">
                    {row.dimension}
                  </div>

                  {/* Traditional */}
                  <div className="col-span-4 p-5 text-white/60 bg-black/10 flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center text-white/40 shrink-0">
                      <X className="w-3.5 h-3.5" />
                    </div>
                    <span>{row.traditional}</span>
                  </div>

                  {/* Trident (Tinted gold at 9%) */}
                  <div className="col-span-4 p-5 text-white font-medium bg-[#e4bd21]/[0.09] border-l border-[#e4bd21]/30 flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#e4bd21]/20 flex items-center justify-center text-[#e4bd21] shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>{row.trident}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Mobile Stacked Cards (Visible below md only) */}
        <div className="md:hidden">
          <RevealGroup className="space-y-4">
            {comparisons.map((row, idx) => (
              <RevealItem key={idx}>
                <GlassCard className="p-5 border-white/10">
                  <h3 className="text-xs uppercase font-semibold tracking-wider text-[#e4bd21] mb-3">
                    {row.dimension}
                  </h3>

                  <div className="space-y-3">
                    {/* Traditional Row */}
                    <div className="p-3 rounded-xl bg-black/20 border border-white/5 flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center text-white/40 shrink-0 mt-0.5">
                        <X className="w-3 h-3" />
                      </div>
                      <div>
                        <span className="block text-[11px] text-white/40 uppercase tracking-wide">
                          Traditional Broker
                        </span>
                        <span className="text-xs text-white/65">
                          {row.traditional}
                        </span>
                      </div>
                    </div>

                    {/* Trident Row */}
                    <div className="p-3 rounded-xl bg-[#e4bd21]/[0.09] border border-[#e4bd21]/30 flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-[#e4bd21]/20 flex items-center justify-center text-[#e4bd21] shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <div>
                        <span className="block text-[11px] text-[#e4bd21] font-semibold uppercase tracking-wide">
                          Trident Prop Strategy
                        </span>
                        <span className="text-xs text-white font-medium">
                          {row.trident}
                        </span>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
