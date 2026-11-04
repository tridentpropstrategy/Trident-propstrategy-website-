"use client";

import React, { useState } from "react";
import { CheckCircle2, AlertCircle, Loader2, Lock, ShieldCheck } from "lucide-react";
import { markets } from "@/data/markets";
import { validateLeadForm, ValidationErrors } from "@/lib/validation";
import { useLeadForm } from "@/context/LeadFormContext";
import { CustomSelect } from "@/components/ui/CustomSelect";

const microMarketOptions = [
  ...markets.map((m) => ({
    value: m.label,
    label: m.label,
    sublabel: m.sector,
  })),
  {
    value: "Other / Not sure",
    label: "Other / Not sure",
  },
];

const unsoldUnitsOptions = [
  { value: "50 - 75", label: "50 - 75 units" },
  { value: "75 - 100", label: "75 - 100 units" },
  { value: "100 - 150", label: "100 - 150 units" },
  { value: "150 - 200", label: "150 - 200 units" },
  { value: "New Project Launch", label: "Project Pre-Launch" },
];

const scopeOptions = [
  {
    value: "Full Sales Acceleration Mandate",
    label: "Full Sales Acceleration Mandate",
  },
  {
    value: "Sales Team & CP Training Only",
    label: "Sales Team & CP Training Only",
  },
  {
    value: "Product & Pricing Strategy Audit",
    label: "Product & Pricing Strategy Audit",
  },
  {
    value: "Channel Partner Registration",
    label: "Channel Partner Registration",
  },
  {
    value: "Not sure yet",
    label: "Not sure yet",
  },
];

export function ContactForm() {
  const {
    preselectedMarket,
    preselectedScope,
    preselectedUnits,
    preselectedSource,
  } = useLeadForm();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    project: "",
    unsoldUnits: "5 - 15",
    overview: "",
    company: "", // honeypot
  });

  const [overrideMarket, setOverrideMarket] = useState<string | null>(null);
  const [overrideScope, setOverrideScope] = useState<string | null>(null);
  const [overrideUnits, setOverrideUnits] = useState<string | null>(null);

  const effectiveMarket = overrideMarket ?? preselectedMarket ?? "";
  const effectiveScope =
    overrideScope ?? (preselectedScope || "Full Sales Acceleration Mandate");
  const effectiveUnits =
    overrideUnits ?? (preselectedUnits || formData.unsoldUnits || "5 - 15");

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "microMarket") {
      setOverrideMarket(value);
    } else if (name === "scope") {
      setOverrideScope(value);
    } else if (name === "unsoldUnits") {
      setOverrideUnits(value);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (errors[name as keyof ValidationErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const currentPayload = {
    ...formData,
    microMarket: effectiveMarket,
    scope: effectiveScope,
    unsoldUnits: effectiveUnits,
  };

  const handleBlur = (field: "name" | "phone" | "project") => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const validationErrors = validateLeadForm(currentPayload, false);
    setErrors((prev) => ({ ...prev, [field]: validationErrors[field] }));
  };

  const shouldShowError = (field: "name" | "phone" | "project") => {
    return Boolean((isSubmitted || touched[field]) && errors[field]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    const validationErrors = validateLeadForm(currentPayload, false);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    const effectiveSource =
      preselectedSource ||
      (effectiveScope === "Channel Partner Registration"
        ? "channel-partner"
        : "contact");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: effectiveSource,
          name: currentPayload.name,
          phone: currentPayload.phone,
          project: currentPayload.project,
          microMarket: currentPayload.microMarket || "",
          unsoldUnits: currentPayload.unsoldUnits || "",
          scope: currentPayload.scope || "",
          overview: currentPayload.overview || "",
          company: currentPayload.company,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(
          data.error || "Something went wrong. Please call or WhatsApp us."
        );
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network issue. Please call or WhatsApp us.");
    }
  };

  if (status === "success") {
    return (
      <div className="glass-strong p-8 sm:p-12 rounded-[20px] text-center flex flex-col items-center justify-center min-h-[460px] border border-[#d5b13a]/40 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-[#d5b13a]/20 border border-[#d5b13a]/40 flex items-center justify-center text-[#d5b13a] mb-6 shadow-[0_0_32px_rgba(213,177,58,0.35)]">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl text-[#d5b13a] font-semibold mb-3">
          Audit Request Confirmed
        </h3>
        <p className="text-white/80 text-sm sm:text-base max-w-md leading-relaxed mb-8">
          Thank you. Our KDMC advisory team will review your project parameters and contact you within 24 hours under strict NDA.
        </p>
        <div className="flex items-center gap-2 text-xs text-white/60 mb-6">
          <ShieldCheck className="w-4 h-4 text-[#d5b13a]" />
          <span>Non-Disclosure Agreement in Effect</span>
        </div>
        <button
          type="button"
          onClick={() => {
            setFormData({
              name: "",
              phone: "",
              project: "",
              unsoldUnits: "5 - 15",
              overview: "",
              company: "",
            });
            setOverrideMarket(null);
            setOverrideScope(null);
            setErrors({});
            setTouched({});
            setIsSubmitted(false);
            setStatus("idle");
          }}
          className="text-xs text-[#d5b13a] hover:underline underline-offset-4 font-semibold uppercase tracking-wider"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <div className="glass-strong p-6 sm:p-10 rounded-[20px] border border-[#d5b13a]/30 shadow-2xl relative">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d5b13a]/15 border border-[#d5b13a]/30 mb-3">
          <Lock className="w-3.5 h-3.5 text-[#d5b13a]" />
          <span className="eyebrow !text-[11px]">Developer Confidential Mandate</span>
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-white">
          Book a Developer Strategy Audit
        </h3>
        <p className="text-sm text-white/70 mt-1.5 leading-relaxed">
          Provide brief project context. Our advisory partners conduct an initial absorption & pricing review prior to direct consultation.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* Honeypot field */}
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
          className="sr-only"
          aria-hidden="true"
        />

        {/* Row 1: Name & Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="contact-name" className="block text-xs font-medium text-white/90 mb-1.5">
              Developer / Contact Name <span className="text-[#d5b13a]">*</span>
            </label>
            <input
              id="contact-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={() => handleBlur("name")}
              disabled={status === "submitting"}
              placeholder="e.g. Ramesh Deshmukh"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/35 text-base focus:border-[#d5b13a] focus:ring-1 focus:ring-[#d5b13a] transition-all"
            />
            {shouldShowError("name") && (
              <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[#d5b13a]">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.name}</span>
              </p>
            )}
          </div>

          <div>
            <label htmlFor="contact-phone" className="block text-xs font-medium text-white/90 mb-1.5">
              Phone / WhatsApp <span className="text-[#d5b13a]">*</span>
            </label>
            <input
              id="contact-phone"
              type="tel"
              inputMode="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onBlur={() => handleBlur("phone")}
              disabled={status === "submitting"}
              placeholder="+91 98XXX XXXXX"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/35 text-base focus:border-[#d5b13a] focus:ring-1 focus:ring-[#d5b13a] transition-all"
            />
            {shouldShowError("phone") && (
              <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[#d5b13a]">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.phone}</span>
              </p>
            )}
          </div>
        </div>

        {/* Row 2: Project / Firm Name & KDMC Micro-Market */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="contact-project" className="block text-xs font-medium text-white/90 mb-1.5">
              Project / Firm Name <span className="text-[#d5b13a]">*</span>
            </label>
            <input
              id="contact-project"
              type="text"
              name="project"
              value={formData.project}
              onChange={handleChange}
              onBlur={() => handleBlur("project")}
              disabled={status === "submitting"}
              placeholder="e.g. Shivam Enclave / Sterling Group"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/35 text-base focus:border-[#d5b13a] focus:ring-1 focus:ring-[#d5b13a] transition-all"
            />
            {shouldShowError("project") && (
              <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[#d5b13a]">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{errors.project}</span>
              </p>
            )}
          </div>

          <div>
            <label htmlFor="contact-micromarket" className="block text-xs font-medium text-white/90 mb-1.5">
              KDMC Micro-Market
            </label>
            <CustomSelect
              id="contact-micromarket"
              name="microMarket"
              value={effectiveMarket}
              placeholder="Select Micro-Market"
              options={microMarketOptions}
              onChange={(val) => setOverrideMarket(val)}
              disabled={status === "submitting"}
            />
          </div>
        </div>

        {/* Row 3: Approx Unsold Units & Scope Required */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="contact-unsoldunits" className="block text-xs font-medium text-white/90 mb-1.5">
              Approx. Unsold Units
            </label>
            <CustomSelect
              id="contact-unsoldunits"
              name="unsoldUnits"
              value={effectiveUnits}
              placeholder="Select Unsold Units"
              options={unsoldUnitsOptions}
              onChange={(val) => {
                setOverrideUnits(val);
                setFormData((prev) => ({ ...prev, unsoldUnits: val }));
              }}
              disabled={status === "submitting"}
            />
          </div>

          <div>
            <label htmlFor="contact-scope" className="block text-xs font-medium text-white/90 mb-1.5">
              Work Scope Required
            </label>
            <CustomSelect
              id="contact-scope"
              name="scope"
              value={effectiveScope}
              placeholder="Select Work Scope"
              options={scopeOptions}
              onChange={(val) => setOverrideScope(val)}
              disabled={status === "submitting"}
            />
          </div>
        </div>

        {/* Row 4: Project Overview / Challenges */}
        <div>
          <label htmlFor="contact-overview" className="block text-xs font-medium text-white/90 mb-1.5">
            Project Overview / Current Challenges <span className="text-white/50">(Optional)</span>
          </label>
          <textarea
            id="contact-overview"
            name="overview"
            rows={3}
            value={formData.overview}
            onChange={handleChange}
            disabled={status === "submitting"}
            maxLength={1000}
            placeholder="Briefly describe your project configuration, ticket size, or specific walk-in conversion hurdles..."
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/35 text-base focus:border-[#d5b13a] focus:ring-1 focus:ring-[#d5b13a] transition-all resize-none"
          />
        </div>

        {status === "error" && (
          <div className="p-4 rounded-xl bg-[#d5b13a]/15 border border-[#d5b13a]/30 text-xs text-white">
            <p className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-[#d5b13a] shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </p>
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full min-h-[52px] py-4 px-8 rounded-xl bg-gradient-to-r from-[#e4c760] via-[#d5b13a] to-[#bd9424] text-[#162740] font-bold text-sm sm:text-base tracking-wide shadow-[0_4px_24px_rgba(213,177,58,0.35),inset_0_1px_1px_rgba(255,255,255,0.4)] hover:shadow-[0_0_0_1px_#d5b13a,0_10px_40px_rgba(213,177,58,0.45)] hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-[#162740]" />
                <span>Submitting Request...</span>
              </>
            ) : (
              <span>Submit Confidential Audit Request</span>
            )}
          </button>
        </div>

        <p className="text-xs text-center text-white/60 pt-1">
          Your project details remain strictly confidential under NDA guidelines.
        </p>
      </form>
    </div>
  );
}
