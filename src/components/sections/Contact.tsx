import React from "react";
import { Phone, MessageSquare } from "lucide-react";
import { siteConfig, isPlaceholder, getPhoneLink, getWhatsAppLink } from "@/data/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/ui/ContactForm";
import { Reveal } from "@/components/ui/Reveal";

export function Contact() {
  const hasRealPhone = !isPlaceholder(siteConfig.phone);
  const phoneHref = getPhoneLink(siteConfig.phone);
  const waHref = getWhatsAppLink(
    siteConfig.whatsapp,
    "Hello Trident Prop Strategy team, I am interested in scheduling a KDMC real estate sales strategy audit."
  );

  return (
    <section id="contact" className="relative py-16 md:py-24 bg-[#111d30]">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Initiate Mandate Engagement"
            title="Accelerate Your KDMC"
            highlight="Sales Velocity"
            description="Schedule a confidential developer audit with our KDMC sales advisory team. We review floor plans, pricing resistance, and broker alignment under strict non-disclosure."
          />
        </Reveal>

        <div className="max-w-3xl mx-auto">
          {/* Contact Form Card */}
          <Reveal>
            <ContactForm />
          </Reveal>

          {/* Direct Advisory Desk - Mobile Only (hidden on tablet & desktop >= 768px) */}
          {hasRealPhone && phoneHref && waHref && (
            <div className="block md:hidden mt-8">
              <Reveal delay={0.1}>
                <div className="glass p-6 rounded-[20px] border border-white/10 space-y-4">
                  <h3 className="text-xs uppercase font-semibold tracking-wider text-[#d5b13a]">
                    Direct Advisory Desk
                  </h3>
                  <div className="space-y-3">
                    <a
                      href={phoneHref}
                      className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl border border-[#d5b13a] text-[#d5b13a] hover:bg-[#d5b13a]/10 font-semibold text-sm transition-all"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Call {siteConfig.phone}</span>
                    </a>

                    <a
                      href={waHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl border border-[#d5b13a] text-white hover:border-[#d5b13a] hover:text-[#d5b13a] glass font-semibold text-sm transition-all"
                    >
                      <MessageSquare className="w-4 h-4 text-[#d5b13a]" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
