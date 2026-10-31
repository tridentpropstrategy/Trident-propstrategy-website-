"use client";

import React from "react";
import { Phone, MessageSquare, ArrowUpRight } from "lucide-react";
import { siteConfig, isPlaceholder, getPhoneLink, getWhatsAppLink } from "@/data/site";

export function MobileActionBar() {
  const hasRealPhone = !isPlaceholder(siteConfig.phone);
  const phoneHref = getPhoneLink(siteConfig.phone);
  const waHref = getWhatsAppLink(
    siteConfig.whatsapp,
    "Hello Trident Prop Strategy team, I am interested in scheduling a KDMC real estate sales strategy audit."
  );

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-30 md:hidden glass-strong !rounded-none !border-x-0 !border-b-0 !border-t border-t-[#e4bd21]/25 px-4 pt-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(0,0,0,0.4)] backdrop-blur-lg"
      aria-label="Quick Mobile Actions"
    >
      <div className="max-w-md mx-auto">
        {hasRealPhone && phoneHref && waHref ? (
          <div className="grid grid-cols-2 gap-3">
            <a
              href={phoneHref}
              className="flex items-center justify-center gap-2 h-11 px-4 rounded-xl glass border border-[#e4bd21]/30 text-white font-medium text-sm hover:border-[#e4bd21] hover:text-[#e4bd21] transition-all"
            >
              <div className="w-6 h-6 rounded-lg bg-[#e4bd21]/15 flex items-center justify-center text-[#e4bd21]">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <span>Call Us</span>
            </a>

            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 h-11 px-4 rounded-xl bg-[#e4bd21] text-[#162740] font-semibold text-sm shadow-[0_4px_16px_rgba(228,189,33,0.3)] hover:scale-[1.01] transition-all"
            >
              <div className="w-6 h-6 rounded-lg bg-[#162740]/15 flex items-center justify-center text-[#162740]">
                <MessageSquare className="w-3.5 h-3.5" />
              </div>
              <span>WhatsApp</span>
            </a>
          </div>
        ) : (
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              const el = document.querySelector("#contact");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-[#e4bd21] text-[#162740] font-semibold text-sm shadow-[0_4px_20px_rgba(228,189,33,0.3)] transition-all"
          >
            <span>Book Strategy Audit</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
}
