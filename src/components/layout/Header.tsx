"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Menu } from "lucide-react";
import { siteConfig, NavItem } from "@/data/site";
import { caseStudies } from "@/data/caseStudies";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("services");

  // Filter nav items: if case studies array is empty, hide Results
  const navItems: NavItem[] = siteConfig.navItems.filter((item) => {
    if (item.href === "#results" && caseStudies.length === 0) {
      return false;
    }
    return true;
  });

  // Handle scroll state for glass effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        {
          rootMargin: "-20% 0px -60% 0px",
          threshold: 0,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [navItems]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();

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
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${isScrolled
          ? "glass !rounded-none !border-x-0 !border-t-0 !border-b border-b-[#d5b13a]/25 py-3 md:py-4 shadow-[0_8px_30px_rgba(0,0,0,0.3)] backdrop-blur-md"
          : "bg-transparent py-5 md:py-6"
          }`}
      >
        <div className="max-w-6xl mx-auto px-5 md:px-8 flex items-center justify-between">
          {/* Logo + Wordmark */}
          <Link
            href="#top"
            onClick={(e) => handleNavClick(e, "#top")}
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d5b13a] rounded-lg p-1"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white border border-[#d5b13a]/20 flex items-center justify-center group-hover:border-[#d5b13a]/50 transition-colors">
              <Image
                src="/logo.svg"
                alt="Trident Emblem"
                width={32}
                height={32}
                className="w-6 h-6 md:w-8 md:h-8 object-contain"
                priority
              />
            </div>

            <div className="flex flex-col">
              <span className="font-serif font-bold text-base md:text-xl tracking-wider text-[#d5b13a] leading-tight">
                {siteConfig.wordmark.primary}
              </span>

              <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-white/70 font-medium">
                {siteConfig.wordmark.secondary}
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-0.5 xl:gap-2 px-3 py-1.5 rounded-full glass border border-white/10"
          >
            {navItems.map((item) => {
              const id = item.href.replace("#", "");
              const isActive = activeSection === id;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative px-3 xl:px-4 py-1.5 text-xs xl:text-sm font-medium transition-colors whitespace-nowrap ${isActive
                    ? "text-[#d5b13a]"
                    : "text-white/75 hover:text-white"
                    }`}
                >
                  <span className="relative z-10">{item.label}</span>

                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-[#d5b13a]/15 rounded-full border border-[#d5b13a]/30"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Button variant="primary" size="sm" href="#contact">
              Book Strategy Audit
            </Button>
          </div>

          {/* Mobile / Tablet Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden w-11 h-11 flex items-center justify-center rounded-xl glass border border-white/10 text-white/80 hover:text-[#d5b13a] hover:border-[#d5b13a]/30"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navItems={navItems}
        activeSection={activeSection}
      />
    </>
  );
}