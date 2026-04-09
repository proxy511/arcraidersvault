# 🎮 Game Vault

A personal gaming hub built with React + Vite. Currently features a full **ARC Raiders** field guide with plans to expand to additional games over time.

Live at: `your-url.vercel.app` ← update this after deploying

---

## What's Inside

### ARC Raiders Field Guide
A complete in-game reference covering:

- **Loot** — 100+ item database with Keep / Recycle / Sell decisions, exact quantities needed for every workshop upgrade and quest, and notes on why each item matters
- **Quests** — All 5 NPC quest chains (Shani, Celeste, Tian Wen, Apollo, Lance) with full walkthroughs: where to go, what to bring into the raid, step-by-step instructions, pro tips, and rewards
- **Workshop** — All 8 stations (Gunsmith, Gear Bench, Medical Lab, Explosives Station, Utility Station, Refiner, Scrappy, Workbench) with level-by-level material requirements and upgrade priority order
- **Enemies** — All 18 ARC types organized by tier with weak points, kill strategies, best ammo, exact drops, and pro tips

### Game Vault Home
- Personal notes section that saves to localStorage
- Game card dashboard with expandable guide entries
- `+ Add Game` slot for future guides

---

## Tech Stack

- [React 18](https://react.dev/)
- [Vite 5](https://vitejs.dev/)
- No external UI libraries — all styling is inline CSS with a custom dark tactical aesthetic

---

## Project Structure

```
game-vault/
├── index.html
├── vite.config.js
├── vercel.json
├── package.json
└── src/
    ├── main.jsx          # React entry point
    ├── App.jsx           # Home screen + routing
    └── games/
        └── ArcRaiders.jsx  # Full ARC Raiders guide
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Install & Run Locally

```bash
npm install
npm run dev
```

Then open `http://localhost:5173` in your browser.

### Build for Production

```bash
npm run build
```

Output goes to the `dist/` folder.

---

## Deploying Free

### Vercel (recommended)
1. Go to [vercel.com](https://vercel.com) and sign up free
2. Click **Add New Project**
3. Upload or connect this repo
4. Vercel auto-detects Vite — click **Deploy**
5. Done. You get a permanent URL in ~60 seconds

### Netlify
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the project folder or zip onto the page
3. Live URL in ~30 seconds

---

## Adding a New Game

1. Create `src/games/YourGame.jsx` — export a default React component
2. Open `src/App.jsx` and import it:
```js
import YourGameGuide from "./games/YourGame.jsx";
```
3. Add an entry to the `GAMES` array:
```js
{
  id: "your-game",
  title: "GAME NAME",
  subtitle: "Genre",
  color: "#yourcolor",
  accent: "#accentcolor",
  description: "What this guide covers",
  tags: ["Tag1", "Tag2"],
  component: YourGameGuide,
  lastUpdated: "Version / Patch",
}
```
4. Redeploy — done.

---

## Data & Privacy

All personal notes are saved to `localStorage` — private to your browser, never sent anywhere. No backend, no accounts, no tracking.

---

## Game Data Sources

ARC Raiders data sourced from:
- [ARC Raiders Wiki](https://arcraiders.wiki)
- Community guides (Steam, PC Gamer, GamesRadar, KeenGamer)
- Flashpoint Update patch notes

Data reflects the **Flashpoint Update** (March 2026). Some values may shift with future patches.

---

*Built for personal use. Not affiliated with Embark Studios.*
