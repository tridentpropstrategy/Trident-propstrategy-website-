"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/cn";

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "standard" | "strong" | "subtle";
  highlightOnHover?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function GlassCard({
  variant = "standard",
  highlightOnHover = true,
  className,
  children,
  ...props
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!highlightOnHover || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setMousePos(null);
  };

  const variantClass = {
    standard: "glass",
    strong: "glass-strong",
    subtle: "bg-white/[0.04] border border-white/10 rounded-[20px]",
  }[variant];

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        variantClass,
        "relative overflow-hidden transition-all duration-300",
        highlightOnHover &&
          "hover:-translate-y-1 hover:border-[#d5b13a]/50 hover:shadow-[0_12px_40px_rgba(0,0,0,0.35),0_0_24px_rgba(213,177,58,0.15)]",
        className
      )}
      {...props}
    >
      {/* Dynamic Cursor Spotlight (pointer: fine only) */}
      {highlightOnHover && mousePos && (
        <div
          className="pointer-events-none absolute -inset-px opacity-0 hover:opacity-100 transition-opacity duration-300 hidden md:block"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(213, 177, 58, 0.08), transparent 80%)`,
          }}
          aria-hidden="true"
        />
      )}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
