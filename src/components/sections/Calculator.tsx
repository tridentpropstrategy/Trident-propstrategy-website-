"use client";

import React, { useState, useId, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { SlidersHorizontal, Info, TrendingUp, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { useLeadForm } from "@/context/LeadFormContext";
import {
  BOOST_FACTOR,
  SLIDER_CONFIGS,
  INFO_NOTE,
  DISCLAIMER,
} from "@/data/calculator";
import { calculateRecovery, mapUnitsToRange } from "@/lib/calculator";

export function Calculator() {
  const shouldReduceMotion = useReducedMotion();
  const { selectUnitsAndScroll } = useLeadForm();

  // Slider input states initialized with defaults
  const [units, setUnits] = useState<number>(SLIDER_CONFIGS.units.defaultValue);
  const [price, setPrice] = useState<number>(SLIDER_CONFIGS.price.defaultValue);
  const [rate, setRate] = useState<number>(SLIDER_CONFIGS.rate.defaultValue);

  // Pulse animation trigger key for the boost badge
  const [pulseKey, setPulseKey] = useState<number>(0);

  // Debounced accessibility screen reader text
  const [liveAnnouncement, setLiveAnnouncement] = useState<string>("");
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Unique IDs for accessible slider associations
  const unitsId = useId();
  const priceId = useId();
  const rateId = useId();

  // Calculate live results via pure function
  const results = calculateRecovery({
    units,
    pricePerUnitLakhs: price,
    salesRatePerMonth: rate,
  });

  // Calculate percentage fill for range sliders
  const unitsPct =
    ((units - SLIDER_CONFIGS.units.min) /
      (SLIDER_CONFIGS.units.max - SLIDER_CONFIGS.units.min)) *
    100;
  const pricePct =
    ((price - SLIDER_CONFIGS.price.min) /
      (SLIDER_CONFIGS.price.max - SLIDER_CONFIGS.price.min)) *
    100;
  const ratePct =
    ((rate - SLIDER_CONFIGS.rate.min) /
      (SLIDER_CONFIGS.rate.max - SLIDER_CONFIGS.rate.min)) *
    100;

  // Handle slider changes and trigger badge micro-pulse
  const handleSliderChange = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    val: number
  ) => {
    setter(val);
    setPulseKey((prev) => prev + 1);
  };

  // Debounce aria-live announcement for screen readers (~400ms)
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      setLiveAnnouncement(
        `Total capital trapped: ${results.capitalDisplay}. Turnaround time saved: ${results.monthsSavedDisplay}. Without Trident: ${results.monthsWithoutDisplay}. With Trident: ${results.monthsWithDisplay}.`
      );
    }, 400);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [
    results.capitalDisplay,
    results.monthsSavedDisplay,
    results.monthsWithoutDisplay,
    results.monthsWithDisplay,
  ]);

  // Handle CTA button click: preselect contact form dropdown and smooth scroll
  const handleCtaClick = () => {
    const range = mapUnitsToRange(units);
    selectUnitsAndScroll(range);
  };

  return (
    <section
      id="calculator"
      className="relative py-16 md:py-24 bg-[#111d30] scroll-mt-20 md:scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        {/* Section Heading */}
        <Reveal>
          <SectionHeading
            eyebrow="Financial diagnostic tool"
            title="Stalled Inventory Capital Recovery Simulator"
            description="Calculate the capital blocked in your unsold units and estimate how fast Trident PropStrategy can recover your cash flow."
          />
        </Reveal>

        {/* Two-Column Responsive Layout */}
        <RevealGroup className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* LEFT CARD: Project Parameters (Inputs) */}
          <RevealItem className="lg:col-span-5 h-full">
            <GlassCard
              variant="standard"
              highlightOnHover={false}
              className="p-6 sm:p-8 flex flex-col justify-between h-full border-[#d5b13a]/20 rounded-[20px]"
            >
              <div>
                {/* Card Header */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-9 h-9 rounded-lg bg-[#d5b13a]/15 border border-[#d5b13a]/30 flex items-center justify-center text-[#d5b13a] shrink-0">
                    <SlidersHorizontal className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs uppercase tracking-[0.16em] font-semibold text-[#d5b13a]">
                    Project parameters
                  </h3>
                </div>

                {/* Sliders Container */}
                <div className="space-y-6">
                  {/* Slider 1: Unsold Units Count */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <label
                        htmlFor={unitsId}
                        className="text-sm font-medium text-white/90"
                      >
                        {SLIDER_CONFIGS.units.label}:
                      </label>
                      <span className="text-sm font-semibold text-[#d5b13a] font-sans">
                        {units} Units
                      </span>
                    </div>
                    <input
                      id={unitsId}
                      type="range"
                      min={SLIDER_CONFIGS.units.min}
                      max={SLIDER_CONFIGS.units.max}
                      step={SLIDER_CONFIGS.units.step}
                      value={units}
                      onChange={(e) =>
                        handleSliderChange(setUnits, Number(e.target.value))
                      }
                      style={
                        { "--pct": `${unitsPct}%` } as React.CSSProperties
                      }
                      className="calc-range-slider"
                      aria-label="Unsold units count"
                      aria-valuemin={SLIDER_CONFIGS.units.min}
                      aria-valuemax={SLIDER_CONFIGS.units.max}
                      aria-valuenow={units}
                      aria-valuetext={`${units} Units`}
                    />
                  </div>

                  {/* Slider 2: Average Unit Price */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <label
                        htmlFor={priceId}
                        className="text-sm font-medium text-white/90"
                      >
                        {SLIDER_CONFIGS.price.label}:
                      </label>
                      <span className="text-sm font-semibold text-[#d5b13a] font-sans">
                        ₹ {price} Lakhs
                      </span>
                    </div>
                    <input
                      id={priceId}
                      type="range"
                      min={SLIDER_CONFIGS.price.min}
                      max={SLIDER_CONFIGS.price.max}
                      step={SLIDER_CONFIGS.price.step}
                      value={price}
                      onChange={(e) =>
                        handleSliderChange(setPrice, Number(e.target.value))
                      }
                      style={
                        { "--pct": `${pricePct}%` } as React.CSSProperties
                      }
                      className="calc-range-slider"
                      aria-label="Average unit price in lakhs"
                      aria-valuemin={SLIDER_CONFIGS.price.min}
                      aria-valuemax={SLIDER_CONFIGS.price.max}
                      aria-valuenow={price}
                      aria-valuetext={`₹ ${price} Lakhs`}
                    />
                  </div>

                  {/* Slider 3: Current Sales Rate */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <label
                        htmlFor={rateId}
                        className="text-sm font-medium text-white/90"
                      >
                        {SLIDER_CONFIGS.rate.label}:
                      </label>
                      <span className="text-sm font-semibold text-[#d5b13a] font-sans">
                        {rate % 1 === 0 ? rate : rate.toFixed(1)} Units / Mo
                      </span>
                    </div>
                    <input
                      id={rateId}
                      type="range"
                      min={SLIDER_CONFIGS.rate.min}
                      max={SLIDER_CONFIGS.rate.max}
                      step={SLIDER_CONFIGS.rate.step}
                      value={rate}
                      onChange={(e) =>
                        handleSliderChange(setRate, Number(e.target.value))
                      }
                      style={
                        { "--pct": `${ratePct}%` } as React.CSSProperties
                      }
                      className="calc-range-slider"
                      aria-label="Current sales velocity per month"
                      aria-valuemin={SLIDER_CONFIGS.rate.min}
                      aria-valuemax={SLIDER_CONFIGS.rate.max}
                      aria-valuenow={rate}
                      aria-valuetext={`${rate} Units per Month`}
                    />
                  </div>
                </div>
              </div>

              {/* Info Note */}
              <div className="p-4 rounded-xl bg-white/[0.04] border border-[#d5b13a]/20 flex items-start gap-3 mt-8">
                <div className="w-5 h-5 rounded-md bg-[#d5b13a]/15 flex items-center justify-center text-[#d5b13a] shrink-0 mt-0.5">
                  <Info className="w-3.5 h-3.5" />
                </div>
                <p className="text-xs leading-relaxed text-white/75 font-sans">
                  {INFO_NOTE}
                </p>
              </div>
            </GlassCard>
          </RevealItem>

          {/* RIGHT CARD: Recovery Simulation (Results) */}
          <RevealItem className="lg:col-span-7 h-full">
            <GlassCard
              variant="strong"
              highlightOnHover={false}
              className="p-6 sm:p-8 flex flex-col justify-between h-full border-[#d5b13a]/30 rounded-[20px]"
            >
              {/* Screen reader live status announcement */}
              <div role="status" aria-live="polite" className="sr-only">
                {liveAnnouncement}
              </div>

              <div>
                {/* Header Row */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-white/10">
                  <span className="text-xs uppercase tracking-[0.16em] font-semibold text-white/80">
                    Recovery simulation
                  </span>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d5b13a]/15 border border-[#d5b13a]/35 text-[#d5b13a] text-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d5b13a] animate-pulse" />
                    <span>Trident acceleration active</span>
                  </div>
                </div>

                {/* Two Stat Tiles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  {/* Stat Tile 1: Total Capital Trapped */}
                  <div className="p-5 rounded-xl bg-white/[0.04] border border-white/10 flex flex-col justify-between">
                    <span className="text-[11px] uppercase tracking-wider text-white/60 font-medium">
                      Total capital trapped
                    </span>
                    <motion.div
                      key={results.capitalDisplay}
                      initial={shouldReduceMotion ? false : { opacity: 0.6, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white my-1 tracking-tight"
                    >
                      {results.capitalDisplay}
                    </motion.div>
                    <span className="text-xs text-white/60">
                      Pending cash flow
                    </span>
                  </div>

                  {/* Stat Tile 2: Turnaround Time Saved */}
                  <div className="p-5 rounded-xl bg-[#d5b13a]/[0.08] border border-[#d5b13a]/25 flex flex-col justify-between">
                    <span className="text-[11px] uppercase tracking-wider text-[#d5b13a]/80 font-medium">
                      Turnaround time saved
                    </span>
                    <motion.div
                      key={results.monthsSavedDisplay}
                      initial={shouldReduceMotion ? false : { opacity: 0.6, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-gold-gradient my-1 tracking-tight"
                    >
                      {results.monthsSavedDisplay}
                    </motion.div>
                    <span className="text-xs text-[#d5b13a]/80 font-medium">
                      Faster full inventory sell-out
                    </span>
                  </div>
                </div>

                {/* Comparison Card: Sales Velocity Boost Factor */}
                <div className="mt-6 p-5 rounded-xl bg-white/[0.03] border border-white/10">
                  {/* Velocity Boost Header */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <span className="text-xs uppercase tracking-wider font-semibold text-white/80">
                      Sales velocity boost factor
                    </span>
                    <motion.div
                      key={pulseKey}
                      animate={
                        shouldReduceMotion
                          ? {}
                          : { scale: [1, 1.07, 1] }
                      }
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#d5b13a]/15 border border-[#d5b13a]/30 text-[#d5b13a] text-xs font-bold tracking-wide"
                    >
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>{BOOST_FACTOR.toFixed(1)}x velocity</span>
                    </motion.div>
                  </div>

                  {/* Velocity Comparison Bars */}
                  <div className="space-y-4">
                    {/* Bar 1: Without Trident */}
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="text-white/70">
                          Without Trident (current trend)
                        </span>
                        <span className="font-semibold text-white/90">
                          {results.monthsWithoutDisplay}
                        </span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden relative">
                        <motion.div
                          initial={shouldReduceMotion ? false : { scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                          style={{ transformOrigin: "left" }}
                          className="w-full h-full bg-white/25 rounded-full"
                        />
                      </div>
                    </div>

                    {/* Bar 2: With Trident mandate and CP network */}
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-medium text-[#d5b13a]">
                          With Trident mandate and CP network
                        </span>
                        <span className="font-bold text-[#d5b13a]">
                          {results.monthsWithDisplay}
                        </span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden relative">
                        <motion.div
                          initial={shouldReduceMotion ? false : { scaleX: 0 }}
                          animate={{
                            scaleX: results.barPercentWith / 100,
                          }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                          style={{ transformOrigin: "left" }}
                          className="w-full h-full rounded-full bg-gradient-to-r from-[#e4c760] via-[#d5b13a] to-[#bd9424] shadow-[0_0_12px_rgba(213,177,58,0.35)]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Row & CTA Button */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-sm font-medium text-white/90 text-center sm:text-left">
                  Ready to unlock trapped cash flow?
                </span>
                <Button
                  variant="primary"
                  size="lg"
                  href="#contact"
                  onClick={handleCtaClick}
                  className="w-full sm:w-auto shadow-[0_4px_24px_rgba(213,177,58,0.35)]"
                >
                  <span>Request Confidential Audit</span>
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </GlassCard>
          </RevealItem>
        </RevealGroup>

        {/* Disclaimer Note */}
        <div className="mt-8 text-center">
          <p className="text-xs text-white/55 max-w-2xl mx-auto leading-relaxed">
            {DISCLAIMER}
          </p>
        </div>
      </div>
    </section>
  );
}
