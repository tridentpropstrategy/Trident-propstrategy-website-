"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { NavItem, siteConfig } from "@/data/site";

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  activeSection: string;
}

export function MobileMenu({
  isOpen,
  onClose,
  navItems,
  activeSection,
}: MobileMenuProps) {
  const targetHrefRef = useRef<string | null>(null);

  // Manage body scroll lock and handle smooth scroll after drawer close
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";

      const href = targetHrefRef.current;
      if (href && href.startsWith("#")) {
        targetHrefRef.current = null;

        const timer = setTimeout(() => {
          const el = document.querySelector(href);
          if (el) {
            const prefersReducedMotion =
              typeof window !== "undefined" &&
              window.matchMedia("(prefers-reduced-motion: reduce)").matches;

            el.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });

            if (window.history && window.history.pushState) {
              window.history.pushState(null, "", href);
            } else {
              window.location.hash = href;
            }
          }
        }, 180);

        return () => clearTimeout(timer);
      }
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleLinkClick = (e: React.MouseEvent<HTMLElement>, href: string) => {
    e.preventDefault();
    targetHrefRef.current = href;
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
            aria-hidden="true"
          />

          {/* Drawer Content */}
          <motion.div
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation Menu"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm h-[100dvh] glass-strong z-50 p-6 flex flex-col justify-between lg:hidden border-l border-[#d5b13a]/30 shadow-2xl"
          >
            <div>
              {/* Header inside drawer */}
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <Image
                    src="/logo.svg"
                    alt="Trident Emblem"
                    width={32}
                    height={32}
                    className="w-8 h-8"
                  />
                  <div>
                    <span className="block font-serif font-bold text-sm tracking-wider text-[#d5b13a]">
                      {siteConfig.wordmark.primary}
                    </span>
                    <span className="block text-[10px] tracking-widest text-white/60">
                      {siteConfig.wordmark.secondary}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white/80 hover:text-[#d5b13a] hover:border-[#d5b13a]/40"
                  aria-label="Close navigation menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links with entrance stagger animation */}
              <nav className="mt-8 flex flex-col gap-2">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.href.replace("#", "");
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.08 + index * 0.04,
                        duration: 0.25,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={(e) => handleLinkClick(e, item.href)}
                        className={`flex items-center justify-between px-4 py-3.5 min-h-[48px] rounded-xl text-base font-medium transition-all ${
                          isActive
                            ? "bg-[#d5b13a]/15 text-[#d5b13a] border border-[#d5b13a]/30"
                            : "text-white/80 hover:text-[#d5b13a] hover:bg-white/5"
                        }`}
                      >
                        <span>{item.label}</span>
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#d5b13a]" />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
            </div>

            {/* Bottom CTA in Drawer */}
            <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
              <Button
                variant="primary"
                size="lg"
                href="#contact"
                className="w-full text-center min-h-[48px]"
                onClick={(e) => handleLinkClick(e, "#contact")}
              >
                Book Strategy Audit
              </Button>
              <p className="text-[11px] text-center text-white/50">
                100% Confidential • KDMC Real Estate Advisory
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
