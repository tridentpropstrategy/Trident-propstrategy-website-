export interface SocialLink {
  name: "LinkedIn" | "Instagram" | "Facebook" | "YouTube";
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export const siteConfig = {
  brandName: "Trident Prop Strategy",
  wordmark: {
    primary: "TRIDENT",
    secondary: "PROPSTRATEGY",
  },
  tagline: "Sales strategy for KDMC developers",
  announcementText:
    "KDMC ADVISORY MONITOR • Empowering Kalyan–Dombivli developers with data-driven sales strategy • 100% developer confidentiality • Channel partner network across MMR • Book your free strategy audit",
  domain: "https://tridentpropstrategy.in",
  phone: "7304355449",
  whatsapp: "7304355448",
  email: "tridentpropstrategy@gmail.com",
  address: "Trident Prop Strategy Tower, Station Road, Kalyan West, KDMC Region, Maharashtra 421301",
  city: "Kalyan",
  region: "Maharashtra, India",
  coverageAreas: [
    "Kalyan East & West",
    "Thane",
    "Navi Mumbai",
    "Dombivli & Shilphata",
    "Ambernath & Badlapur",
    "Shahad & Titwala",
  ],
  socials: [
    { name: "LinkedIn", href: "" },
    { name: "Instagram", href: "" },
    { name: "Facebook", href: "" },
    { name: "YouTube", href: "" },
  ] as SocialLink[],
  navItems: [
    { label: "Services", href: "#services" },
    { label: "ROI Simulator", href: "#calculator" },
    { label: "Markets", href: "#markets" },
    { label: "Why Trident", href: "#why" },
    { label: "Results", href: "#results" },
    { label: "Contact", href: "#contact" },
  ] as NavItem[],
};

export function isPlaceholder(val: string | undefined): boolean {
  if (!val) return true;
  const trimmed = val.trim();
  return trimmed.startsWith("[") && trimmed.endsWith("]");
}

export function getPhoneLink(phone: string): string | null {
  if (isPlaceholder(phone)) return null;
  const digits = phone.replace(/[^\d+]/g, "");
  return digits ? `tel:${digits}` : null;
}

export function getWhatsAppLink(whatsapp: string, message?: string): string | null {
  if (isPlaceholder(whatsapp)) return null;
  const digits = whatsapp.replace(/[^\d]/g, "");
  if (!digits) return null;
  const fullNumber = digits.length === 10 ? `91${digits}` : digits;
  const msg = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${fullNumber}${msg}`;
}
