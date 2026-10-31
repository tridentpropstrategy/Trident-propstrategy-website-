export interface Market {
  id: string;
  label: string;
  sector: string;
  headline: string;
  carpetRate: string;
  demand: string;
  buyerProfile: string;
  infrastructure: string;
  pitchAngle: string;
}

export const markets: Market[] = [
  {
    id: "kalyan-west",
    label: "Kalyan West",
    sector: "Central Core Hub",
    headline: "Premium lifestyle and transit-connected family residences",
    carpetRate: "₹7,500 - 10,200 /sq.ft",
    demand: "High - Established residential demand",
    buyerProfile: "Upgrading local families, banking & administrative professionals seeking established social infra",
    infrastructure: "Metro Line 5 connectivity, Kalyan Station remodelling, Ring Road Phase 1",
    pitchAngle: "Anchor pitch on legacy social infrastructure, premium schooling access, and guaranteed station travel time",
  },
  {
    id: "dombivli-east",
    label: "Dombivli East",
    sector: "High-Density Suburban Core",
    headline: "High-absorption mid-income township and station corridor",
    carpetRate: "₹6,800 - 9,500 /sq.ft",
    demand: "Very High - Strong salaried buyer volume",
    buyerProfile: "Salaried corporate commuters to Thane, BKC, and South Mumbai with ticket-size sensitivity",
    infrastructure: "Kalyan-Shil Road 6-lane widening, Airoli-Katai elevated connector access, MIDC commercial fringe",
    pitchAngle: "Highlight dual connectivity via Central Railway fast locals and immediate access to the Airoli-Katai corridor",
  },
  {
    id: "khadakpada",
    label: "Khadakpada",
    sector: "Kalyan Luxury Enclave",
    headline: "Aspirational high-ticket gated communities and penthouses",
    carpetRate: "₹8,800 - 12,000 /sq.ft",
    demand: "Moderate-High - Low price resistance for quality specs",
    buyerProfile: "Local business owners, doctors, chartered accountants, and affluent traders seeking lifestyle amenities",
    infrastructure: "Proximity to Gandhar ground, top-tier CBSE/ICSE schools, upscale retail high-streets",
    pitchAngle: "Position as the prime address of Kalyan; focus on low-density living, carpet efficiency, and luxury club amenities",
  },
  {
    id: "shilphata",
    label: "Shilphata",
    sector: "Strategic Growth Junction",
    headline: "Navi Mumbai–Thane convergence zone with massive capital upside",
    carpetRate: "₹6,200 - 8,400 /sq.ft",
    demand: "Surging - Heavy interest from Thane & Airoli workforce",
    buyerProfile: "IT/ITeS engineers working in Airoli, Mahape, and Ghansoli looking for budget-friendly 1 & 2 BHKs",
    infrastructure: "Airoli-Katai Tunnel, upcoming Metro Line 12 (Kalyan-Taloja), multi-modal corridor",
    pitchAngle: "Lead with 15-minute commute to Airoli Mindspace IT parks at 40% discount to Thane West prices",
  },
  {
    id: "manpada",
    label: "Manpada",
    sector: "Dombivli Premium Growth Corridor",
    headline: "Modern lifestyle townships with self-contained ecosystems",
    carpetRate: "₹7,200 - 9,800 /sq.ft",
    demand: "High - Fast absorption in integrated townships",
    buyerProfile: "Young tech-savvy nuclear families seeking integrated clubhouse amenities and retail convenience",
    infrastructure: "Direct frontage on Kalyan-Shilphata Road, planned Metro Line 12 station, premium retail developments",
    pitchAngle: "Showcase gated security, walk-to-school convenience, and superior rental yield potential",
  },
  {
    id: "shahad",
    label: "Shahad",
    sector: "Industrial & Value Residential Belt",
    headline: "High-yield industrial fringe and competitive ticket-size inventory",
    carpetRate: "₹5,200 - 6,900 /sq.ft",
    demand: "Consistent - Strong rental & first-time buyer demand",
    buyerProfile: "Industrial executives, Century Rayon employees, and entry-level home seekers transitioning from rent",
    infrastructure: "Shahad Railway Station accessibility, Waldhuni riverfront bridge upgrade, Titwala highway link",
    pitchAngle: "Highlight aggressive EMI-vs-Rent advantage and immediate walk-to-station rail transit",
  },
  {
    id: "ambernath",
    label: "Ambernath",
    sector: "Central Suburbs Affordable Expansion",
    headline: "High-velocity entry-level residential and MIDC employment node",
    carpetRate: "₹4,200 - 5,800 /sq.ft",
    demand: "High - Maximum volume in affordable 1 & 2 BHK brackets",
    buyerProfile: "First-time home buyers, manufacturing professionals, and investors targeting affordable ticket sizes",
    infrastructure: "MIDC expansion, Ambernath–Badlapur bypass, Chikhloli railway station project",
    pitchAngle: "Pitch government subsidy eligibility, lower ticket size barrier, and future railway station proximity",
  },
  {
    id: "badlapur",
    label: "Badlapur",
    sector: "Green Foothills Affordable Corridor",
    headline: "Value-first townships with scenic air quality and fast local transit",
    carpetRate: "₹3,800 - 5,200 /sq.ft",
    demand: "High - High volume in entry-level segments",
    buyerProfile: "Young salaried couples and retirees wanting clean air, scenic views, and affordable homeownership",
    infrastructure: "Badlapur fast local connectivity, proposed Karjat-Panvel rail link, Katrap bypass road",
    pitchAngle: "Position as the ultimate value proposition: 2 BHK space for the price of 1 BHK elsewhere with scenic lifestyle",
  },
];
