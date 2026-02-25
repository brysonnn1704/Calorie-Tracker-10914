import React from "react";
import EntryRow from "./EntryRow";

export default function Entries({ entries, remove, total }) {
  if (entries.length === 0) return null;
  return (
    <div style={{ background: "#111118", border: "1px solid #1e1e2a", borderRadius: 12, overflow: "hidden" }}>
      <div style={{ padding: "16px 20px 12px", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "#555", borderBottom: "1px solid #1a1a22" }}>
        Today's Log
      </div>
      {[...entries].reverse().map((e, i) => (
        <EntryRow key={e.id} e={e} i={i} len={entries.length} onDelete={() => remove(e.id)} />
      ))}
      {entries.length > 1 && (
        <div style={{ padding: "12px 20px", borderTop: "1px solid #1a1a22", display: "flex", justifyContent: "space-between", fontSize: 11, color: "#555" }}>
          <span>Total · {entries.length} items</span>
          <span style={{ color: "#e8e0d4", fontFamily: "'Playfair Display', serif", fontSize: 15 }}>{total} kcal</span>
        </div>
      )}
    </div>
  );
}
