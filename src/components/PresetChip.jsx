import React from "react";

export default function PresetChip({ preset, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: "#0a0a0f", border: "1px solid #1e1e2a", borderRadius: 20,
        padding: "4px 10px", fontSize: 11, color: "#888", display: "flex", alignItems: "center", gap: 4, cursor: 'pointer'
      }}
      title={`${preset.name} · ${preset.cal} kcal`}
    >
      <span>{preset.emoji}</span>
      <span>{preset.name}</span>
      <span style={{ color: "#555" }}>·</span>
      <span style={{ color: "#4ade80" }}>{preset.cal}</span>
    </div>
  );
}
