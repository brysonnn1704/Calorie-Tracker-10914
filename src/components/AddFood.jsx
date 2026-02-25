import React from "react";
import PresetChip from "./PresetChip";

export default function AddFood({ name, cal, setName, setCal, onAdd, presets }) {
  return (
    <div style={{ background: "#111118", border: "1px solid #1e1e2a", borderRadius: 12, padding: "20px", marginBottom: 20 }}>
      <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#555", marginBottom: 14 }}>Add Food</div>
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onAdd(name, cal)}
          placeholder="Food name"
          style={{
            flex: 2, background: "#0a0a0f", border: "1px solid #222", borderRadius: 8,
            padding: "10px 12px", color: "#e8e0d4", fontSize: 13, fontFamily: "'DM Mono', monospace",
          }}
        />
        <input
          value={cal}
          onChange={(e) => setCal(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onAdd(name, cal)}
          placeholder="kcal"
          type="number"
          style={{
            flex: 1, background: "#0a0a0f", border: "1px solid #222", borderRadius: 8,
            padding: "10px 12px", color: "#e8e0d4", fontSize: 13, fontFamily: "'DM Mono', monospace",
          }}
        />
        <button
          className="add-btn"
          onClick={() => onAdd(name, cal)}
          style={{
            background: "#1e1e2a", border: "1px solid #333", borderRadius: 8,
            color: "#e8e0d4", fontSize: 18, padding: "0 16px", cursor: "pointer",
          }}
        >+
        </button>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {presets.map((p) => (
          <PresetChip key={p.name} preset={p} onClick={() => onAdd(p.name, p.cal)} />
        ))}
      </div>
    </div>
  );
}
