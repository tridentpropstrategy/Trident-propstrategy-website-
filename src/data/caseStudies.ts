export interface CaseStudy {
  id: string;
  location: string;
  title: string;
  summary: string;
  resultLabel: string;
  resultValue: string;
  projectType: string;
  promoter: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "case-1",
    location: "Kalyan West Mandate",
    title: "Resumption of Stalled Footfalls for Premier Heights",
    summary:
      "Project had just 2 bookings in 4 months. Trident Prop Strategy retrained the sales team on Ring Road connectivity and engaged 800+ Thane CPs.",
    resultLabel: "Inventory Cleared",
    resultValue: "94% in 5 Months",
    projectType: "72 Units Project",
    promoter: "Shree Developers",
  },
  {
    id: "case-2",
    location: "Ambernath East",
    title: "1 BHK & 2 BHK Fast Liquidation Campaign",
    summary:
      "Repositioned pricing to match first-time buyer budgets in MIDC industrial belt. Activated regional broker drives across Dombivli and Badlapur.",
    resultLabel: "Sold Out Timeline",
    resultValue: "110 Days Record",
    projectType: "120 Units Affordable",
    promoter: "Vighnaharta Buildcon",
  },
  {
    id: "case-3",
    location: "Dombivli Shilphata",
    title: "Elevating Walk-In Conversions via Location Pitch",
    summary:
      "Sales conversion rate jumped from 3.5% to 12.8% after Trident Prop Strategy trained the site team on bullet train & metro corridor pitch frameworks.",
    resultLabel: "Revenue Realized",
    resultValue: "₹42.5 Crore",
    projectType: "Mid-Rise Township",
    promoter: "Aura Realty",
  },
];