export interface LeadFormData {
  source: "hero" | "contact" | "channel-partner";
  name: string;
  phone: string;
  project: string;
  microMarket?: string;
  unsoldUnits?: string;
  scope?: string;
  overview?: string;
  company?: string; // honeypot
}

export interface ValidationErrors {
  name?: string;
  phone?: string;
  project?: string;
  microMarket?: string;
  unsoldUnits?: string;
  scope?: string;
}

export function normalizePhone(phone: string): string {
  return phone.replace(/[\s\-]/g, "").trim();
}

export function isValidIndianPhone(phone: string): boolean {
  const normalized = normalizePhone(phone);
  // Optional +91 or 0 prefix, followed by 10 digits starting with 6, 7, 8, or 9
  const indianPhoneRegex = /^(\+91|0)?[6-9]\d{9}$/;
  return indianPhoneRegex.test(normalized);
}

export function validateLeadForm(
  data: Partial<LeadFormData>,
  isHero: boolean = false
): ValidationErrors {
  const errors: ValidationErrors = {};

  const name = (data.name || "").trim();
  if (!name) {
    errors.name = "Please enter your name";
  } else if (name.length < 2) {
    errors.name = "Name must be at least 2 characters";
  } else if (name.length > 80) {
    errors.name = "Name must not exceed 80 characters";
  }

  const phone = (data.phone || "").trim();
  if (!phone) {
    errors.phone = "Please enter your phone/WhatsApp number";
  } else if (!isValidIndianPhone(phone)) {
    errors.phone = "Please enter a valid 10-digit Indian mobile number";
  }

  const project = (data.project || "").trim();
  if (!project) {
    errors.project = "Please enter your project or firm name";
  } else if (project.length < 2) {
    errors.project = "Project/firm name must be at least 2 characters";
  } else if (project.length > 120) {
    errors.project = "Project/firm name must not exceed 120 characters";
  }

  // If not hero, we can optionally validate scope or microMarket if required
  if (!isHero) {
    if (data.overview && data.overview.length > 1000) {
      // Handled silently or length limited
    }
  }

  return errors;
}
