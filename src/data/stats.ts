export interface StatItem {
  value: string;
  label: string;
  helper?: string;
}

export const stats: StatItem[] = [
  {
    value: "[140]+",
    label: "[Cr Inventory Liquidated]",
    helper: "[Across Kalyan-Dombivli micro-markets]",
  },
  {
    value: "[45]+",
    label: "[Days Avg Mandate Turnaround]",
    helper: "[From advisory audit to CP activation]",
  },
  {
    value: "[350]+",
    label: "[Active Channel Partners]",
    helper: "[Empanelled MMR broker network]",
  },
];

/**
 * Returns true if at least one stat has a verified (non-bracketed) value.
 * Per requirement: Hide the whole stat row automatically if all values still start with "[".
 */
export function hasVerifiedStats(items: StatItem[]): boolean {
  return items.some((item) => !item.value.trim().startsWith("["));
}
