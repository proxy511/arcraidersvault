import { useState } from "react";
import ArcRaidersGuide from "./games/ArcRaiders.jsx";

const C = {
  bg: "#060809", panel: "#0c1014", border: "#182028",
  cyan: "#00e5ff", green: "#a8ff3e", gold: "#ffd700",
  dim: "#3a5868", dimmer: "#1a2830",
  text: "#c8d8e0", textDim: "#6a8a94", textBright: "#e8f4f8",
};
const F = { fontFamily: "'Courier New', 'Lucida Console', monospace" };

const GAMES = [
  {
    id: "arc-raiders",
    title: "ARC RAIDERS",
    subtitle: "Extraction Shooter",
    color: "#00e5ff",
    accent: "#a8ff3e",
    description: "Complete field guide — 100+ item loot DB, quest walkthroughs, workshop upgrades",
    tags: ["Full Loot DB", "Quest Walkthroughs", "Workshop"],
    component: ArcRaidersGuide,
    lastUpdated: "Flashpoint Update",
  },
];

function useLocalStorage(key, defaultVal) {
  const [val, setVal] = useState(() => {
    try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : defaultVal; }
    catch { return defaultVal; }
  });
  const save = (v) => { setVal(v); try { localStorage.setItem(key, JSON.stringify(v)); } catch {} };
  return [val, save];
}

function HomeScreen({ onOpenGame, notes, setNotes }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(notes);

  return (
    <div style={{ ...F, background: C.bg, minHeight: "100vh", color: C.text }}>
      <div style={{ position: "fixed", inset: 0, backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,229,255,0.008) 2px,rgba(0,229,255,0.008) 4px)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto", padding: "24px 16px" }}>

        {/* Header */}
        <div style={{ marginBottom: 30 }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
            <div>
              <div style={{ fontSize: 9, letterSpacing: 6, color: `${C.cyan}77`, marginBottom: 6 }}>PERSONAL GAMING HUB</div>
              <h1 style={{ fontSize: 26, fontWeight: 900, letterSpacing: 4, color: C.textBright, textTransform: "uppercase", margin: 0 }}>GAME VAULT</h1>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 9, letterSpacing: 3, color: C.dim }}>{GAMES.length} GUIDE{GAMES.length !== 1 ? "S" : ""} LOADED</div>
              <div style={{ fontSize: 9, letterSpacing: 2, color: C.dimmer, marginTop: 2 }}>LOCAL · PRIVATE</div>
            </div>
          </div>
          <div style={{ height: 1, background: `linear-gradient(90deg, ${C.cyan}44, transparent)`, marginTop: 14 }} />
        </div>

        {/* Games grid */}
        <div style={{ marginBottom: 30 }}>
          <div style={{ fontSize: 9, letterSpacing: 4, color: C.dim, marginBottom: 12 }}>MY GAMES</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 10 }}>
            {GAMES.map(game => (
              <div key={game.id} onClick={() => onOpenGame(game.id)}
                style={{ background: C.panel, border: `1px solid ${game.color}44`, borderTop: `2px solid ${game.color}`, padding: "16px", cursor: "pointer", position: "relative", overflow: "hidden" }}
                onMouseEnter={e => { e.currentTarget.style.background = `${game.color}08`; e.currentTarget.style.borderColor = `${game.color}88`; }}
                onMouseLeave={e => { e.currentTarget.style.background = C.panel; e.currentTarget.style.borderColor = `${game.color}44`; }}>
                <div style={{ position: "absolute", top: 0, right: 0, width: 60, height: 60, background: `radial-gradient(circle at top right, ${game.color}15, transparent)`, pointerEvents: "none" }} />
                <div style={{ fontSize: 9, letterSpacing: 3, color: game.color, marginBottom: 5 }}>{game.subtitle.toUpperCase()}</div>
                <div style={{ fontSize: 15, fontWeight: 900, letterSpacing: 2, color: C.textBright, marginBottom: 7 }}>{game.title}</div>
                <div style={{ fontSize: 10, color: C.textDim, marginBottom: 12, lineHeight: 1.6 }}>{game.description}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 12 }}>
                  {game.tags.map(tag => (
                    <span key={tag} style={{ fontSize: 8, letterSpacing: 2, color: game.accent, background: `${game.accent}10`, border: `1px solid ${game.accent}33`, padding: "2px 6px" }}>{tag}</span>
                  ))}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 9, color: C.dim }}>{game.lastUpdated}</span>
                  <span style={{ fontSize: 10, color: game.color, letterSpacing: 2 }}>OPEN →</span>
                </div>
              </div>
            ))}

            {/* Add Game slot */}
            <div style={{ background: "transparent", border: `1px dashed ${C.border}`, padding: "16px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 170, opacity: 0.4 }}>
              <div style={{ fontSize: 22, marginBottom: 8, color: C.dim }}>+</div>
              <div style={{ fontSize: 10, color: C.dim, letterSpacing: 3 }}>ADD GAME</div>
              <div style={{ fontSize: 9, color: C.dimmer, marginTop: 5, textAlign: "center", lineHeight: 1.6 }}>Drop in a new guide</div>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <div style={{ fontSize: 9, letterSpacing: 4, color: C.dim }}>PERSONAL NOTES</div>
            {!editing ? (
              <button onClick={() => { setDraft(notes); setEditing(true); }} style={{ fontSize: 9, letterSpacing: 2, color: C.cyan, background: "transparent", border: `1px solid ${C.cyan}44`, padding: "3px 10px", cursor: "pointer", ...F }}>EDIT</button>
            ) : (
              <div style={{ display: "flex", gap: 6 }}>
                <button onClick={() => { setNotes(draft); setEditing(false); }} style={{ fontSize: 9, letterSpacing: 2, color: C.green, background: "transparent", border: `1px solid ${C.green}44`, padding: "3px 10px", cursor: "pointer", ...F }}>SAVE</button>
                <button onClick={() => setEditing(false)} style={{ fontSize: 9, letterSpacing: 2, color: C.dim, background: "transparent", border: `1px solid ${C.border}`, padding: "3px 10px", cursor: "pointer", ...F }}>CANCEL</button>
              </div>
            )}
          </div>
          {editing ? (
            <textarea value={draft} onChange={e => setDraft(e.target.value)}
              placeholder="Add your own notes here — builds, strategies, reminders..."
              style={{ width: "100%", boxSizing: "border-box", background: "#0c1014", border: `1px solid ${C.cyan}44`, borderLeft: `2px solid ${C.cyan}66`, color: C.text, padding: "10px", fontSize: 11, lineHeight: 1.7, outline: "none", resize: "vertical", minHeight: 100, ...F }} />
          ) : (
            <div style={{ background: C.panel, border: `1px solid ${C.border}`, borderLeft: `2px solid ${C.cyan}33`, padding: "10px", minHeight: 70, fontSize: 11, color: notes ? C.text : C.dim, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
              {notes || "No notes yet. Hit EDIT to add anything you want to remember."}
            </div>
          )}
          <div style={{ fontSize: 8, color: C.dimmer, marginTop: 4, letterSpacing: 1 }}>Saved locally to this device</div>
        </div>

        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 12, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 6 }}>
          <span style={{ fontSize: 9, color: C.dimmer, letterSpacing: 2 }}>GAME VAULT · PERSONAL USE</span>
          <span style={{ fontSize: 9, color: C.dimmer, letterSpacing: 2 }}>DATA STORED LOCALLY</span>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [currentGame, setCurrentGame] = useState(null);
  const [notes, setNotes] = useLocalStorage("gamevault-notes", "");
  const activeGame = GAMES.find(g => g.id === currentGame);

  return (
    <div>
      {currentGame && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "#060809ee", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 12, padding: "9px 16px", backdropFilter: "blur(4px)", ...F }}>
          <button onClick={() => setCurrentGame(null)}
            style={{ background: "transparent", border: `1px solid ${C.border}`, color: C.dim, fontSize: 10, letterSpacing: 3, padding: "5px 12px", cursor: "pointer", ...F }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = C.cyan; e.currentTarget.style.color = C.cyan; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.dim; }}>
            ← VAULT
          </button>
          <div style={{ width: 1, height: 16, background: C.border }} />
          <span style={{ fontSize: 10, color: activeGame?.color || C.cyan, letterSpacing: 3, fontWeight: 700 }}>{activeGame?.title}</span>
        </div>
      )}
      <div style={{ paddingTop: currentGame ? 43 : 0 }}>
        {!currentGame
          ? <HomeScreen onOpenGame={setCurrentGame} notes={notes} setNotes={setNotes} />
          : activeGame ? <activeGame.component /> : <HomeScreen onOpenGame={setCurrentGame} notes={notes} setNotes={setNotes} />
        }
      </div>
    </div>
  );
}
