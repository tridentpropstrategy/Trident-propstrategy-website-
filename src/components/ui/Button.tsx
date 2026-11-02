"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "glass" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  href,
  className,
  children,
  onClick,
  ...props
}: ButtonProps) {
  const baseClasses =
    "group relative inline-flex items-center justify-center font-semibold rounded-xl tracking-wide transition-all duration-300 min-h-[44px] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]";

  const sizeClasses = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-base",
  }[size];

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-[#e4c760] via-[#d5b13a] to-[#bd9424] text-[#162740] font-bold shadow-[0_4px_20px_rgba(213,177,58,0.3),inset_0_1px_1px_rgba(255,255,255,0.4)] hover:shadow-[0_0_0_1px_#d5b13a,0_10px_35px_rgba(213,177,58,0.45),inset_0_1px_1px_rgba(255,255,255,0.5)] hover:scale-[1.02] border border-[#f0d879]/30 overflow-hidden",
    secondary:
      "border border-[#d5b13a] text-[#d5b13a] bg-transparent hover:bg-[#d5b13a]/10 hover:shadow-[0_0_20px_rgba(213,177,58,0.18)] hover:scale-[1.01]",
    glass:
      "glass text-white hover:text-[#d5b13a] hover:border-[#d5b13a] hover:shadow-[0_4px_24px_rgba(213,177,58,0.2)]",
    ghost:
      "text-white/80 hover:text-[#d5b13a] hover:bg-white/5",
  }[variant];

  const content = (
    <>
      {variant === "primary" && (
        <span
          className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"
          aria-hidden="true"
        />
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );

  if (href) {
    // If it's an anchor link, smooth scroll
    return (
      <Link
        href={href}
        className={cn(baseClasses, sizeClasses, variantClasses, className)}
        onClick={(e) => {
          if (href.startsWith("#")) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
              target.scrollIntoView({ behavior: "smooth" });
            }
          }
          if (onClick) onClick(e as unknown as React.MouseEvent<HTMLButtonElement>);
        }}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      className={cn(baseClasses, sizeClasses, variantClasses, className)}
      onClick={onClick}
      {...props}
    >
      {content}
    </button>
  );
}
