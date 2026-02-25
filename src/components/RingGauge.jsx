import React from "react";

export default function RingGauge({ total, pct, ringColor }) {
  const circumference = 2 * Math.PI * 54;
  const dash = circumference * (pct / 100);
  return (
    <svg className="ring-svg" width={132} height={132} viewBox="0 0 132 132">
      <circle cx="66" cy="66" r="54" fill="none" stroke="#1e1e2a" strokeWidth="10" />
      <circle
        cx="66"
        cy="66"
        r="54"
        fill="none"
        stroke={ringColor}
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={`${circumference}`}
        strokeDashoffset={circumference - dash}
        transform="rotate(-90 66 66)"
      />
    </svg>
  );
}
