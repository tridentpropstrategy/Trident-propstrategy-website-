import { BOOST_FACTOR } from "@/data/calculator";

// Input interface for calculation
export interface CalculatorInputs {
  units: number;
  pricePerUnitLakhs: number;
  salesRatePerMonth: number;
}

// Result interface returned by calculation
export interface CalculatorResult {
  totalLakhs: number;
  capitalDisplay: string;
  monthsWithout: number;
  monthsWith: number;
  monthsSaved: number;
  monthsWithoutDisplay: string;
  monthsWithDisplay: string;
  monthsSavedDisplay: string;
  barPercentWithout: number;
  barPercentWith: number;
}

// Pure calculation function with comments on every line
export function calculateRecovery(
  inputs: CalculatorInputs,
  boostFactor: number = BOOST_FACTOR
): CalculatorResult {
  // Extract inputs with safety fallbacks
  const { units, pricePerUnitLakhs, salesRatePerMonth } = inputs;

  // Compute total blocked capital in Indian Lakhs
  const totalLakhs = units * pricePerUnitLakhs;

  // Format capital: use Crores (Cr) if 100 Lakhs or more, otherwise display in Lakhs
  const capitalDisplay =
    totalLakhs >= 100
      ? "₹ " + (totalLakhs / 100).toFixed(2) + " Cr"
      : "₹ " + totalLakhs.toFixed(1) + " Lakhs";

  // Prevent division by zero or invalid negative rates
  const safeSalesRate = Math.max(0.0001, salesRatePerMonth);

  // Prevent division by zero or invalid boost factors
  const safeBoostFactor = Math.max(0.0001, boostFactor);

  // Calculate turnaround duration without Trident mandate (current status quo)
  const monthsWithout = units / safeSalesRate;

  // Calculate accelerated turnaround duration with Trident mandate and CP network
  const monthsWith = units / (safeSalesRate * safeBoostFactor);

  // Calculate net turnaround months saved, guaranteeing non-negative output
  const monthsSaved = Math.max(0, monthsWithout - monthsWith);

  // Format month values to exactly one decimal place followed by 'Months'
  const monthsWithoutDisplay = monthsWithout.toFixed(1) + " Months";

  // Format accelerated timeline with one decimal place
  const monthsWithDisplay = monthsWith.toFixed(1) + " Months";

  // Format time saved with one decimal place
  const monthsSavedDisplay = monthsSaved.toFixed(1) + " Months";

  // Status-quo bar is always full baseline width (100%)
  const barPercentWithout = 100;

  // Accelerated bar width as percentage of status-quo timeline (100 / boostFactor)
  const barPercentWith = Math.min(100, Math.max(0, (monthsWith / monthsWithout) * 100));

  // Return complete calculation results object
  return {
    totalLakhs,
    capitalDisplay,
    monthsWithout,
    monthsWith,
    monthsSaved,
    monthsWithoutDisplay,
    monthsWithDisplay,
    monthsSavedDisplay,
    barPercentWithout,
    barPercentWith,
  };
}

// Map slider units count to the Contact form's unsold units select range
export function mapUnitsToRange(units: number): string {
  // Range 1 to 5 units
  if (units <= 5) return "1 - 5";
  // Range 5 to 15 units
  if (units <= 15) return "5 - 15";
  // Range 15 to 30 units
  if (units <= 30) return "15 - 30";
  // Range 30+ units
  return "30+";
}
