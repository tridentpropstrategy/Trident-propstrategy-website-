"use client";

import React, { useState, useEffect } from "react";
import { siteConfig, isPlaceholder, getWhatsAppLink } from "@/data/site";

export function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);

  const hasRealWhatsApp = !isPlaceholder(siteConfig.whatsapp);
  const waHref = getWhatsAppLink(
    siteConfig.whatsapp,
    "Hi, I would like to book a strategy audit for my project."
  );

  useEffect(() => {
    // Fade and scale in ~1.5s after page load
    const timer = setTimeout(() => {
      setVisible(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!hasRealWhatsApp || !waHref) {
    return null;
  }

  return (
    <div
      className={`fixed bottom-6 right-6 z-30 hidden md:flex items-center justify-end transition-all duration-500 ease-out motion-reduce:transition-none ${
        visible
          ? "opacity-100 scale-100 pointer-events-auto"
          : "opacity-0 scale-75 pointer-events-none"
      }`}
    >
      <a
        href={waHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="group relative flex items-center h-14 rounded-full bg-gradient-to-r from-[#e4c760] via-[#d5b13a] to-[#bd9424] text-[#162740] shadow-[0_4px_24px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.4)] hover:shadow-[0_0_28px_rgba(213,177,58,0.55)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d5b13a] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111d30] transition-all duration-300 ease-out"
      >
        {/* Soft pulsing ring - disabled under reduced motion */}
        <span
          className="animate-pulse-ring absolute inset-0 rounded-full bg-[#d5b13a] pointer-events-none -z-10"
          aria-hidden="true"
        />

        {/* Hover expanded label - expands to the left */}
        <span className="max-w-0 opacity-0 overflow-hidden whitespace-nowrap text-xs lg:text-sm font-bold tracking-wide text-[#162740] group-hover:max-w-xs group-hover:opacity-100 group-hover:pl-5 group-hover:pr-1 transition-all duration-300 ease-out motion-reduce:transition-none motion-reduce:group-hover:max-w-0 motion-reduce:group-hover:opacity-0">
          Chat on WhatsApp
        </span>

        {/* 56px circular button containing navy WhatsApp icon */}
        <div className="w-14 h-14 shrink-0 flex items-center justify-center text-[#162740]">
          <svg
            viewBox="0 0 24 24"
            width="28"
            height="28"
            fill="currentColor"
            aria-hidden="true"
            className="shrink-0 group-hover:scale-105 transition-transform duration-200 motion-reduce:transform-none"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.711 1.456h.005c6.554 0 11.89-5.336 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </div>
      </a>
    </div>
  );
}
