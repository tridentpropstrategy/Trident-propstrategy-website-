// Configurations and constants for Stalled Inventory Capital Recovery Simulator

// PLACEHOLDER. Confirm the real figure with the client before launch
export const BOOST_FACTOR = 3;

export interface SliderConfig {
  id: "units" | "price" | "rate";
  label: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  unit: string;
}

export const SLIDER_CONFIGS: Record<"units" | "price" | "rate", SliderConfig> = {
  units: {
    id: "units",
    label: "Unsold Units Count",
    min: 1,
    max: 100,
    step: 1,
    defaultValue: 18,
    unit: "Units",
  },
  price: {
    id: "price",
    label: "Average Unit Price",
    min: 10,
    max: 300,
    step: 5,
    defaultValue: 55,
    unit: "Lakhs",
  },
  rate: {
    id: "rate",
    label: "Current Sales Rate",
    min: 0.5,
    max: 20,
    step: 0.5,
    defaultValue: 2,
    unit: "Units / Mo",
  },
};

export const INFO_NOTE =
  "Holding unsold units creates interest burn on construction finance. Speeding up sales protects developer profits.";

export const DISCLAIMER =
  `Illustrative estimate based on the figures you enter and an assumed ${BOOST_FACTOR}x sales velocity. Actual results depend on the project, pricing and market conditions.`;
