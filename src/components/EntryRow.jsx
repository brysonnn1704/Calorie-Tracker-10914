import React from "react";

export default function EntryRow({ e, i, len, onDelete }) {
  return (
    <div
      className="entry-row"
      style={{
        display: "flex", alignItems: "center", padding: "12px 20px",
        borderBottom: i < len - 1 ? "1px solid #141420" : "none",
        background: "transparent",
      }}
    >
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, color: "#d8d0c4" }}>{e.name}</div>
        <div style={{ fontSize: 10, color: "#444", marginTop: 2 }}>{e.time}</div>
      </div>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, color: "#4ade80", marginRight: 12 }}>
        {e.cal}
      </div>
      <button
        className="del-btn"
        onClick={onDelete}
        style={{ background: "none", border: "none", color: "#f87171", cursor: "pointer", fontSize: 14, padding: "2px 4px" }}
      >✕</button>
    </div>
  );
}
