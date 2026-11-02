import React from "react";

export function OrbBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {/* Top Left Gold/Navy Orb */}
      <div
        className="absolute -top-32 -left-32 w-[550px] h-[550px] rounded-full blur-[120px] opacity-[0.14] animate-orb-1"
        style={{
          background:
            "radial-gradient(circle, #d5b13a 0%, rgba(22,39,64,0.6) 70%, transparent 100%)",
          willChange: "transform",
        }}
      />

      {/* Center Right Navy/Gold Ambient Glow */}
      <div
        className="absolute top-[35%] -right-40 w-[650px] h-[650px] rounded-full blur-[140px] opacity-[0.12] animate-orb-2"
        style={{
          background:
            "radial-gradient(circle, #d5b13a 0%, rgba(22,39,64,0.8) 60%, transparent 100%)",
          willChange: "transform",
        }}
      />

      {/* Bottom Left Deep Navy/Gold Glow */}
      <div
        className="absolute bottom-20 left-10 w-[500px] h-[500px] rounded-full blur-[130px] opacity-[0.10] animate-orb-1"
        style={{
          background:
            "radial-gradient(circle, rgba(213,177,58,0.8) 0%, rgba(22,39,64,0.7) 65%, transparent 100%)",
          willChange: "transform",
        }}
      />
    </div>
  );
}
