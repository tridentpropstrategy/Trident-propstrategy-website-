import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail, ShieldCheck } from "lucide-react";
import { siteConfig, isPlaceholder, getPhoneLink } from "@/data/site";
import { caseStudies } from "@/data/caseStudies";

export function Footer() {
  const currentYear = 2026;
  const phoneLink = getPhoneLink(siteConfig.phone);
  const showResults = caseStudies.length > 0;

  return (
    <footer className="relative bg-[#111d30] border-t border-white/10 pt-16 pb-24 md:pb-16 text-white/80 overflow-hidden">
      {/* Decorative top gold hairline glow */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#e4bd21]/40 to-transparent" />

      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <Link href="#top" className="flex items-center gap-3 w-fit">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#e4bd21]/30 flex items-center justify-center">
                <Image
                  src="/logo.svg"
                  alt="Trident Emblem"
                  width={24}
                  height={24}
                  className="w-6 h-6 object-contain"
                />
              </div>
              <div>
                <span className="block font-serif font-bold text-base tracking-wider text-[#e4bd21]">
                  {siteConfig.wordmark.primary}
                </span>
                <span className="block text-[10px] tracking-[0.2em] text-white/60 uppercase">
                  {siteConfig.wordmark.secondary}
                </span>
              </div>
            </Link>

            <p className="text-sm text-white/70 leading-relaxed max-w-sm">
              Strategic sales advisory, mandate acceleration, and channel partner
              activation exclusively tailored for small developers and mandate
              owners across the Kalyan Dombivili and Central Suburbs.
            </p>

            <div className="flex items-center gap-2 mt-2 text-xs text-[#e4bd21]/90">
              <div className="w-6 h-6 rounded-lg bg-[#e4bd21]/10 flex items-center justify-center text-[#e4bd21]">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <span>100% Strict Developer Confidentiality & Non-Disclosure</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#e4bd21] mb-4">
              Navigation
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <Link
                  href="#services"
                  className="hover:text-[#e4bd21] transition-colors"
                >
                  Services & Framework
                </Link>
              </li>
              <li>
                <Link
                  href="#markets"
                  className="hover:text-[#e4bd21] transition-colors"
                >
                  KDMC Markets
                </Link>
              </li>
              <li>
                <Link
                  href="#why"
                  className="hover:text-[#e4bd21] transition-colors"
                >
                  Why Trident
                </Link>
              </li>
              {showResults && (
                <li>
                  <Link
                    href="#results"
                    className="hover:text-[#e4bd21] transition-colors"
                  >
                    Track Record
                  </Link>
                </li>
              )}
              <li>
                <Link
                  href="#contact"
                  className="hover:text-[#e4bd21] transition-colors"
                >
                  Book Strategy Audit
                </Link>
              </li>
            </ul>
          </div>

          {/* Coverage Areas */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#e4bd21] mb-4">
              Coverage Corridors
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm">
              {siteConfig.coverageAreas.map((area) => (
                <li key={area} className="flex items-center gap-2 text-white/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e4bd21]/70" />
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#e4bd21] mb-4">
              Direct Advisory Desk
            </h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li className="flex items-start gap-3 text-white/70">
                <div className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center text-[#e4bd21] shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <span>{siteConfig.address}</span>
              </li>

              <li className="flex items-center gap-3 text-white/70">
                <div className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center text-[#e4bd21] shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                {phoneLink ? (
                  <a
                    href={phoneLink}
                    className="hover:text-[#e4bd21] transition-colors"
                  >
                    {siteConfig.phone}
                  </a>
                ) : (
                  <span className="text-white/50">{siteConfig.phone}</span>
                )}
              </li>

              <li className="flex items-center gap-3 text-white/70">
                <div className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center text-[#e4bd21] shrink-0">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                {!isPlaceholder(siteConfig.email) ? (
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="hover:text-[#e4bd21] transition-colors"
                  >
                    {siteConfig.email}
                  </a>
                ) : (
                  <span className="text-white/50">{siteConfig.email}</span>
                )}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© {currentYear} {siteConfig.brandName}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms of Engagement
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              RERA Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
