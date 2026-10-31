import React from "react";
import { cn } from "@/lib/cn";

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        align === "center" ? "text-center mx-auto max-w-3xl" : "max-w-2xl",
        className
      )}
    >
      {eyebrow && (
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e4bd21]/10 border border-[#e4bd21]/20 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#e4bd21]" />
          <span className="eyebrow">{eyebrow}</span>
        </div>
      )}
      <h2 className="h2-fluid text-white font-medium mb-4">
        {title}{" "}
        {highlight && <span className="text-[#e4bd21] italic">{highlight}</span>}
      </h2>
      {description && (
        <p className="text-white/75 text-base md:text-lg leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
