import React from "react";
import { siteConfig } from "@/data/site";

export function AnnouncementBar() {
  return (
    <aside
      aria-label="Announcement Monitor"
      className="relative z-50 w-full bg-[#e4bd21] text-[#162740] font-bold text-xs sm:text-sm py-2 overflow-hidden select-none"
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
