"use client";

import React from "react";
import { Handshake, ArrowRight, ShieldCheck } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";
import { useLeadForm } from "@/context/LeadFormContext";

export function ChannelPartner() {
  const { selectScopeAndScroll } = useLeadForm();

  const handleJoinClick = (e: React.MouseEvent) => {
    e.preventDefault();
    selectScopeAndScroll("Channel Partner Registration", "channel-partner");
  };

  return (
    <section className="relative py-12 md:py-16 bg-[#162740]">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <Reveal>
          <GlassCard
            variant="strong"
            className="p-8 md:p-12 border-[#d5b13a]/30 shadow-[0_12px_40px_rgba(0,0,0,0.3)] relative overflow-hidden"
          >
            {/* Background subtle gold glow accent */}
            <div
              className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-[#d5b13a]/10 blur-3xl pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="max-w-2xl text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d5b13a]/15 border border-[#d5b13a]/30 mb-3.5">
                  <Handshake className="w-3.5 h-3.5 text-[#d5b13a]" />
                  <span className="eyebrow !text-[11px]">Broker & CP Alliance</span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white font-medium mb-3">
                  Channel partner?{" "}
                  <span className="text-gold-gradient italic">Join our network.</span>
                </h2>

                <p className="text-white/75 text-sm md:text-base leading-relaxed">
                  Gain exclusive access to high-conviction KDMC developer mandates,
                  timely commission disbursements, and structured sales enablement
                  support across Thane, Navi Mumbai, and Central Suburbs.
                </p>

                <div className="flex items-center justify-center lg:justify-start gap-4 mt-4 text-xs text-white/60">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#d5b13a]" />
                    Guaranteed Commission Protection
                  </span>
                  <span>•</span>
                  <span>350+ Active MMR Brokers</span>
                </div>
              </div>

              <div className="shrink-0 w-full lg:w-auto flex justify-center">
                <button
                  type="button"
                  onClick={handleJoinClick}
                  className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 rounded-xl border border-[#d5b13a] text-[#d5b13a] bg-[#d5b13a]/10 hover:bg-gradient-to-r hover:from-[#e4c760] hover:via-[#d5b13a] hover:to-[#bd9424] hover:text-[#162740] font-semibold text-sm tracking-wide transition-all duration-300 shadow-[0_4px_20px_rgba(213,177,58,0.15)] hover:shadow-[0_0_0_1px_#d5b13a,0_10px_40px_rgba(213,177,58,0.35)] flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <span>Join as Channel Partner</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}
