"use client";

import React, { createContext, useContext, useState } from "react";

interface LeadFormContextType {
  preselectedMarket: string;
  setPreselectedMarket: (market: string) => void;
  preselectedScope: string;
  setPreselectedScope: (scope: string) => void;
  preselectedUnits: string;
  setPreselectedUnits: (units: string) => void;
  preselectedSource: "hero" | "contact" | "channel-partner";
  setPreselectedSource: (source: "hero" | "contact" | "channel-partner") => void;
  selectMarketAndScroll: (marketLabel: string) => void;
  selectScopeAndScroll: (scope: string, source?: "contact" | "channel-partner") => void;
  selectUnitsAndScroll: (unitsRange: string) => void;
}

const LeadFormContext = createContext<LeadFormContextType | undefined>(undefined);

export function LeadFormProvider({ children }: { children: React.ReactNode }) {
  const [preselectedMarket, setPreselectedMarket] = useState<string>("");
  const [preselectedScope, setPreselectedScope] = useState<string>("");
  const [preselectedUnits, setPreselectedUnits] = useState<string>("");
  const [preselectedSource, setPreselectedSource] = useState<
    "hero" | "contact" | "channel-partner"
  >("contact");

  const selectMarketAndScroll = (marketLabel: string) => {
    setPreselectedMarket(marketLabel);
    const contactEl = document.querySelector("#contact");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const selectScopeAndScroll = (
    scope: string,
    source: "contact" | "channel-partner" = "contact"
  ) => {
    setPreselectedScope(scope);
    setPreselectedSource(source);
    const contactEl = document.querySelector("#contact");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const selectUnitsAndScroll = (unitsRange: string) => {
    setPreselectedUnits(unitsRange);
    const contactEl = document.querySelector("#contact");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <LeadFormContext.Provider
      value={{
        preselectedMarket,
        setPreselectedMarket,
        preselectedScope,
        setPreselectedScope,
        preselectedUnits,
        setPreselectedUnits,
        preselectedSource,
        setPreselectedSource,
        selectMarketAndScroll,
        selectScopeAndScroll,
        selectUnitsAndScroll,
      }}
    >
      {children}
    </LeadFormContext.Provider>
  );
}

export function useLeadForm() {
  const context = useContext(LeadFormContext);
  if (!context) {
    throw new Error("useLeadForm must be used within a LeadFormProvider");
  }
  return context;
}
