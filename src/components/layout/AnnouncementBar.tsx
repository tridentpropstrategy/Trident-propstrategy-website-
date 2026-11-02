import React from "react";
import { siteConfig } from "@/data/site";

export function AnnouncementBar() {
  return (
    <aside
      aria-label="Announcement Monitor"
      className="relative z-50 w-full bg-gradient-to-r from-[#c99f2b] via-[#e4c760] to-[#c99f2b] text-[#162740] font-bold text-xs sm:text-sm py-2 overflow-hidden select-none shadow-sm"
    >
      <div className="animate-marquee flex items-center whitespace-nowrap">
        <span className="px-8 tracking-wide font-medium flex items-center gap-4">
          {siteConfig.announcementText}
        </span>
        <span
          className="px-8 tracking-wide font-medium flex items-center gap-4"
          aria-hidden="true"
        >
          {siteConfig.announcementText}
        </span>
      </div>
    </aside>
  );
}
