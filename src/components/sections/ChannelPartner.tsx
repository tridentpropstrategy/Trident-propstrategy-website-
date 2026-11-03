"use client";

import React, { useState } from "react";
import { Handshake, ShieldCheck, CheckCircle2, AlertCircle, Loader2, Phone, MessageSquare } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import {
  siteConfig,
  isPlaceholder,
  getPhoneLink,
  getWhatsAppLink,
} from "@/data/site";
import { validateCpForm, CpValidationErrors } from "@/lib/validation";

export function ChannelPartner() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    firmName: "",
    address: "",
    company: "", // honeypot
  });
  const [errors, setErrors] = useState<CpValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const hasRealPhone = !isPlaceholder(siteConfig.phone);
  const phoneHref = getPhoneLink(siteConfig.phone);
  const waHref = getWhatsAppLink(
    siteConfig.whatsapp,
    "Hello Trident Prop Strategy team, I am interested in joining your Channel Partner network."
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof CpValidationErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBlur = (field: "name" | "phone" | "firmName" | "address") => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const validationErrors = validateCpForm(formData);
    setErrors((prev) => ({ ...prev, [field]: validationErrors[field] }));
  };

  const shouldShowError = (field: "name" | "phone" | "firmName" | "address") => {
    return Boolean((isSubmitted || touched[field]) && errors[field]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    const validationErrors = validateCpForm(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    // Honeypot check: silently simulate success without sending
    if (formData.company.trim().length > 0) {
      setStatus("success");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "cp-form",
          name: formData.name,
          phone: formData.phone,
          project: formData.firmName,
          scope: "Channel Partner Registration",
          overview: "Office address: " + formData.address,
          microMarket: "",
          unsoldUnits: "",
          company: formData.company,
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
      setErrorMessage("Something went wrong. Please call or WhatsApp us.");
    }
  };

  return (
    <section id="channel-partner" className="relative py-12 md:py-20 bg-[#162740]">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <Reveal>
          <div className="glass p-8 md:p-12 border-[#d5b13a]/30 shadow-[0_12px_40px_rgba(0,0,0,0.3)] relative overflow-hidden">
            {/* Background subtle gold glow accent */}
            <div
              className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#d5b13a]/10 blur-3xl pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* Left Column: Heading, Description, and Trust Points */}
              <div className="lg:col-span-5 flex flex-col text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d5b13a]/15 border border-[#d5b13a]/30 mb-3.5 self-center lg:self-start">
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

                <div className="flex items-center justify-center lg:justify-start gap-4 mt-6 text-xs text-white/60">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#d5b13a]" />
                    Guaranteed Commission Protection
                  </span>
                  <span>•</span>
                  <span>350+ Active MMR Brokers</span>
                </div>
              </div>

              {/* Right Column: Join as Channel Partner Form Card */}
              <div className="lg:col-span-7 w-full">
                {status === "success" ? (
                  <div className="w-full glass-strong p-8 sm:p-10 rounded-[20px] text-center flex flex-col items-center justify-center min-h-[420px] border border-[#d5b13a]/40 shadow-2xl">
                    <div className="w-16 h-16 rounded-2xl bg-[#d5b13a]/20 border border-[#d5b13a]/40 flex items-center justify-center text-[#d5b13a] mb-5 shadow-[0_0_32px_rgba(213,177,58,0.35)] animate-pulse">
                      <CheckCircle2 className="w-9 h-9" />
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl text-[#d5b13a] font-semibold mb-2">
                      Registration Received
                    </h3>
                    <p className="text-white/80 text-sm sm:text-base max-w-sm leading-relaxed mb-6">
                      Thank you. Our team will contact you shortly.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({
                          name: "",
                          phone: "",
                          firmName: "",
                          address: "",
                          company: "",
                        });
                        setErrors({});
                        setTouched({});
                        setIsSubmitted(false);
                        setStatus("idle");
                      }}
                      className="text-xs text-[#d5b13a] hover:underline underline-offset-4 font-semibold uppercase tracking-wider cursor-pointer"
                    >
                      Submit another response
                    </button>
                  </div>
                ) : (
                  <div className="w-full glass-strong p-6 sm:p-8 rounded-[20px] border border-[#d5b13a]/30 shadow-2xl relative">
                    <div className="mb-6">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#d5b13a]/15 text-[#d5b13a] text-[11px] font-semibold tracking-wider uppercase mb-2">
                        <Handshake className="w-3 h-3" />
                        <span>Channel partner network</span>
                      </div>
                      <h3 className="font-serif text-xl sm:text-2xl font-semibold text-white">
                        Join as Channel Partner
                      </h3>
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

                      {/* Row 1: Name & Contact No */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="cp-name"
                            className="block text-xs font-medium text-white/90 mb-1.5"
                          >
                            Name <span className="text-[#d5b13a]">*</span>
                          </label>
                          <input
                            id="cp-name"
                            type="text"
                            name="name"
                            autoComplete="name"
                            value={formData.name}
                            onChange={handleChange}
                            onBlur={() => handleBlur("name")}
                            disabled={status === "submitting"}
                            placeholder="e.g. Rajesh Patil"
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
                          <label
                            htmlFor="cp-phone"
                            className="block text-xs font-medium text-white/90 mb-1.5"
                          >
                            Contact No <span className="text-[#d5b13a]">*</span>
                          </label>
                          <input
                            id="cp-phone"
                            type="tel"
                            inputMode="tel"
                            name="phone"
                            autoComplete="tel"
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

                      {/* Row 2: Firm Name */}
                      <div>
                        <label
                          htmlFor="cp-firm"
                          className="block text-xs font-medium text-white/90 mb-1.5"
                        >
                          Firm Name <span className="text-[#d5b13a]">*</span>
                        </label>
                        <input
                          id="cp-firm"
                          type="text"
                          name="firmName"
                          autoComplete="organization"
                          value={formData.firmName}
                          onChange={handleChange}
                          onBlur={() => handleBlur("firmName")}
                          disabled={status === "submitting"}
                          placeholder="e.g. Apex Realty / Shree Ganesh Associates"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/35 text-base focus:border-[#d5b13a] focus:ring-1 focus:ring-[#d5b13a] transition-all"
                        />
                        {shouldShowError("firmName") && (
                          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[#d5b13a]">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{errors.firmName}</span>
                          </p>
                        )}
                      </div>

                      {/* Row 3: Office Address */}
                      <div>
                        <label
                          htmlFor="cp-address"
                          className="block text-xs font-medium text-white/90 mb-1.5"
                        >
                          Office Address <span className="text-[#d5b13a]">*</span>
                        </label>
                        <textarea
                          id="cp-address"
                          name="address"
                          rows={3}
                          autoComplete="street-address"
                          value={formData.address}
                          onChange={handleChange}
                          onBlur={() => handleBlur("address")}
                          disabled={status === "submitting"}
                          maxLength={300}
                          placeholder="e.g. Shop 4, Ground Floor, Station Road, Kalyan West..."
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/35 text-base focus:border-[#d5b13a] focus:ring-1 focus:ring-[#d5b13a] transition-all resize-none"
                        />
                        {shouldShowError("address") && (
                          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[#d5b13a]">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{errors.address}</span>
                          </p>
                        )}
                      </div>

                      {status === "error" && (
                        <div className="p-4 rounded-xl bg-[#d5b13a]/15 border border-[#d5b13a]/30 text-xs text-white space-y-3">
                          <p className="flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 text-[#d5b13a] shrink-0 mt-0.5" />
                            <span>{errorMessage || "Something went wrong. Please call or WhatsApp us."}</span>
                          </p>
                          {hasRealPhone && phoneHref && waHref && (
                            <div className="flex items-center gap-2 pt-1">
                              <a
                                href={phoneHref}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition-colors"
                              >
                                <Phone className="w-3 h-3 text-[#d5b13a]" />
                                <span>Call</span>
                              </a>
                              <a
                                href={waHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#e4c760] via-[#d5b13a] to-[#bd9424] text-[#162740] font-semibold text-xs transition-transform hover:scale-[1.02]"
                              >
                                <MessageSquare className="w-3 h-3" />
                                <span>WhatsApp</span>
                              </a>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Submit Button */}
                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={status === "submitting"}
                          className="w-full min-h-[48px] py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#e4c760] via-[#d5b13a] to-[#bd9424] text-[#162740] font-bold text-sm tracking-wide shadow-[0_4px_20px_rgba(213,177,58,0.3),inset_0_1px_1px_rgba(255,255,255,0.4)] hover:shadow-[0_0_0_1px_#d5b13a,0_10px_40px_rgba(213,177,58,0.4)] hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          {status === "submitting" ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin text-[#162740]" />
                              <span>Sending...</span>
                            </>
                          ) : (
                            <span>Submit</span>
                          )}
                        </button>
                        <p className="text-xs text-center text-white/60 pt-2">
                          Our team will contact you soon
                        </p>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
