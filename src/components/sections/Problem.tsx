import React from "react";
import { TrendingDown, Users, Globe2, AlertTriangle } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

export function Problem() {
  const problems = [
    {
      icon: TrendingDown,
      title: "High Cost of Inventory Holding",
      description:
        "Standalone builders in Kalyan & Ambernath lose lakhs per month in interest and holding costs when project inventory stalls due to unorganized sales channels.",
      metric: "Capital Drain",
    },
    {
      icon: Users,
      title: "Sales Team Knowledge Gaps",
      description:
        "Executives often fail to pitch connectivity such as Metro 5, the Samruddhi Mahamarg and the Airoli-Katai tunnel, so walk-ins do not convert.",
      metric: "Conversion Bottleneck",
    },
    {
      icon: Globe2,
      title: "Limited Broker Reach",
      description:
        "Relying on a few neighbourhood brokers keeps out-of-station buyers from South Mumbai, Western Suburbs, Thane and Navi Mumbai away.",
      metric: "Regional Blindspot",
    },
  ];

  return (
    <section id="problem" className="relative py-16 md:py-24 bg-[#111d30]">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="The Unsold Inventory Dilemma"
            title="Why KDMC Projects Face"
            highlight="Sales Stagnation"
            description="Developing quality real estate is only half the battle. In competitive micro-markets like Kalyan and Dombivli, traditional sales tactics leave developers vulnerable to three critical liabilities."
          />
        </Reveal>

        <RevealGroup className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {problems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <RevealItem key={idx}>
                <GlassCard className="p-8 flex flex-col justify-between h-full border-white/10 hover:border-[#d5b13a]/40">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-[#d5b13a]/10 border border-[#d5b13a]/20 flex items-center justify-center text-[#d5b13a]">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-semibold tracking-wider uppercase text-white/50 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 flex items-center gap-1.5">
                        <AlertTriangle className="w-3 h-3 text-[#d5b13a]" />
                        {item.metric}
                      </span>
                    </div>

                    <h3 className="h3-fluid text-white font-medium mb-3">
                      {item.title}
                    </h3>

                    <p className="text-white/70 text-sm md:text-base leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
                    <span>Liability Factor 0{idx + 1}</span>
                    <span className="text-[#d5b13a]/80">Trident Solution Ready →</span>
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
