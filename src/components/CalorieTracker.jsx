import React, { useState, useEffect } from "react";
import RingGauge from "./RingGauge";
import AddFood from "./AddFood";
import Entries from "./Entries";

const GOAL = 2000;

const PRESETS = [
  { name: "Oatmeal", cal: 150, emoji: "🥣" },
  { name: "Banana", cal: 89, emoji: "🍌" },
  { name: "Coffee", cal: 5, emoji: "☕" },
  { name: "Chicken Breast", cal: 165, emoji: "🍗" },
  { name: "Rice (1 cup)", cal: 206, emoji: "🍚" },
  { name: "Salad", cal: 120, emoji: "🥗" },
  { name: "Pizza Slice", cal: 285, emoji: "🍕" },
  { name: "Apple", cal: 95, emoji: "🍎" },
  { name: "Protein Shake", cal: 160, emoji: "🥤" },
  { name: "Burger", cal: 540, emoji: "🍔" },
  { name: "Pasta", cal: 320, emoji: "🍝" },
  { name: "Almonds (1oz)", cal: 164, emoji: "🥜" },
];

const getMacroColor = (pct) => {
  if (pct < 50) return "#4ade80";
  if (pct < 80) return "#facc15";
  if (pct < 100) return "#fb923c";
  return "#f87171";
};

const today = () => new Date().toISOString().split("T")[0];

export default function CalorieTracker() {
  const [entries, setEntries] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(`cal_${today()}`)) || [];
    } catch {
      return [];
    }
  });
  const [name, setName] = useState("");
  const [cal, setCal] = useState("");
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    localStorage.setItem(`cal_${today()}`, JSON.stringify(entries));
  }, [entries]);

  const total = entries.reduce((s, e) => s + e.cal, 0);
  const pct = Math.min((total / GOAL) * 100, 100);
  const remaining = GOAL - total;
  const ringColor = getMacroColor((total / GOAL) * 100);

  const add = (n, c) => {
    if (!n || !c || isNaN(c) || +c <= 0) return;
    setEntries((prev) => [...prev, { id: Date.now(), name: n, cal: +c, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);
    setName("");
    setCal("");
    setPulse(true);
    setTimeout(() => setPulse(false), 600);
  };

  const remove = (id) => setEntries((prev) => prev.filter((e) => e.id !== id));

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0f",
      fontFamily: "'Georgia', serif",
      color: "#e8e0d4",
      padding: "0",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}>
      <div className="tracker-root" style={{ width: "100%", maxWidth: 520, padding: "40px 20px 60px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: "#666", marginBottom: 6 }}>
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, letterSpacing: "-0.5px", color: "#f5f0e8" }}>
            Daily Intake
          </h1>
        </div>

        <div className={pulse ? "pulse" : ""} style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 36 }}>
          <RingGauge total={total} pct={pct} ringColor={ringColor} />
          <div style={{ marginTop: -82, marginBottom: 52, textAlign: "center", zIndex: 2 }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: ringColor, lineHeight: 1 }}>{total}</div>
            <div style={{ fontSize: 10, letterSpacing: "0.15em", color: "#555", textTransform: "uppercase", marginTop: 2 }}>kcal</div>
          </div>

          <div style={{ display: "flex", gap: 28, fontSize: 11, color: "#666", letterSpacing: "0.05em" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ color: "#e8e0d4", fontSize: 16, fontFamily: "'Playfair Display', serif" }}>{GOAL}</div>
              <div>goal</div>
            </div>
            <div style={{ width: 1, background: "#222" }} />
            <div style={{ textAlign: "center" }}>
              <div style={{ color: remaining >= 0 ? "#4ade80" : "#f87171", fontSize: 16, fontFamily: "'Playfair Display', serif" }}>
                {Math.abs(remaining)}
              </div>
              <div>{remaining >= 0 ? "remaining" : "over"}</div>
            </div>
            <div style={{ width: 1, background: "#222" }} />
            <div style={{ textAlign: "center" }}>
              <div style={{ color: "#e8e0d4", fontSize: 16, fontFamily: "'Playfair Display', serif" }}>{entries.length}</div>
              <div>entries</div>
            </div>
          </div>
        </div>

        <AddFood
          name={name}
          cal={cal}
          setName={setName}
          setCal={setCal}
          onAdd={add}
          presets={PRESETS}
        />

        <Entries entries={entries} remove={remove} total={total} />

        {entries.length === 0 && (
          <div style={{ textAlign: "center", color: "#333", fontSize: 12, letterSpacing: "0.1em", marginTop: 20, padding: 30 }}>
            — no entries yet —
          </div>
        )}
      </div>
    </div>
  );
}
