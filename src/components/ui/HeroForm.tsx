"use client";

import React, { useState } from "react";
import { CheckCircle2, AlertCircle, Loader2, Lock } from "lucide-react";
import { validateLeadForm, ValidationErrors } from "@/lib/validation";

export function HeroForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    project: "",
    company: "", // honeypot
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ValidationErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBlur = (field: "name" | "phone" | "project") => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const validationErrors = validateLeadForm(formData, true);
    setErrors((prev) => ({ ...prev, [field]: validationErrors[field] }));
  };

  const shouldShowError = (field: "name" | "phone" | "project") => {
    return Boolean((isSubmitted || touched[field]) && errors[field]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    const validationErrors = validateLeadForm(formData, true);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "hero",
          name: formData.name,
          phone: formData.phone,
          project: formData.project,
          company: formData.company,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(
          data.error || "Something went wrong. Please call or WhatsApp us directly."
        );
      }
    } catch {
      setStatus("error");
      setErrorMessage("Network issue. Please call or WhatsApp our advisory team.");
    }
  };

  if (status === "success") {
    return (
      <div className="glass-strong hero-card-shimmer p-6 sm:p-8 rounded-[20px] text-center flex flex-col items-center justify-center min-h-[360px]">
        <div className="w-14 h-14 rounded-2xl bg-[#e4bd21]/20 border border-[#e4bd21]/40 flex items-center justify-center text-[#e4bd21] mb-5 shadow-[0_0_24px_rgba(228,189,33,0.3)]">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="font-serif text-xl sm:text-2xl text-[#e4bd21] font-semibold mb-2">
          Audit Request Received
        </h3>
        <p className="text-sm sm:text-base text-white/80 max-w-xs leading-relaxed mb-6">
          Thank you. Our KDMC advisory team will review your project parameters and contact you within 24 hours under strict NDA.
        </p>
        <button
          type="button"
          onClick={() => {
            setFormData({ name: "", phone: "", project: "", company: "" });
            setErrors({});
            setTouched({});
            setIsSubmitted(false);
            setStatus("idle");
          }}
          className="text-xs text-[#e4bd21] hover:underline underline-offset-4 font-medium"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <div className="glass-strong hero-card-shimmer p-6 sm:p-8 rounded-[20px] relative">
      <div className="mb-6">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#e4bd21]/15 text-[#e4bd21] text-[11px] font-semibold tracking-wider uppercase mb-2">
          <Lock className="w-3 h-3" />
          <span>Confidential Audit</span>
        </div>
        <h2 className="font-serif text-xl sm:text-2xl font-semibold text-white">
          Get Your Free Strategy Audit
        </h2>
        <p className="text-xs sm:text-sm text-white/70 mt-1">
          Direct review of your KDMC project pricing and absorption speed.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
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

        {/* Name */}
        <div>
          <label htmlFor="hero-name" className="block text-xs font-medium text-white/90 mb-1.5">
            Developer / Contact Name <span className="text-[#e4bd21]">*</span>
          </label>
          <input
            id="hero-name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={() => handleBlur("name")}
            disabled={status === "submitting"}
            placeholder="e.g. Rajesh Patil"
            className="w-full px-3.5 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/35 text-base focus:border-[#e4bd21] focus:ring-1 focus:ring-[#e4bd21] transition-all"
          />
          {shouldShowError("name") && (
            <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[#e4bd21]">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.name}</span>
            </p>
          )}
        </div>

        {/* Phone / WhatsApp */}
        <div>
          <label htmlFor="hero-phone" className="block text-xs font-medium text-white/90 mb-1.5">
            Phone / WhatsApp <span className="text-[#e4bd21]">*</span>
          </label>
          <input
            id="hero-phone"
            type="tel"
            inputMode="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={() => handleBlur("phone")}
            disabled={status === "submitting"}
            placeholder="+91 98XXX XXXXX"
            className="w-full px-3.5 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/35 text-base focus:border-[#e4bd21] focus:ring-1 focus:ring-[#e4bd21] transition-all"
          />
          {shouldShowError("phone") && (
            <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[#e4bd21]">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.phone}</span>
            </p>
          )}
        </div>

        {/* Project / Firm Name */}
        <div>
          <label htmlFor="hero-project" className="block text-xs font-medium text-white/90 mb-1.5">
            Project / Firm Name <span className="text-[#e4bd21]">*</span>
          </label>
          <input
            id="hero-project"
            type="text"
            name="project"
            value={formData.project}
            onChange={handleChange}
            onBlur={() => handleBlur("project")}
            disabled={status === "submitting"}
            placeholder="e.g. Apex Heights / Trident Infra"
            className="w-full px-3.5 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/35 text-base focus:border-[#e4bd21] focus:ring-1 focus:ring-[#e4bd21] transition-all"
          />
          {shouldShowError("project") && (
            <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[#e4bd21]">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.project}</span>
            </p>
          )}
        </div>

        {status === "error" && (
          <div className="p-3 rounded-xl bg-[#e4bd21]/15 border border-[#e4bd21]/30 text-xs text-white">
            <p className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-[#e4bd21] shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full min-h-[48px] py-3.5 px-6 rounded-xl bg-[#e4bd21] text-[#162740] font-semibold text-sm shadow-[0_4px_20px_rgba(228,189,33,0.25)] hover:shadow-[0_0_0_1px_#e4bd21,0_10px_40px_rgba(228,189,33,0.35)] hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-[#162740]" />
              <span>Sending Request...</span>
            </>
          ) : (
            <span>Request Free Audit</span>
          )}
        </button>

        <p className="text-[11px] text-center text-white/60 pt-1">
          Your project details stay strictly confidential under NDA.
        </p>
      </form>
    </div>
  );
}
