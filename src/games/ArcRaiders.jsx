import { useState } from "react";

const C = {
  bg:"#080b0d",panel:"#0c1014",border:"#182028",borderBright:"#1e3040",
  cyan:"#00e5ff",green:"#a8ff3e",gold:"#ffd700",red:"#ff6b6b",
  orange:"#ff6b35",purple:"#c77dff",blue:"#56cfe1",teal:"#2dd4bf",
  dim:"#3a5868",dimmer:"#1e2e38",text:"#c8d8e0",textDim:"#6a8a94",textBright:"#e8f4f8",
};
const F = { fontFamily:"'Courier New','Lucida Console',monospace" };

// ─── COMPLETE LOOT DATABASE ───────────────────────────────────────────────────
const ALL_ITEMS = [
  // KEEP: Workshop & Quest
  { name:"ARC Alloy", rarity:"Uncommon", cat:"ARC Material", decision:"keep", qty:"21×", note:"Explosives Stn 1 (6×), Medical Lab 1 (6×), Utility Stn 1 (6×), Clearer Skies quest (3×). Expedition projects need 80× each." },
  { name:"ARC Circuitry", rarity:"Rare", cat:"ARC Material", decision:"keep", qty:"10×", note:"Refiner 3 (10×)." },
  { name:"ARC Motion Core", rarity:"Rare", cat:"ARC Material", decision:"keep", qty:"5×", note:"Refiner 2 (5×)." },
  { name:"ARC Powercell", rarity:"Common", cat:"ARC Material", decision:"keep", qty:"5×", note:"Refiner 1 (5×). Keep extra for shield recharger crafting." },
  { name:"Advanced ARC Powercell", rarity:"Rare", cat:"ARC Material", decision:"keep", qty:"15×", note:"High-Gain Antenna project (15×). Used in late-game shield crafting." },
  { name:"Advanced Electrical Components", rarity:"Rare", cat:"Refined Material", decision:"keep", qty:"5×", note:"Gear Bench 3 (5×), Utility Station 3 (5×). All 3 Expedition projects need these too." },
  { name:"Advanced Mechanical Components", rarity:"Rare", cat:"Refined Material", decision:"keep", qty:"5×", note:"Gunsmith 3 (5×). Also from recycling Microscope or Mini Centrifuge." },
  { name:"Antiseptic", rarity:"Rare", cat:"Medical", decision:"keep", qty:"10×", note:"Medical Lab 3 (8×), Doctor's Orders quest (2×). Farm Buried City pharmacies." },
  { name:"Bastion Cell", rarity:"Epic", cat:"Boss Drop", decision:"keep", qty:"6×", note:"Gear Bench 3 (6×), Trophy Display project (5×). Drops from Bastion ARC." },
  { name:"Battery", rarity:"Uncommon", cat:"Topside Material", decision:"keep", qty:"30×", note:"Expedition projects (30×/30×/25×). Quests: After Rain (2×), Clamoring for Attention (1×), Trash Into Treasure (1×)." },
  { name:"Bombardier Cell", rarity:"Epic", cat:"Boss Drop", decision:"keep", qty:"6×", note:"Refiner 3 (6×). Drops from Bombardier ARC." },
  { name:"Chemicals", rarity:"Common", cat:"Basic Material", decision:"keep", qty:"50×", note:"Explosives Station 1 (50×). Common from household containers." },
  { name:"Complex Gun Parts", rarity:"Rare", cat:"Gun Parts", decision:"keep", qty:"keep until Gunsmith maxed", note:"Endgame weapon crafting. Keep until Gunsmith L3 complete." },
  { name:"Cracked Bioscanner", rarity:"Uncommon", cat:"Tech", decision:"keep", qty:"2×", note:"Medical Lab 2 (2×)." },
  { name:"Crude Explosives", rarity:"Common", cat:"Explosive", decision:"keep", qty:"5×", note:"Explosives Station 2 (5×). Also used in low-tier grenade crafting." },
  { name:"Durable Cloth", rarity:"Uncommon", cat:"Textile", decision:"keep", qty:"6×", note:"Medical Lab 2 (5×), Doctor's Orders quest (1×)." },
  { name:"Electrical Components", rarity:"Uncommon", cat:"Electronics", decision:"keep", qty:"10×", note:"Gear Bench 2 (5×), Utility Station 2 (5×). Farm Spaceport and industrial POIs." },
  { name:"Explosive Compound", rarity:"Uncommon", cat:"Explosive", decision:"keep", qty:"5×", note:"Explosives Station 3 (5×)." },
  { name:"Fabric", rarity:"Common", cat:"Textile", decision:"keep", qty:"80×", note:"Gear Bench 1 (30×), Medical Lab 1 (50×). Very common in residential areas." },
  { name:"Fireball Burner", rarity:"Rare", cat:"ARC Drop", decision:"keep", qty:"8×", note:"Refiner 2 (8×). Drops from Fireball ARC." },
  { name:"Fried Motherboard", rarity:"Rare", cat:"Electronics", decision:"keep", qty:"3×", note:"Utility Station 3 (3×). Recycle excess for Electrical Components." },
  { name:"Heavy Gun Parts", rarity:"Uncommon", cat:"Gun Parts", decision:"keep", qty:"stock", note:"Heavy weapons and launcher builds." },
  { name:"Hornet Driver", rarity:"Rare", cat:"ARC Drop", decision:"keep", qty:"7×", note:"Gear Bench 2 (5×), The Trifecta quest (2×). Target Hornet ARC back thrusters." },
  { name:"Industrial Battery", rarity:"Rare", cat:"Tech", decision:"keep", qty:"3×", note:"Gear Bench 3 (3×). Rare — never discard." },
  { name:"Laboratory Reagents", rarity:"Rare", cat:"Medical", decision:"keep", qty:"3×", note:"Explosives Station 3 (3×). Rare — grab on sight." },
  { name:"Leaper Pulse Unit", rarity:"Epic", cat:"ARC Drop", decision:"keep", qty:"5×", note:"Utility Station 3 (4×) + quest (1×). Total needed: 8×. Drops from Leaper ARC." },
  { name:"Light Gun Parts", rarity:"Common", cat:"Gun Parts", decision:"keep", qty:"stock", note:"SMGs, pistols, lightweight weapons." },
  { name:"Mechanical Components", rarity:"Uncommon", cat:"Mechanical", decision:"keep", qty:"5×", note:"Gunsmith 2 (5×). Farm Dam Battlegrounds industrial zones." },
  { name:"Medium Gun Parts", rarity:"Common", cat:"Gun Parts", decision:"keep", qty:"stock", note:"Rifles, carbines, mid-range weapons." },
  { name:"Metal Parts", rarity:"Common", cat:"Basic Material", decision:"keep", qty:"80×", note:"Gunsmith 1 (20×), Refiner 1 (60×). Recycle scrap metal items for more." },
  { name:"Mod Components", rarity:"Uncommon", cat:"Crafting", decision:"keep", qty:"stock", note:"Weapon mods, attachments, upgrade modules." },
  { name:"Motor", rarity:"Rare", cat:"Mechanical", decision:"keep", qty:"3×", note:"Refiner 3 (3×). Rare — never discard." },
  { name:"Plastic Parts", rarity:"Common", cat:"Basic Material", decision:"keep", qty:"75×", note:"Gear Bench 1 (25×), Utility Station 1 (50×). Common from all household containers." },
  { name:"Pop Trigger", rarity:"Uncommon", cat:"Explosive", decision:"keep", qty:"5×", note:"Explosives Station 2 (5×)." },
  { name:"Power Cable", rarity:"Uncommon", cat:"Electronics", decision:"keep", qty:"3×", note:"Gear Bench 2 (3×). Find in Electrical, Residential, Commercial POIs." },
  { name:"Processor", rarity:"Uncommon", cat:"Electronics", decision:"keep", qty:"stock", note:"Scanners and advanced tech components. Farm via Alarm Clock recycling." },
  { name:"Rocketeer Driver", rarity:"Rare", cat:"ARC Drop", decision:"keep", qty:"4×", note:"Explosives Station 3 (3×), Out of the Shadows quest (1×). Drops from Rocketeer ARC." },
  { name:"Rubber Parts", rarity:"Common", cat:"Basic Material", decision:"keep", qty:"30×", note:"Gunsmith 1 (30×). Common from household/industrial containers." },
  { name:"Rusted Gear", rarity:"Uncommon", cat:"Mechanical", decision:"keep", qty:"3×", note:"Gunsmith 3 (3×). Rare enough — don't sell." },
  { name:"Rusted Shut Medical Kit", rarity:"Rare", cat:"Medical", decision:"keep", qty:"3×", note:"Medical Lab 3 (3×). Rare — grab on sight." },
  { name:"Rusted Tools", rarity:"Common", cat:"Mechanical", decision:"keep", qty:"3×", note:"Gunsmith 2 (3×). Recycle overflow for Metal Parts." },
  { name:"Sensors", rarity:"Uncommon", cat:"Electronics", decision:"keep", qty:"stock", note:"Tracking devices, advanced electronics. Farm via Broken Handheld Radio recycling." },
  { name:"Sentinel Firing Core", rarity:"Epic", cat:"ARC Drop", decision:"keep", qty:"4×", note:"Gunsmith 3 (4×). Drops from Sentinel ARC — tough fight, farm in pairs." },
  { name:"Simple Gun Parts", rarity:"Common", cat:"Gun Parts", decision:"keep", qty:"stock", note:"Basic weapons and low-tier weapon repairs." },
  { name:"Snitch Scanner", rarity:"Rare", cat:"ARC Drop", decision:"keep", qty:"8×", note:"Utility Station 2 (6×), The Trifecta quest (2×). Drops from Snitch ARC." },
  { name:"Surveyor Vault", rarity:"Epic", cat:"ARC Drop", decision:"keep", qty:"6×", note:"Medical Lab 3 (5×), Mixed Signals quest (1×). Drops from ARC Surveyor." },
  { name:"Synthesized Fuel", rarity:"Uncommon", cat:"Explosive", decision:"keep", qty:"3×", note:"Explosives Station 2 (3×)." },
  { name:"Tick Pod", rarity:"Uncommon", cat:"Medical", decision:"keep", qty:"8×", note:"Medical Lab 2 (8×)." },
  { name:"Toaster", rarity:"Common", cat:"Recyclable", decision:"keep", qty:"3×", note:"Refiner 2 (3×). Recycle overflow for Metal/Plastic Parts." },
  { name:"Utility Station Components", rarity:"Rare", cat:"Crafting", decision:"keep", qty:"5×", note:"Utility Station 3 (5×)." },
  { name:"Wasp Driver", rarity:"Rare", cat:"ARC Drop", decision:"keep", qty:"10×", note:"Gunsmith 1 (8×), The Trifecta quest (2×). Drops from Wasp ARC." },
  { name:"Wires", rarity:"Uncommon", cat:"Electronics", decision:"keep", qty:"stock", note:"Right Tool quest (6×), After Rain (2×), Eyes on the Prize (3×). Safe-pocket when carrying quest amount." },
  // Blueprints
  { name:"Any Weapon Blueprint", rarity:"Epic", cat:"Blueprint", decision:"keep", qty:"ALL", note:"NEVER recycle. Required to craft weapons. Store every one." },
  { name:"Vulcano Blueprint", rarity:"Epic", cat:"Blueprint", decision:"keep", qty:"ALL", note:"Hidden Bunker only drop." },
  { name:"Bobcat Blueprint", rarity:"Epic", cat:"Blueprint", decision:"keep", qty:"ALL", note:"Closed Gate only drop." },
  { name:"Tempest Blueprint", rarity:"Epic", cat:"Blueprint", decision:"keep", qty:"ALL", note:"Night map versions only." },
  { name:"Equalizer Blueprint", rarity:"Epic", cat:"Blueprint", decision:"keep", qty:"ALL", note:"Harvester Event reward." },
  { name:"Jupiter Blueprint", rarity:"Epic", cat:"Blueprint", decision:"keep", qty:"ALL", note:"Harvester Event reward." },
  { name:"Aphelion Blueprint", rarity:"Epic", cat:"Blueprint", decision:"keep", qty:"ALL", note:"Stella Montis random drop." },
  // Boss / endgame
  { name:"Matriarch Reactor", rarity:"Legendary", cat:"Boss Drop", decision:"keep", qty:"ALL", note:"Top-end weapons (Aphelion, Equalizer). NEVER sell." },
  { name:"Queen Reactor", rarity:"Legendary", cat:"Boss Drop", decision:"keep", qty:"ALL", note:"Top-end weapons. Also drops from Queen leg armor wreck." },
  { name:"Power Rod", rarity:"Epic", cat:"Endgame", decision:"keep", qty:"ALL", note:"S-tier endgame crafting material. Never sell." },
  { name:"Magnetic Accelerator", rarity:"Epic", cat:"Endgame", decision:"keep", qty:"ALL", note:"S-tier endgame crafting + late-game weapons." },
  { name:"Exodus Modules", rarity:"Epic", cat:"Endgame", decision:"keep", qty:"ALL", note:"Late-game gear and special device crafting." },
  { name:"Assessor Matrix", rarity:"Epic", cat:"Project", decision:"keep", qty:"18×", note:"High-Gain Antenna project (18×). Drops from Assessor ARC." },
  { name:"Any Key", rarity:"Varies", cat:"Key", decision:"keep", qty:"ALL", note:"ALWAYS safe-slot. Every key opens a room with rare loot. Never discard." },
  // Project materials
  { name:"ARC Thermo Lining", rarity:"Rare", cat:"ARC Material", decision:"keep", qty:"15×", note:"High-Gain Antenna project (15×). Recycle extras into 16× Fabric." },
  { name:"ARC Performance Steel", rarity:"Rare", cat:"ARC Material", decision:"keep", qty:"10×", note:"High-Gain Antenna (10×), Trophy Display (10×). Recycle extras into 12× Metal Parts." },
  { name:"ARC Synthetic Resin", rarity:"Rare", cat:"ARC Material", decision:"keep", qty:"20×", note:"High-Gain Antenna (20×), Trophy Display (10×). Recycle extras into 14× Plastic Parts." },
  { name:"ARC Flex Rubber", rarity:"Rare", cat:"ARC Material", decision:"keep", qty:"10×", note:"High-Gain Antenna (10×). Recycle extras into 16× Rubber Parts." },
  { name:"ARC Coolant", rarity:"Rare", cat:"ARC Material", decision:"keep", qty:"15×", note:"High-Gain Antenna (15×). Recycle extras into 16× Chemicals." },

  // KEEP: Scrappy
  { name:"Apricot", rarity:"Uncommon", cat:"Nature", decision:"keep-scrappy", qty:"15×", note:"Scrappy L3 (3×) + L5 (12×). Sell for ~1,000 coins each after Scrappy maxed." },
  { name:"Lemon", rarity:"Uncommon", cat:"Nature", decision:"keep-scrappy", qty:"3×", note:"Scrappy L3 (3×). Sell after Scrappy maxed." },
  { name:"Prickly Pear", rarity:"Uncommon", cat:"Nature", decision:"keep-scrappy", qty:"6×", note:"Scrappy L4 (6×). Sell after Scrappy maxed." },
  { name:"Olives", rarity:"Uncommon", cat:"Nature", decision:"keep-scrappy", qty:"6×", note:"Scrappy L4 (6×). Sell after Scrappy maxed." },
  { name:"Mushroom", rarity:"Common", cat:"Nature", decision:"keep-scrappy", qty:"12×", note:"Scrappy L5 (12×). Sell after Scrappy maxed." },
  { name:"Dog Collar", rarity:"Uncommon", cat:"Residential", decision:"keep-scrappy", qty:"1×", note:"Scrappy L2 (1×). Sell after upgrade." },
  { name:"Cat Bed", rarity:"Uncommon", cat:"Residential", decision:"keep-scrappy", qty:"1×", note:"Scrappy L4 (1×). Sell after upgrade." },
  { name:"Very Comfortable Pillow", rarity:"Uncommon", cat:"Residential", decision:"keep-scrappy", qty:"3×", note:"Scrappy L5 (3×). Sell after upgrade." },
  { name:"Agave", rarity:"Uncommon", cat:"Nature", decision:"keep-scrappy", qty:"stock", note:"Recycles into 3× Assorted Seeds. Sell if Scrappy maxed." },
  { name:"Assorted Seeds", rarity:"Common", cat:"Nature", decision:"keep-scrappy", qty:"stock", note:"Scrappy upgrade fuel. Keep until Scrappy maxed." },
  { name:"Roots", rarity:"Common", cat:"Nature", decision:"keep-scrappy", qty:"stock", note:"Scrappy upgrade material. Sell after maxed." },

  // RECYCLE
  { name:"Damaged Heat Sink", rarity:"Uncommon", cat:"Electronics", decision:"recycle", qty:"–", note:"→ Wires + Metal Parts. Good Wires source." },
  { name:"Alarm Clock", rarity:"Rare", cat:"Recyclable", decision:"recycle", qty:"–", note:"→ 1× Processor + 6× Plastic Parts. Best Processor source." },
  { name:"Broken Handheld Radio", rarity:"Rare", cat:"Electronics", decision:"recycle", qty:"–", note:"→ 2× Wires + 3× Sensors. Best Sensors source." },
  { name:"Fossilized Lightning", rarity:"Rare", cat:"Recyclable", decision:"recycle", qty:"–", note:"→ Explosive Compounds. Good for explosives crafting." },
  { name:"Industrial Magnet", rarity:"Uncommon", cat:"Mechanical", decision:"recycle", qty:"–", note:"→ Magnets. Only reliable Magnet source for medical crafting." },
  { name:"Microscope", rarity:"Rare", cat:"Recyclable", decision:"recycle", qty:"–", note:"→ Advanced Mechanical Components. Better to recycle than sell." },
  { name:"Mini Centrifuge", rarity:"Rare", cat:"Recyclable", decision:"recycle", qty:"–", note:"→ Advanced Mechanical Components." },
  { name:"Spectrometer", rarity:"Rare", cat:"Recyclable", decision:"recycle", qty:"–", note:"→ Advanced Electrical Components + Sensors. Recycle beats selling." },
  { name:"Frequency Modulation Box", rarity:"Rare", cat:"Recyclable", decision:"recycle", qty:"–", note:"→ Advanced Electrical Components + Speaker Component." },
  { name:"Ripped Safety Vest", rarity:"Uncommon", cat:"Textile", decision:"recycle", qty:"–", note:"→ Durable Cloth + Magnet. Good Durable Cloth source." },
  { name:"Burned ARC Circuitry", rarity:"Uncommon", cat:"ARC Material", decision:"recycle", qty:"–", note:"→ 2× ARC Alloy." },
  { name:"Camera Lens", rarity:"Uncommon", cat:"Recyclable", decision:"recycle", qty:"–", note:"→ 8× Plastic Parts. Keep 3× for Weather Monitor project first." },
  { name:"Broken Flashlight", rarity:"Rare", cat:"Recyclable", decision:"recycle", qty:"–", note:"→ 2× Battery + 6× Metal Parts." },
  { name:"Broken Taser", rarity:"Rare", cat:"Recyclable", decision:"recycle", qty:"–", note:"→ 2× Battery + 2× Wires." },
  { name:"Broken Guidance System", rarity:"Rare", cat:"Recyclable", decision:"recycle", qty:"–", note:"→ 4× Processor. Keep 1× for Expedition 3 project." },
  { name:"Candle Holder", rarity:"Uncommon", cat:"Recyclable", decision:"recycle", qty:"–", note:"→ 8× Metal Parts." },
  { name:"Ruined Accordion", rarity:"Uncommon", cat:"Recyclable", decision:"recycle", qty:"–", note:"→ 3× Steel Springs. Best Steel Spring source in the game." },
  { name:"Bicycle Pump", rarity:"Rare", cat:"Recyclable", decision:"recycle", qty:"–", note:"→ 10× Metal Parts + 4× Canister. Keep 1× for The League quest." },
  { name:"Damaged ARC Motion Core", rarity:"Uncommon", cat:"ARC Material", decision:"recycle", qty:"–", note:"→ ARC Alloy + Metal Parts." },
  { name:"Damaged ARC Powercell", rarity:"Uncommon", cat:"ARC Material", decision:"recycle", qty:"–", note:"→ Metal Parts + Rubber Parts." },
  { name:"Damaged Rocketeer Driver", rarity:"Uncommon", cat:"ARC Material", decision:"recycle", qty:"–", note:"→ Metal Parts + ARC Alloy basics." },
  { name:"Canister", rarity:"Common", cat:"Recyclable", decision:"recycle", qty:"–", note:"→ Basic materials." },

  // SELL: Trinkets
  { name:"Acoustic Guitar", rarity:"Legendary", cat:"Trinket", decision:"sell", qty:"–", note:"7,000 coins. No crafting use." },
  { name:"Breathtaking Snow Globe", rarity:"Epic", cat:"Trinket", decision:"sell", qty:"–", note:"7,000 coins. Keep 3× for Expedition 3 first, sell extras." },
  { name:"Lance's Mixtape (5th Edition)", rarity:"Epic", cat:"Trinket", decision:"sell", qty:"–", note:"5,000+ coins. Sell unless needed for a quest." },
  { name:"Silver Teaspoon Set", rarity:"Rare", cat:"Trinket", decision:"sell", qty:"–", note:"3,000–5,000 coins." },
  { name:"Statuette", rarity:"Rare", cat:"Trinket", decision:"sell", qty:"–", note:"3,000–5,000 coins." },
  { name:"Microscope (after recycling need met)", rarity:"Rare", cat:"Trinket", decision:"sell", qty:"–", note:"1,000 coins — but RECYCLE first if you need Advanced Mech Components." },
  { name:"Music Album", rarity:"Rare", cat:"Trinket", decision:"sell", qty:"–", note:"3,000–5,000 coins." },
  { name:"Air Freshener", rarity:"Uncommon", cat:"Trinket", decision:"sell", qty:"–", note:"2,000 coins. No crafting use." },
  { name:"Alien Duck", rarity:"Uncommon", cat:"Trinket", decision:"sell", qty:"–", note:"1,000 coins. No crafting use." },
  { name:"Bloated Tuna Can", rarity:"Common", cat:"Trinket", decision:"sell", qty:"–", note:"1,000 coins. No crafting use." },
  { name:"Burnt-Out Candles", rarity:"Common", cat:"Trinket", decision:"sell", qty:"–", note:"640 coins. No crafting use." },
  { name:"Agave Juice", rarity:"Common", cat:"Trinket", decision:"sell", qty:"–", note:"1,800 coins. Cannot be recycled." },
  { name:"Angled Grip III", rarity:"Rare", cat:"Mod", decision:"sell", qty:"–", note:"5,000 coins. Sell if you don't use it." },
  { name:"Angled Grip II", rarity:"Uncommon", cat:"Mod", decision:"sell", qty:"–", note:"2,000 coins. Sell overflow." },
  { name:"Angled Grip I", rarity:"Common", cat:"Mod", decision:"sell", qty:"–", note:"640 coins. Sell or recycle for Plastic Parts." },
  { name:"Duplicate learned blueprints", rarity:"Epic", cat:"Overflow", decision:"sell", qty:"–", note:"No use once learned." },
  { name:"Spare low-tier gear", rarity:"Common", cat:"Overflow", decision:"sell", qty:"–", note:"Sell excess weapons/shields once you have better." },
  { name:"Overflow basic materials", rarity:"Common", cat:"Overflow", decision:"sell", qty:"–", note:"Metal/Plastic/Rubber once all upgrades covered." },
  { name:"Fruits (after Scrappy maxed)", rarity:"Uncommon", cat:"Nature", decision:"sell", qty:"–", note:"~1,000 coins each after Scrappy fully upgraded." },
  { name:"Bandage", rarity:"Common", cat:"Quick Use", decision:"sell", qty:"–", note:"250 coins. Sell overflow — very common." },
  { name:"Adrenaline Shot", rarity:"Common", cat:"Quick Use", decision:"sell", qty:"–", note:"300 coins. Sell overflow." },
  { name:"Blue Light Stick", rarity:"Common", cat:"Quick Use", decision:"sell", qty:"–", note:"150 coins. Sell." },
  { name:"Barricade Kit", rarity:"Uncommon", cat:"Quick Use", decision:"sell", qty:"–", note:"640 coins. Sell overflow stacks." },
];

// ─── QUEST DATA ───────────────────────────────────────────────────────────────
const questData = {
  Shani: {
    color:"#00e5ff", role:"Head of Security",
    focus:"Combat & utility — weapons, shields, keys",
    quests:[
      { num:1, name:"Picking Up the Pieces", map:"Any (best: Dam Battlegrounds)",
        obj:"Loot 3 containers in any POI with a loot-category icon",
        where:"Best early spot: Hydroponic Dome Complex, Dam Battlegrounds. Any map area marked with a loot icon counts.",
        bring:"Nothing special",
        steps:["Drop into any map","Find a POI with a loot icon on the minimap","Open 3 containers (lockers, crates, drawers)","Extract"],
        tip:"Hit 3 lockers fast then straight to extract. No hero fights.",
        reward:"Rattler III, 80 Medium Ammo" },
      { num:2, name:"Clearer Skies", map:"Any",
        obj:"Destroy 3 ARC enemies and collect 3 ARC Alloy",
        where:"Dam mid lanes are easiest. ARC Alloy drops from most ARC bodies or nearby ARC containers.",
        bring:"Decent weapon and basic armor",
        steps:["Kill 3 ARC enemies on any map","Loot ARC Alloy from their bodies or nearby containers","Extract with 3 ARC Alloy"],
        tip:"Alloy drops from nearly every ARC — kill 3 and check the ground.",
        reward:"3 Sterilized Bandages, Light Shield, Black Backpack Cosmetic" },
      { num:3, name:"Trash Into Treasure", map:"Dam Battlegrounds",
        obj:"Collect 6 Wires and 1 Battery",
        where:"Research and Administration Building, Dam Battlegrounds. Wires: server racks, maintenance shelves, side closets. Battery: floor-level shelves — it hides low.",
        bring:"Nothing — all items found on map",
        steps:["Drop into Dam Battlegrounds","Head to Research and Administration Building","Sweep server racks and shelves for Wires","Check floor-level closets for the Battery","Extract with 6 Wires + 1 Battery"],
        tip:"Wires are everywhere in R&A. The Battery is the slow find — check every low shelf.",
        reward:"Tactical MK.1, 3 Adrenaline Shots" },
      { num:4, name:"Off the Radar", map:"Dam / Spaceport / Buried City",
        obj:"In one round: visit a Field Depot and repair the rooftop antenna",
        where:"Field Depots are marked icons on the map. Antenna is on the roof — interact to repair.",
        bring:"Smoke grenades (buy from Apollo)",
        steps:["Drop into any main map","Locate the Field Depot on minimap","Go to the roof","Throw smoke for cover","Interact with the antenna","Extract"],
        tip:"Roof is exposed. Smoke first, repair second. Don't stand still during the animation.",
        reward:"2 Defibrillators" },
      { num:5, name:"Hatch Repairs", map:"Any",
        obj:"Fix leaking hydraulic pipes at a Raider Hatch, then find the Hatch Key nearby",
        where:"Raider Hatches are on the map. Pipe interact points are on the hatch frame edges — do a slow circle to find all of them. Hatch Key spawns in a small radius nearby.",
        bring:"Nothing special",
        steps:["Find a Raider Hatch on minimap","Walk a slow full circle around the hatch frame to find pipe interact points","Fix all leaks","Search nearby for the Hatch Key","Extract"],
        tip:"Pipe points are on the frame edges. Slow circle is the move — rushing means missing one.",
        reward:"Raider Hatch Key, Binoculars" },
      { num:6, name:"Down to Earth", map:"Any",
        obj:"In one round: visit a Field Depot, deliver a Field Crate, claim the drop reward",
        where:"Field Depots on any main map. Field Crates spawn inside or around the depot area.",
        bring:"Nothing — items at depot",
        steps:["Find a Field Depot","Pick up a Field Crate from the depot area","Deliver crate at the marked drop point","Claim the reward drop","Extract"],
        tip:"Do depot objectives first, then claim the drop. Looting everything else first = dying before extract.",
        reward:"Combat MK.1, Medium Shield" },
      { num:7, name:"The Trifecta", map:"Dam Battlegrounds (best)",
        obj:"Kill a Hornet, Snitch, and Wasp ARC. Bring back their driver parts.",
        where:"Testing Annex Building, Dam Battlegrounds — all 3 types patrol this area. Hornet = hovering unit. Snitch = small quiet ground unit. Wasp = small flier.",
        bring:"Solid weapon + 1–2 explosive grenades",
        steps:["Drop near Testing Annex on Dam","Kill Hornet (target back thrusters — weak spot)","Kill Snitch (small ground unit, listen for it)","Kill Wasp (small flier — shoot it down)","Loot Hornet Driver, Snitch Scanner, Wasp Driver","Extract with all 3 parts"],
        tip:"Stick to one ARC-dense area. Don't chase across the whole map.",
        reward:"Dam Control Tower Key, 2 Defibrillators, 1 Raider Hatch Key" },
      { num:8, name:"A First Foothold", map:"Blue Gate",
        obj:"Complete 4 objectives: stabilize Ridgeline deck, enable comms by Olive Grove, rotate church dishes north of Data Vault, nail roof plates near Trapper's Glade",
        where:"All 4 in Blue Gate. Ridgeline and Olive Grove are northwest. Church is north of Data Vault. Trapper's Glade is southeast. All interact points glow yellow.",
        bring:"Zipline or Snap Hook + smoke grenades",
        steps:["Drop into Blue Gate","Ridgeline: interact with observation deck","Olive Grove: enable the comms terminal","Church roof north of Data Vault: rotate satellite dishes","Trapper's Glade: nail down roof plates on Raider structure","Extract"],
        tip:"Ridgeline to Olive Grove is a long exposed run — use zipline. Do all 4 in order.",
        reward:"3 Shrapnel Grenades, 3 Snap Blast Grenades, 3 Heavy Fuze Grenades" },
      { num:9, name:"Dormant Barons", map:"Any",
        obj:"Find and loot a Baron Husk",
        where:"Baron Husks are the bodies left after killing a Baron ARC — heavily armored units in ARC event zones.",
        bring:"Heavy explosives or strong weapon — Barons are tough",
        steps:["Find a Baron ARC patrol or event zone","Kill the Baron (explosives help)","Loot the Baron Husk body","Extract"],
        tip:"Don't forget to actually loot the body before moving on.",
        reward:"3 Door Blockers, 3 Li'l Smoke Grenades" },
      { num:10, name:"Marked for Death", map:"Any",
        obj:"Destroy a Leaper ARC and loot a Leaper Pulse Unit",
        where:"Leapers are fast bounding ARC in ARC-heavy zones on any main map. Pulse Unit drops from the body.",
        bring:"Shotgun or burst weapon — Leapers are fast",
        steps:["Find a Leaper ARC (fast-moving bounding enemy)","Track its bounce pattern — it jumps repeatedly","Fire into where it's about to land","Kill it and loot the Leaper Pulse Unit","Extract"],
        tip:"Don't panic. Track the bounce arc and fire into the landing spot.",
        reward:"Radio Renegade Outfit, Burger Boy Charm, Vulcano III, 40 Shotgun Ammo" },
      { num:11, name:"Out of the Shadows", map:"Dam Battlegrounds",
        obj:"Kill a Rocketeer ARC at Testing Annex, loot the Rocketeer Driver",
        where:"Testing Annex Building, Dam Battlegrounds. Rocketeers are large ARC with rocket launchers near industrial structures.",
        bring:"2–3 Wolfpack grenades + heavy weapon",
        steps:["Drop near Testing Annex, Dam","Find the Rocketeer patrol","Use 1–2 Wolfpacks to drain health fast","Finish with primary","Loot Rocketeer Driver","Extract immediately"],
        tip:"1–2 Wolfpacks downs a Rocketeer. Loot and rotate out — don't double back.",
        reward:"3 Surge Shield Rechargers, 2 Wolfpacks" },
      { num:12, name:"Greasing Her Palms (Red Tower)", map:"Buried City",
        obj:"Reach Red Tower in Old Town. Find missing battery cell, install and power the generator, boot the antenna terminal.",
        where:"Red Tower is a tall structure in Old Town, Buried City. Generator is at the base. Battery cell spawns in nearby ground-level containers. Antenna terminal near the top.",
        bring:"Zipline or Snap Hook for vertical access",
        steps:["Drop into Buried City, head to Old Town","Find the Red Tower","Search nearby ground-level containers for the battery cell","Install battery in the generator at the base","Climb to the antenna terminal","Boot the terminal","Extract"],
        tip:"Power the generator before booting the terminal or it won't work.",
        reward:"Aviator Outfit (Crimson Racer), Anvil III, 40 Heavy Ammo" },
      { num:13, name:"Unexpected Initiative", map:"Blue Gate",
        obj:"Photograph the collapsed highway, follow destruction trail through Broken Earth, investigate unknown ARC machines",
        where:"Blue Gate map. Collapsed highway is west section. Broken Earth is a distinct terrain zone. ARC machine remains are at the trail's end.",
        bring:"Binoculars",
        steps:["Drop into Blue Gate, head west to Highway Collapse","Photograph the collapsed highway","Follow the destruction trail through Broken Earth","Find and investigate ARC machine remains at trail's end","Extract"],
        tip:"Wide open ground in Broken Earth. Short sprints between cover, scan constantly.",
        reward:"1 Binoculars, 1 Zipline, 3 Barricade Kits, 3 Door Blockers" },
    ]
  },
  Celeste: {
    color:"#c77dff", role:"City Architect & Planner",
    focus:"Exploration & materials — many quests require single-run completion",
    quests:[
      { num:1, name:"A Bad Feeling", map:"Dam / Spaceport / Buried City",
        obj:"Find and loot any ARC Probe or ARC Courier",
        where:"Probes and Couriers are small ground-level ARC units patrolling open lanes and broken paths. Scan LOW — they're knee height and easy to miss.",
        bring:"Nothing special",
        steps:["Drop into any main map","Walk main open lanes and paths","Look low to ground for small ARC (Probe or Courier)","Kill it and loot the body","Extract"],
        tip:"These are tiny. Don't look for big ARC — scan the ground along open paths.",
        reward:"10 Metal Parts, 5 Steel Springs, 5 Duct Tape" },
      { num:2, name:"A Balanced Harvest", map:"Dam Battlegrounds",
        obj:"Investigate agricultural research at Research & Administration, Lab 1",
        where:"R&A Building, Dam Battlegrounds. Lab 1 is a labeled room inside — look for signage.",
        bring:"Nothing special",
        steps:["Drop into Dam","Find R&A Building","Enter and locate Lab 1","Interact with the research terminal or object","Extract"],
        tip:"R&A is popular. Get in fast, interact, get out — don't loot everything.",
        reward:"Advanced Mechanical Components, Medium Gun Parts, Steel Spring" },
      { num:3, name:"A Symbol of Unification", map:"Dam Battlegrounds",
        obj:"Raise a flag at Formicai Outpost overlooking the red lake",
        where:"Formicai Outpost, Dam Battlegrounds, near the red lake. The flag pole is the main landmark at the outpost.",
        bring:"Enough firepower to clear nearby ARC",
        steps:["Drop into Dam near Formicai Outpost","Clear ALL nearby ARC enemies first","Approach the flag pole","Interact to raise the flag (animation locks you in place)","Wait for animation to fully complete","Extract"],
        tip:"The raise animation locks you completely. Any ARC nearby when you start = you die. Always clear first.",
        reward:"Aviator Outfit, Mod Components, Duct Tape" },
      { num:4, name:"After Rain", map:"Buried City",
        obj:"Repair flooded solar panels near Grandioso Apartments using Wires and Batteries",
        where:"Grandioso Apartments, Buried City. Solar panels are on or near the building exterior. Wires from electrical cabinets and residential containers anywhere.",
        bring:"2–3 Wires + 1 Battery in safe pocket (pre-farm these)",
        steps:["Farm Wires and Battery from electrical containers on any map first","Safe-pocket them","Drop into Buried City","Head to Grandioso Apartments","Find the solar panels, interact to repair with your Wires/Battery","Extract"],
        tip:"Pre-load Wires and Battery before this run. Searching mid-mission wastes time and gets you killed.",
        reward:"Crafting materials" },
      { num:5, name:"Echoes of Victory Ridge", map:"Dam Battlegrounds",
        obj:"Take Major Aiva's plans from the hideout under the broken highway at Victory Ridge",
        where:"Victory Ridge, Dam Battlegrounds. Hideout is literally UNDERNEATH the broken highway — go below it. The Patch is in a container inside.",
        bring:"Nothing — item found on map",
        steps:["Drop into Dam, head to Victory Ridge","Find the broken highway section","Go UNDERNEATH the highway — hideout entrance is below","Loot Major Aiva's Patch inside","Extract immediately — this spot attracts players"],
        tip:"Under-highway hideout is a PvP magnet. Go early, loot fast, leave early. Never linger.",
        reward:"1 Anvil II, 1 Anvil Splitter, 1 Extended Barrel, 40 Heavy Ammo" },
      { num:6, name:"Straight Record", map:"Dam Battlegrounds",
        obj:"At Victory Ridge, find the EMP trap and flip 3 switches to shut it down",
        where:"Victory Ridge, Dam Battlegrounds. EMP trap is near the broken highway. The 3 switches are all within the same zone.",
        bring:"Nothing — just scout first",
        steps:["Drop into Dam, head to Victory Ridge","Find the EMP trap near the broken highway","Scout and locate ALL 3 switches BEFORE touching any","Flip all 3 switches quickly","Extract"],
        tip:"Scout all 3 before touching anything. Flipping randomly while searching = slow death.",
        reward:"Gear / materials" },
      { num:7, name:"Celeste's Journals", map:"Dam Battlegrounds",
        obj:"Two journals: one from South Swamp Outpost, one from north outpost overlooking Red Lakes",
        where:"South Swamp Outpost: south swamp of Dam, inside the shack. North journal: north outpost near Red Lakes overlook — inside the shack near the edge.",
        bring:"Nothing — items on map",
        steps:["Drop into Dam","South Swamp Outpost: inside the shack, find and loot Journal 1","North outpost near Red Lakes overlook: inside the shack, find Journal 2","Extract with both"],
        tip:"North journal is near overlook edges inside the shack. South is buried in shack clutter — open everything.",
        reward:"Gear / materials" },
      { num:8, name:"Doctor's Orders", map:"Buried City",
        obj:"Bring 2 Antiseptic, 1 Syringe, 1 Durable Cloth, 1 Great Mullein to Lance",
        where:"Buried City pharmacies (buildings with pharmacy cross symbol) for Antiseptic, Syringe, Durable Cloth — check counters and back desks. Great Mullein is a plant from nature zones on any map.",
        bring:"Great Mullein in safe pocket if already found",
        steps:["Farm Great Mullein from nature areas on any map (safe-pocket it)","Drop into Buried City","Find pharmacy buildings (cross symbol)","Check counters and back desks for Antiseptic, Syringe, Durable Cloth","Extract and deliver all 4 to Lance"],
        tip:"Great Mullein is the item people forget — they die holding everything else. Safe-pocket it before dropping.",
        reward:"Surge Shield Recharger" },
      { num:9, name:"The Root of the Matter", map:"Buried City",
        obj:"Get Fertilizer from Grandioso Apartments rooftop, Water Pump from Piazza Roma rooftop gardens",
        where:"Grandioso Apartments: rooftop via internal stairwell or zipline. Fertilizer in rooftop containers. Piazza Roma: rooftop gardens — Water Pump in containers there.",
        bring:"Zipline or Snap Hook for rooftop access",
        steps:["Drop into Buried City","Grandioso Apartments: access rooftop, loot Fertilizer","Move to Piazza Roma: access rooftop garden, loot Water Pump","Extract with both items"],
        tip:"Mobility tools cut this run in half. Without them it drags.",
        reward:"Crafting materials" },
      { num:10, name:"Back on Top", map:"Buried City + Dam Battlegrounds",
        obj:"Step 1 (Buried City): foreman's barricaded apartment south of Piazza Roma — access digital logbook. Step 2 (Dam): Power Generation Complex — enter Controlled Access Zone, search for clues.",
        where:"Piazza Roma south side, Buried City: barricaded apartment door. Power Generation Complex, Dam: restricted zone inside the building.",
        bring:"Nothing special for either step",
        steps:["Buried City run: go south of Piazza Roma, find barricaded apartment, access digital logbook","Dam run (separate raid): Power Generation Complex, enter Controlled Access Zone, search for clues","Turn in to Celeste after both complete"],
        tip:"Split into two calm raids — the zones are on opposite maps. Don't force both in one session.",
        reward:"1 Anvil II, 1 Anvil Splitter, 1 Extended Barrel, 40 Heavy Ammo" },
    ]
  },
  "Tian Wen": {
    color:"#a8ff3e", role:"Gun Craftsman",
    focus:"Weapon mods & blueprints — pre-load quest items in safe pocket",
    quests:[
      { num:1, name:"The Right Tool", map:"Any",
        obj:"Kill a Fireball, a Hornet, and a Turret ARC",
        where:"All 3 types on every main map. Fireballs = fire-emitting mid-size ARC. Hornets = hovering shock units. Turrets = fixed or slow wall units.",
        bring:"Normal combat loadout",
        steps:["Kill a Fireball ARC","Kill a Hornet ARC (target back thrusters — weak spot)","Kill a Turret ARC (fixed unit — pick off from range)","Extract — can be across multiple raids"],
        tip:"Don't force all 3 in one raid. Take kills as they naturally come.",
        reward:"Cheer Emote, Stitcher II, Extended Light Mag I" },
      { num:2, name:"A Better Use", map:"Any",
        obj:"Call in a Supply Drop from a Call Station, then loot the drop",
        where:"Call Stations are marked on the map. Supply Drops land in nearby open ground — the beacon sound and light draws other players.",
        bring:"Combat readiness — drop zone attracts enemies",
        steps:["Find a Call Station on the minimap","Clear sightlines around it","Interact to call in the drop","Move to drop landing zone","Clear any players/ARC drawn to it","Loot the drop crate","Extract"],
        tip:"The drop makes noise and light. Clear sightlines before calling it in.",
        reward:"Extended Light Mag I, Stable Stock I, Muzzle Brake II" },
      { num:3, name:"Broken Monument", map:"Dam Battlegrounds",
        obj:"At the Scrapyard: collect a compass, tape, and rations, deliver to Tian Wen",
        where:"Scrapyard area, Dam Battlegrounds. Compass and rations spawn in and around vehicles. Tape is in cylindrical containers and at the Raider camp.",
        bring:"Nothing — all items on map",
        steps:["Drop into Dam near the Scrapyard","Sweep vehicles first — compass and rations spawn here","Check cylindrical containers for tape","Check Raider camp for remaining items","Extract with all 3"],
        tip:"Sweep in order: vehicles → cylinders → Raider camp. Stay on the route.",
        reward:"Surge Shield Recharger" },
      { num:4, name:"Industrial Espionage", map:"Buried City",
        obj:"Su Durante Warehouses — find a metal box near a wall, follow footprints to a second interactable",
        where:"Su Durante Warehouses, Buried City Outskirts. Metal box is against an exterior warehouse wall. Footprints on the ground lead a few meters to the second object.",
        bring:"Nothing special",
        steps:["Drop into Buried City Outskirts","Find Su Durante Warehouses","Walk along exterior walls looking for a metal box prompt","Interact with the box","Look down — follow the footprints on the ground","Interact with the second object a few meters away","Extract"],
        tip:"Long sightlines here. Stick to tight corners and use smoke if you hear players.",
        reward:"Shotgun Choke II, Angled Grip II" },
      { num:5, name:"Eyes on the Prize", map:"Buried City",
        obj:"Roof terrace southwest of Southern Station in Old Town — rewire the solar panel using 3 Wires",
        where:"Southern Station, Old Town, Buried City. Roof terrace is southwest of the station — access via stairwell or zipline. Solar panel interact is on the terrace.",
        bring:"3 Wires pre-loaded in safe pocket",
        steps:["Pre-farm 3 Wires from electrical containers on any map","Safe-pocket them","Drop into Buried City","Head to Old Town → Southern Station","Find the roof terrace southwest","Interact with solar panel, rewire with your 3 Wires","Extract"],
        tip:"Always pre-load the Wires. The one run you don't is the one you find the panel first try.",
        reward:"Extended Medium Mag II" },
      { num:6, name:"Market Correction", map:"Buried City",
        obj:"Find weapon cache near Gas Station (Outskirts), move the Burletta to the rival cache in Industrial Zone",
        where:"Gas Station in Buried City Outskirts. Weapon cache is nearby — container or stash with the Burletta. Industrial Zone rival cache is in mid-Buried City.",
        bring:"Enough inventory space for the Burletta",
        steps:["Drop into Buried City Outskirts","Head to Gas Station","Find the nearby cache and loot the Burletta","Move directly to the Industrial Zone","Find the rival cache","Deposit the Burletta","Extract immediately"],
        tip:"No looting detours. The Burletta is your only objective.",
        reward:"Weapon mods" },
      { num:7, name:"The Major's Footlocker", map:"Dam Battlegrounds",
        obj:"Ruby Residences northwest of the Dam — find metal box with memorabilia prompt, extract with item",
        where:"Ruby Residences, northwest of Dam. Metal box is in the building on the west side — gives a 'search for memorabilia' prompt.",
        bring:"Nothing special",
        steps:["Drop into Dam, head northwest to Ruby Residences","Enter the building on the west side","Find the metal box with the memorabilia prompt","Loot the item","Extract"],
        tip:"Ruby Residences is tight and echo-y. Slow down and listen for footsteps before entering.",
        reward:"Hullcracker Blueprint" },
      { num:8, name:"A Warm Place to Rest", map:"Any (best: Dam Testing Annex)",
        obj:"Destroy a Wasp, Hornet, and Snitch ARC. Bring back their parts.",
        where:"Testing Annex, Dam Battlegrounds has all 3 ARC types nearby. Wasp = small flier. Hornet = hovering unit. Snitch = small quiet ground unit.",
        bring:"Strong weapon + explosive grenade for Hornet",
        steps:["Drop near Testing Annex, Dam","Kill a Wasp (small flier)","Kill a Hornet (hovering — target back thrusters)","Kill a Snitch (small ground unit — listen carefully)","Loot Wasp Driver, Hornet Driver, Snitch Scanner","Extract"],
        tip:"Test Annex has all 3 nearby. Knock them all out in one area.",
        reward:"Orange Origin Camo Skin, Raider Hatch Key, 2 Defibrillators, Dam Control Tower Key" },
      { num:9, name:"What We Left Behind", map:"Buried City + Dam + Spaceport",
        obj:"Loot 2 containers under Parking Garage Raider Camp (Buried City), search South Swamp Outpost (Dam), search Bilguun's Hideout near Container Storage (Spaceport)",
        where:"Parking Garage: find the Raider Camp underneath it in Buried City. South Swamp Outpost: south swamp area, Dam. Bilguun's Hideout: near Container Storage building, Spaceport.",
        bring:"Nothing — 3 separate locations",
        steps:["Buried City run: find Parking Garage, go underneath to Raider Camp, loot 2 containers","Dam run: South Swamp Outpost, search inside","Spaceport run: Container Storage area, find Bilguun's Hideout, search it"],
        tip:"This is a 3-map route quest. Split across 3 separate raids.",
        reward:"Stable Stock II" },
    ]
  },
  Apollo: {
    color:"#ff6b35", role:"Combat Specialist",
    focus:"Explosives & aggressive combat — buy grenades from Apollo before heading out",
    quests:[
      { num:1, name:"Safe Passage", map:"Dam Battlegrounds (best)",
        obj:"Kill 2 ARC enemies using any explosive grenade",
        where:"Research and Administration Building, Dam Battlegrounds. ARC patrol doorways and corridors — perfect choke points.",
        bring:"2+ explosive grenades (Shrapnel or Trigger 'Nade from Apollo)",
        steps:["Buy or bring explosive grenades","Drop near R&A Building, Dam","Find ARC patrol in a corridor or doorway","Pull ARC into the doorway choke","Throw grenade to kill 2 at once","Extract"],
        tip:"Pull ARC into a doorway, then grenade the choke. Never throw in an open lane.",
        reward:"5 Li'l Smoke Grenades, 3 Shrapnel Grenades, 3 Barricade Kits" },
      { num:2, name:"What Goes Around", map:"Dam Battlegrounds",
        obj:"Kill an ARC enemy using a Fireball Burner weapon",
        where:"R&A area, Dam Battlegrounds. Fireball Burner is an incendiary weapon — buy from Apollo or loot from ARC caches.",
        bring:"Fireball Burner in your loadout",
        steps:["Get a Fireball Burner from Apollo or loot one","Equip it","Drop into Dam near R&A","Find an ARC enemy","Ensure killing blow comes from the Fireball Burner","Extract"],
        tip:"Tag and finish with the Burner. Don't let teammates steal the last hit or it won't count.",
        reward:"3 Blaze Grenades, 2 Noisemakers, Cans Backpack Attachment" },
      { num:3, name:"Sparks Fly", map:"Any",
        obj:"Kill a Hornet ARC using a Trigger 'Nade or Snap Blast grenade",
        where:"Hornets are hovering ARC on any main map. Trigger 'Nade from earlier Apollo quest. Craft or buy.",
        bring:"Trigger 'Nade or Snap Blast grenades",
        steps:["Craft or buy Trigger 'Nade or Snap Blast","Drop into any map","Find a Hornet ARC","Watch its hover pattern — Hornets pause briefly in place","Throw grenade WHERE IT WILL BE when it pauses, not where it currently is","Confirm kill","Extract"],
        tip:"Hornets stall and hover. Throw grenade to the pause point, not the current position.",
        reward:"Trigger 'Nade Blueprint, 4 Crude Explosives, 2 Processors" },
      { num:4, name:"Into the Fray", map:"Any",
        obj:"Interact with a functioning ARC Tech Terminal",
        where:"ARC Tech Terminals are glowing yellow consoles inside ARC-controlled buildings on any map.",
        bring:"Combat loadout strong enough to clear ARC inside a building",
        steps:["Drop into any map","Find an ARC compound or building","Fight through ARC inside","Find the glowing yellow ARC Tech Terminal","Interact with it","Extract"],
        tip:"Yellow glowing objects in ARC zones are always interactables. Don't run past them.",
        reward:"2 Defibrillators, Repair Kit" },
      { num:5, name:"Reduced to Rubble", map:"Any",
        obj:"Destroy 5 ARC enemies with a melee weapon",
        where:"Any ARC on any map. Killing blow must be melee.",
        bring:"Melee weapon + primary firearm to weaken ARC first",
        steps:["Equip a melee weapon","Weaken ARC to near-dead with your firearm","Switch to melee and land the killing blow","Repeat 5 times across any number of raids","Extract"],
        tip:"Weaken to almost dead with guns, then melee finish. Don't try to fight ARC fully with melee.",
        reward:"Raider Hatch Key, Tactical MK.1" },
    ]
  },
  Lance: {
    color:"#ffd700", role:"Medic & Supply Runner",
    focus:"Medical items & pharmacies — pharmacy knowledge is key",
    quests:[
      { num:1, name:"Doctor's Orders", map:"Buried City",
        obj:"Deliver 2 Antiseptic, 1 Syringe, 1 Durable Cloth, 1 Great Mullein to Lance",
        where:"Buried City pharmacies (cross symbol on exterior) for Antiseptic, Syringe, Durable Cloth — check counters and back desks. Great Mullein is a plant from nature zones on any map.",
        bring:"Great Mullein in safe pocket if you have one",
        steps:["Farm Great Mullein from nature zone on any map (safe-pocket it)","Drop into Buried City","Find pharmacy buildings (exterior cross symbol)","Check counters and back desks for Antiseptic, Syringe, Durable Cloth","Extract and deliver all 4 to Lance"],
        tip:"Great Mullein is the item people forget. Safe-pocket it before dropping.",
        reward:"Surge Shield Recharger" },
      { num:2, name:"Medical Merchandise", map:"Spaceport + Buried City + Dam",
        obj:"Loot exam rooms in Departure Building (Spaceport), hospital containers in Buried City, medical room in R&A (Dam)",
        where:"Departure Building at Spaceport — find exam rooms inside. Hospital building in Buried City. R&A Building, Dam — medical supply room inside.",
        bring:"Nothing — route quest",
        steps:["Spaceport run: Departure Building, find exam rooms, open all containers","Buried City run: find the hospital building, loot medical containers","Dam run: R&A Building, find the medical supply room, loot it","Turn all items in to Lance"],
        tip:"Split across 3 separate runs. 3 maps in one session almost always ends in dying.",
        reward:"Medical items, healing gear" },
      { num:3, name:"Power Out", map:"Buried City",
        obj:"Restore power to a designated location",
        where:"Power junction or generator room in Buried City — usually in a basement or utility area. Generator has a prompt when you approach.",
        bring:"2 ARC Powercells in safe pocket BEFORE the match starts",
        steps:["Stock 2 ARC Powercells in safe pocket before dropping","Drop into Buried City","Find the generator room (basement or utility wing)","Interact with generator using your ARC Powercells","Restore power","Extract"],
        tip:"Need 2 ARC Powercells BEFORE entering the match — generator won't interact without them.",
        reward:"Utility items" },
      { num:4, name:"Our Presence Up There", map:"Stella Montis",
        obj:"Establish Raider presence in Stella Montis — interact with objective points across the new map",
        where:"Stella Montis unlocks after 24 rounds played. Objective interact points at outposts or elevated positions — all glow yellow.",
        bring:"Full combat loadout — Stella Montis is a harder map",
        steps:["Reach 24 rounds played to unlock Stella Montis","Drop in with full gear","Find yellow-glowing interact points at outposts or high ground","Complete all interactions","Extract"],
        tip:"Don't go solo the first time. Stella Montis is noticeably harder than Dam and Buried City.",
        reward:"Stella Montis questline unlock rewards" },
      { num:5, name:"A Lay of the Land", map:"Blue Gate",
        obj:"Explore Blue Gate and complete area familiarization objectives — visit marked regions",
        where:"Blue Gate unlocks at 18 rounds played. More open terrain than other maps. Objectives mark specific areas to visit.",
        bring:"Basic loadout — exploration quest",
        steps:["Reach 18 rounds played to unlock Blue Gate","Drop in","Visit all marked map regions shown in quest tracker","Interact with any yellow-glowing objects","Extract"],
        tip:"Blue Gate is open country. Use binoculars from high ground to scout before moving.",
        reward:"Explorer gear / keys" },
    ]
  }
};

// ─── WORKSHOP DATA ────────────────────────────────────────────────────────────
const workshopData = [
  { name:"Workbench", icon:"🔧", color:C.dim,
    note:"Cannot be upgraded. Always available. Crafts ammo all game — never useless.",
    levels:[{ level:"Base Only", unlocks:"Basic weapons (Ferro), all ammo types, starter grenades & mines", materials:"Free — no build cost" }]
  },
  { name:"Scrappy", icon:"🐓", color:"#e8a030",
    note:"Passive material rooster. Feed him nature items. Each upgrade = faster returns + more materials. Unlock L2 early.",
    levels:[
      { level:"Base", unlocks:"Passively brings Metal Parts, Fabric, Plastic Parts, Chemicals, Rubber Parts, Assorted Seeds", materials:"Basic materials + nature items" },
      { level:"L2", unlocks:"Faster returns, more per trip", materials:"Dog Collar (1×) + basic nature items" },
      { level:"L3", unlocks:"Better passive income", materials:"3× Lemon + 3× Apricot" },
      { level:"L4", unlocks:"Good passive generation", materials:"1× Cat Bed + 6× Prickly Pear + 6× Olives" },
      { level:"L5 (max)", unlocks:"Maximum passive income — major grind reduction", materials:"12× Mushroom + 12× Apricot + 3× Very Comfortable Pillow" },
    ]
  },
  { name:"Gunsmith", icon:"🔫", color:C.green,
    note:"UPGRADE FIRST. Better weapons = better survival. Rush L2, then finish after Gear Bench L2.",
    levels:[
      { level:"L1 Build", unlocks:"Expanded weapon pool, basic firearm crafting", materials:"20× Metal Parts + 30× Rubber Parts" },
      { level:"L2", unlocks:"Mid-tier weapons and mods", materials:"3× Rusted Tools + 5× Mechanical Components + 8× Wasp Drivers" },
      { level:"L3", unlocks:"Top-tier weapons and advanced mods", materials:"3× Rusted Gears + 5× Advanced Mechanical Components + 4× Sentinel Firing Cores" },
    ]
  },
  { name:"Gear Bench", icon:"🛡️", color:C.cyan,
    note:"Priority #2 after Gunsmith L2. Get to L2 for Heavy Shield ASAP. L3 has the best augments in the game.",
    levels:[
      { level:"L1 Build", unlocks:"Light Shield, basic augments", materials:"25× Plastic Parts + 30× Fabric" },
      { level:"L2", unlocks:"Heavy Shield — dramatically increases survivability", materials:"3× Power Cables + 5× Electrical Components + 5× Hornet Drivers" },
      { level:"L3", unlocks:"Looting Mk.3 Cautious (+14 backpack slots) + best augments", materials:"3× Industrial Batteries + 5× Advanced Electrical Components + 6× Bastion Cells" },
    ]
  },
  { name:"Medical Lab", icon:"💉", color:"#ff4f6e",
    note:"Vita Spray at L3 = instant health restore mid-combat. Game-changer for aggressive play.",
    levels:[
      { level:"L1 Build", unlocks:"Basic healing items, bandages, medkits", materials:"6× ARC Alloy + 50× Fabric + basic medical materials" },
      { level:"L2", unlocks:"Better medkits, Defibrillators", materials:"2× Cracked Bioscanner + 5× Durable Cloth + 8× Tick Pods" },
      { level:"L3", unlocks:"Vita Spray (instant health restore in combat)", materials:"8× Antiseptic + 3× Rusted Shut Medical Kit + 5× Surveyor Vaults" },
    ]
  },
  { name:"Explosives Station", icon:"💥", color:C.orange,
    note:"Explosives bypass ARC armor. L2 Lure Grenade lets you pull ARC away without fighting.",
    levels:[
      { level:"L1 Build", unlocks:"Basic grenades, Jolt Mines", materials:"6× ARC Alloy + 50× Chemicals + basic materials" },
      { level:"L2", unlocks:"Lure Grenade (pulls ARC away)", materials:"5× Crude Explosives + 3× Synthesized Fuel + 5× Pop Triggers + 6× Snitch Scanners" },
      { level:"L3", unlocks:"Photoelectric Cloak, Snap Hook", materials:"5× Explosive Compound + 3× Laboratory Reagents + 3× Rocketeer Drivers" },
    ]
  },
  { name:"Utility Station", icon:"🧰", color:C.purple,
    note:"Stealth and mobility tools. Snap Hook grapple changes how you move. Worth getting to L3.",
    levels:[
      { level:"L1 Build", unlocks:"Basic tactical utilities, smoke grenades", materials:"50× Plastic Parts + 6× ARC Alloy" },
      { level:"L2", unlocks:"Ziplines, advanced grenades", materials:"5× Electrical Components + 6× Snitch Scanners" },
      { level:"L3", unlocks:"Top-tier stealth and mobility gear including Snap Hook", materials:"3× Fried Motherboards + 5× Advanced Electrical Components + 4× Leaper Pulse Units + 5× Utility Station Components" },
    ]
  },
  { name:"Refiner", icon:"⚙️", color:C.blue,
    note:"Long-term investment. Converts basic materials into rare ones. Don't skip — saves enormous grinding time.",
    levels:[
      { level:"L1 Build", unlocks:"Basic material conversion (common → uncommon)", materials:"60× Metal Parts + 5× ARC Powercells" },
      { level:"L2", unlocks:"Better conversion rates, mid-tier materials", materials:"3× Toasters + 5× ARC Motion Cores + 8× Fireball Burners" },
      { level:"L3", unlocks:"Rare component crafting — massive grind reduction", materials:"3× Motors + 10× ARC Circuitry + 6× Bombardier Cells" },
    ]
  },
];

// ─── ENEMY DATA ──────────────────────────────────────────────────────────────
const ENEMIES = [
  // SMALL / INDOOR
  { name:"Tick", tier:"Small", color:"#6ee7b7",
    where:"Indoors — walls, ceilings, corners. Listen for shuffling before looting a room.",
    weakness:"No armor. One-hit melee kill.",
    how:"Melee it off the wall/ceiling before it jumps. If it latches on, dislodge and kill immediately — it deals continuous damage while attached.",
    ammo:"Melee preferred. Any gun works.",
    drops:["ARC Alloy","Tick Pod"],
    tip:"Kill it before you start looting a room. The shuffling sound = there's a Tick nearby." },
  { name:"Pop", tier:"Small", color:"#6ee7b7",
    where:"Indoor and outdoor on all maps. Often in groups. Rushes directly at you.",
    weakness:"Low health, no armor, predictable straight-line charge.",
    how:"Shoot it once or twice before it closes to detonation range. It explodes on contact — don't let it reach you.",
    ammo:"Any — light ammo works fine.",
    drops:["Pop Trigger","ARC Powercell","ARC Thermo Lining"],
    tip:"Groups are the real danger. Prioritize the closest ones first and back up as you shoot." },
  { name:"Fireball", tier:"Small", color:"#6ee7b7",
    where:"Indoor and outdoor. Abundant in Stella Montis. Accompanies Pops and Ticks.",
    weakness:"Core exposed during flame attack cycle.",
    how:"Heavy weapons drop it fast regardless. With lighter weapons, wait for the core to open during its flame spray and dump damage into the exposed point.",
    ammo:"Any — Ferro goes straight through armor. Medium ammo with a few shots.",
    drops:["ARC Alloy","ARC Powercell","Fireball Burner"],
    tip:"Fully armored unlike Pop but low health once armor is gone. Ferro one-shots it." },
  { name:"Firefly", tier:"Small", color:"#6ee7b7",
    where:"Outdoor areas, Stella Montis. Often accompanies other ARC units.",
    weakness:"Thrusters and exposed core during flame spray cycle.",
    how:"Fight in open space where you can move freely. When it opens its core to spray flames, unload directly into that point. Medium and heavy ammo accelerate the kill.",
    ammo:"Medium or heavy ammo for fastest kill.",
    drops:["Firefly Burner","ARC Alloy","Chemicals","Synthesized Fuel"],
    tip:"Similar to Fireball but airborne. Use open terrain so you can track its movement." },

  // STANDARD / MID TIER
  { name:"Wasp", tier:"Standard", color:"#60a5fa",
    where:"Open areas on all maps. Very common. Called in as reinforcements by Snitch.",
    weakness:"Four rear thrusters — destroying them causes it to spiral and crash.",
    how:"Target the rear thrusters. Once enough thruster damage is dealt it loses stability and goes down. Stays at mid-range, rarely dives.",
    ammo:"Any — light or medium ammo is fine.",
    drops:["ARC Alloy","Wasp Driver","Light Ammo"],
    tip:"Clear Wasps before Hornets when both are present — Wasps summon first and take pressure off." },
  { name:"Hornet", tier:"Standard", color:"#60a5fa",
    where:"All maps. Open terrain and patrol areas. Front thrusters are armored.",
    weakness:"Rear thrusters only — front is protected.",
    how:"Stay behind hard cover and peek to shoot rear thrusters. Its electrical shock attacks disrupt movement so open-field fights are risky. Breaking the rear thrusters drops it.",
    ammo:"Heavy ammo penetrates armor faster. Medium works too.",
    drops:["ARC Alloy","ARC Powercell","Hornet Driver","Medium Ammo"],
    tip:"Never fight a Hornet in the open. Always find hard cover first — the shock attack in open terrain is punishing." },
  { name:"Snitch", tier:"Standard", color:"#60a5fa",
    where:"All maps, usually flying high above buildings. Unarmed scout unit.",
    weakness:"Underside plating — three sections, destroying two is enough to bring it down.",
    how:"Kill it the second it detects you. Speed is everything. Commit focused fire to the underside. If it survives long enough, it calls in 2 Wasps + 1 Hornet.",
    ammo:"Any — speed matters more than ammo type.",
    drops:["ARC Alloy","ARC Powercell","Snitch Scanner"],
    tip:"NEVER ignore a Snitch. It's unarmed but calling in its reinforcements turns a quiet run into a full fight instantly." },
  { name:"Turret", tier:"Standard", color:"#60a5fa",
    where:"Indoors — walls, ceilings, corners near loot. Blue light = scanning, red = locked on.",
    weakness:"No specific weak point. Low health, no armor.",
    how:"Sneak to an out-of-sight angle and unload. Any ammo type drops it fast if you're not in its line of fire. Once it locks on it fires sustained bursts.",
    ammo:"Any — heavy is faster but not required.",
    drops:["ARC Alloy","ARC Powercell","Light Ammo"],
    tip:"Blue light means scanning, red means it sees you. Get into a blind angle before it switches to red." },
  { name:"Shredder", tier:"Standard", color:"#60a5fa",
    where:"Stella Montis primarily. Indoor areas. Can be trapped in rooms using doors.",
    weakness:"No specific weak point. Armored body — fire strips armor fast.",
    how:"Use heavy weapons and maintain distance. Grenades are effective if you can catch it in the blast. Bait it into doorways and trap it. Fire from Fireballs nearby strips its armor efficiently.",
    ammo:"Heavy ammo. Snap Blast or Trigger 'Nade break armor fast.",
    drops:["Shredder Gyro","Shotgun Ammo","ARC Powercell","ARC Alloy","ARC Synthetic Resin"],
    tip:"You can trap Shredders in rooms with doors in Stella Montis and leave them — or bait them into a room with enemy Raiders." },
  { name:"Comet", tier:"Standard", color:"#60a5fa",
    where:"Open areas. Near heavier ARC units. Fast rolling ground unit.",
    weakness:"Central mechanism visible during attack cycle. Yellow parts are weak points.",
    how:"Shoot while it's transmitting/open, then keep shooting. Block its path with corners or barricades. Heavy ammo works well for repeated damage. Stuns make core damage easier.",
    ammo:"Heavy ammo (Anvil/Pharaoh class) for repeated hits.",
    drops:["Comet Igniter","Explosive Compound","ARC Coolant","ARC Alloy","ARC Thermo Lining"],
    tip:"Don't let it roll unchallenged through open space — the blast radius when it detonates is wide and very punishing." },

  // HEAVY / ELITE
  { name:"Surveyor", tier:"Heavy", color:"#f59e0b",
    where:"All maps. Drone-type unit. Calls in reinforcements if not killed quickly.",
    weakness:"Exposed core and sensor array.",
    how:"Destroy it before it can call for backup. Focused fire on the core. Don't chase it — it tries to flee when damaged.",
    ammo:"Medium or heavy ammo.",
    drops:["Surveyor Vault","ARC Alloy","ARC Powercell"],
    tip:"Loot the Vault and rotate out — don't double back after the kill." },
  { name:"Leaper", tier:"Heavy", color:"#f59e0b",
    where:"All main maps. ARC-heavy zones. Very fast, bounding movement.",
    weakness:"Exposed 'eye' / face — visible yellow weak point. Vulnerable leg joints.",
    how:"Track its bounce pattern and fire into where it will land. It jumps repeatedly — predict the landing spot. EMP grenades temporarily disable it. Focus fire on face or legs.",
    ammo:"Shotgun or burst weapons work well. EMP grenade to stun then heavy ammo.",
    drops:["Leaper Pulse Unit","ARC Alloy","ARC Powercell","ARC Performance Steel"],
    tip:"Don't panic at its speed. Track the arc of the jump and fire into the landing zone — it's predictable once you know the pattern." },
  { name:"Sentinel", tier:"Heavy", color:"#f59e0b",
    where:"Elevated overwatch positions, long sightlines. Sniper variant of the Turret.",
    weakness:"Yellow canister on the body amplifies damage when hit.",
    how:"Approach from behind when possible. Shoot the yellow canister for amplified damage or just dump heavy ammo from a safe flanking angle.",
    ammo:"Heavy ammo from range or behind.",
    drops:["ARC Alloy","Advanced ARC Powercell","Sentinel Firing Core","Heavy Ammo"],
    tip:"Never fight a Sentinel in its sightline. Always flank — it's devastating in open long-range engagements." },
  { name:"Rocketeer", tier:"Heavy", color:"#f59e0b",
    where:"Industrial areas, Testing Annex (Dam Battlegrounds). Large ARC with rocket launcher.",
    weakness:"Exposed thrusters, core when exposed. Poor close-range defense.",
    how:"Use Wolfpack grenades (1–2 drops its health fast) then finish with primary weapon. Explosives bypass its armor. Stay mobile — rockets are devastating if you stand still.",
    ammo:"Heavy ammo + Wolfpack grenades. Explosive Compound weapons.",
    drops:["ARC Alloy","Advanced ARC Powercell","Rocketeer Driver","Heavy Gun Parts","ARC Motion Core"],
    tip:"1–2 Wolfpacks will down a Rocketeer. Loot the Driver and extract immediately — don't linger." },

  // BOSSES
  { name:"Bastion", tier:"Boss", color:"#e879f9",
    where:"ARC-controlled zones on all maps. Four-legged heavy mech.",
    weakness:"Leg joints are the main weak point. Exposed face. Use high armor penetration weapons.",
    how:"Use buildings it can't fit through as natural barriers. Tag it to draw aggro on one player while others target legs. Focus fire one leg at a time to expose weak points. Watch for jump attacks and dodge the shockwaves.",
    ammo:"Heavy ammo required. Explosives highly recommended. Hullcracker if you have it.",
    drops:["ARC Alloy","Advanced ARC Powercell","Bastion Cell","ARC Circuitry"],
    tip:"Don't fight a Bastion solo early on. The leg-targeting strategy needs coordinated fire — bring a squad or strong explosives." },
  { name:"Bombardier", tier:"Boss", color:"#e879f9",
    where:"Open areas or designated ARC zones. Heavy artillery unit with Spotter drones.",
    weakness:"Yellow leg joints. Vulnerable without its Spotters. Slow turning speed.",
    how:"Priority 1: kill ALL Spotter drones first — they remove the Bombardier's targeting advantage. Then target yellow leg joints while moving constantly. Never stay stationary. Use terrain and buildings for cover against mortars.",
    ammo:"Heavy ammo on legs. Explosives for Spotters.",
    drops:["ARC Alloy","Advanced ARC Powercell","Bombardier Cell","Launcher Ammo"],
    tip:"Kill the Spotters first — every single time. Without them the Bombardier is significantly easier to handle." },
  { name:"Queen", tier:"Boss", color:"#e879f9",
    where:"Specific event zones. The Queen Reactor also drops from her destroyed leg armor segments.",
    weakness:"Energy shield must be destroyed first. Protected by child ARC units.",
    how:"Full squad coordination essential. Destroy energy shield first, then focus fire on core. Avoid gas mortars and rocket fire. Eliminate child ARC as they spawn or they'll overwhelm you.",
    ammo:"All ammo types — sustained heavy damage after shield is down.",
    drops:["ARC Alloy","ARC Powercell","Queen Reactor","Magnetic Accelerator","Complex Gun Parts"],
    tip:"Check her destroyed leg armor wreckage after the fight — the Queen Reactor can also drop from the leg segments." },
  { name:"Matriarch", tier:"Boss", color:"#e879f9",
    where:"Harvester Events only. Colossal war machine — the largest ARC in the game.",
    weakness:"Multiple exposed weak points during attack phases. Devastating area attacks.",
    how:"Full squad required. Study its attack phases — it telegraphs each attack. Focus fire on lit-up weak points during windows between attacks. Keep spread out so AoE attacks don't wipe the squad at once.",
    ammo:"All heavy ammo and explosives. Wolfpack grenades for burst damage windows.",
    drops:["Matriarch Reactor","Magnetic Accelerator","Complex Gun Parts","ARC Alloy","Advanced ARC Powercell"],
    tip:"The Matriarch Reactor is the most valuable item in the game. Safe-slot it the second you loot it and head straight to extract." },

  // NON-HOSTILE (loot objects)
  { name:"ARC Probe / Courier", tier:"Loot Object", color:"#94a3b8",
    where:"Open lanes and broken paths on all main maps. Ground level — easy to miss.",
    weakness:"Not hostile. Can be looted without killing.",
    how:"Find it and interact/loot it. Probes and Couriers are small and low to the ground — scan the ground level along open paths.",
    ammo:"N/A",
    drops:["ARC Alloy","ARC Powercell","Various materials"],
    tip:"Required for Celeste's 'A Bad Feeling' quest. These are knee height — don't look for big ARC, look low." },
];

const TIER_ORDER = ["Small","Standard","Heavy","Boss","Loot Object"];
const TIER_COLORS = { Small:"#6ee7b7", Standard:"#60a5fa", Heavy:"#f59e0b", Boss:"#e879f9", "Loot Object":"#94a3b8" };


const DECISIONS = {
  "keep":         { label:"KEEP",           color:C.gold,    bg:"#1a1500" },
  "keep-scrappy": { label:"SCRAPPY",         color:"#e8a030", bg:"#150e00" },
  "keep-crafting":{ label:"PROJECT",         color:C.teal,   bg:"#001516" },
  "recycle":      { label:"RECYCLE",         color:C.green,   bg:"#060e00" },
  "sell":         { label:"SELL",            color:C.red,     bg:"#150000" },
};
const RARE_COLORS = { Common:C.dim, Uncommon:"#4ade80", Rare:C.cyan, Epic:C.purple, Legendary:C.gold };
const CATS = ["All", ...Array.from(new Set(ALL_ITEMS.map(i=>i.cat))).sort()];
const RARITIES = ["All","Common","Uncommon","Rare","Epic","Legendary"];

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
const SECTIONS = ["LOOT","QUESTS","WORKSHOP","ENEMIES"];

export default function App() {
  const [section, setSection] = useState("LOOT");
  const [search, setSearch] = useState("");
  // Loot state
  const [decFilter, setDecFilter] = useState("all");
  const [catFilter, setCatFilter] = useState("All");
  const [rarFilter, setRarFilter] = useState("All");
  // Quest state
  const [npc, setNpc] = useState("Shani");
  const [expanded, setExpanded] = useState(null);

  const filteredLoot = ALL_ITEMS.filter(item => {
    const s = search.toLowerCase();
    return (!s || item.name.toLowerCase().includes(s) || item.note.toLowerCase().includes(s) || item.cat.toLowerCase().includes(s))
      && (decFilter === "all" || item.decision === decFilter)
      && (catFilter === "All" || item.cat === catFilter)
      && (rarFilter === "All" || item.rarity === rarFilter);
  });

  const filteredQuests = !search ? questData[npc].quests : questData[npc].quests.filter(q =>
    q.name.toLowerCase().includes(search.toLowerCase()) ||
    q.obj.toLowerCase().includes(search.toLowerCase()) ||
    (q.where||"").toLowerCase().includes(search.toLowerCase()) ||
    q.map.toLowerCase().includes(search.toLowerCase())
  );

  const filteredWorkshop = !search ? workshopData : workshopData.filter(st =>
    st.name.toLowerCase().includes(search.toLowerCase()) ||
    st.levels.some(l => l.materials.toLowerCase().includes(search.toLowerCase()) || l.unlocks.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{...F, background:C.bg, minHeight:"100vh", color:C.text}}>
      <div style={{position:"fixed",inset:0,backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,229,255,0.008) 2px,rgba(0,229,255,0.008) 4px)",pointerEvents:"none",zIndex:0}}/>
      <div style={{position:"relative",zIndex:1,maxWidth:960,margin:"0 auto",padding:"18px 14px"}}>

        {/* Header */}
        <div style={{textAlign:"center",marginBottom:18}}>
          <div style={{display:"inline-block",border:`1px solid ${C.cyan}33`,borderTop:`2px solid ${C.cyan}`,padding:"3px 18px",marginBottom:5}}>
            <span style={{fontSize:9,letterSpacing:5,color:`${C.cyan}88`}}>SPERANZA TACTICAL DATABASE · ALL MAPS</span>
          </div>
          <h1 style={{fontSize:19,fontWeight:900,letterSpacing:3,margin:"5px 0 3px",color:C.textBright,textTransform:"uppercase"}}>ARC RAIDERS FIELD GUIDE</h1>
          <p style={{fontSize:9,color:C.textDim,letterSpacing:2,margin:0}}>COMPLETE LOOT ({ALL_ITEMS.length} ITEMS) · QUEST WALKTHROUGHS · WORKSHOP — FLASHPOINT UPDATE</p>
        </div>

        {/* Main section tabs */}
        <div style={{display:"flex",gap:3,marginBottom:14}}>
          {SECTIONS.map(sec=>(
            <button key={sec} onClick={()=>{setSection(sec);setSearch("");setExpanded(null);setDecFilter("all");}} style={{
              flex:1,padding:"10px 4px",
              background:section===sec?"#0d1a14":C.panel,
              border:section===sec?`1px solid ${C.cyan}`:`1px solid ${C.border}`,
              borderTop:section===sec?`2px solid ${C.cyan}`:"2px solid transparent",
              color:section===sec?C.cyan:C.dim,
              cursor:"pointer",fontSize:11,letterSpacing:4,...F,fontWeight:section===sec?700:400,
            }}>{sec}</button>
          ))}
        </div>

        {/* Search */}
        <div style={{marginBottom:12,position:"relative"}}>
          <span style={{position:"absolute",left:9,top:"50%",transform:"translateY(-50%)",color:`${C.cyan}44`,fontSize:13}}>⌕</span>
          <input value={search} onChange={e=>{setSearch(e.target.value);setExpanded(null);}}
            placeholder={`SEARCH ${section}...`}
            style={{width:"100%",boxSizing:"border-box",background:"#0c1215",border:`1px solid ${C.borderBright}`,borderLeft:`2px solid ${C.cyan}44`,color:"#a8d8e8",padding:"8px 10px 8px 26px",fontSize:10,letterSpacing:1,outline:"none",...F}}/>
        </div>

        {/* ── LOOT ── */}
        {section==="LOOT" && (
          <>
            {/* Decision filter cards */}
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(120px,1fr))",gap:5,marginBottom:12}}>
              <div onClick={()=>setDecFilter("all")} style={{padding:"7px 8px",cursor:"pointer",border:`1px solid ${decFilter==="all"?C.cyan:C.border}`,borderTop:`2px solid ${decFilter==="all"?C.cyan:"transparent"}`,background:decFilter==="all"?"#0c1a14":C.panel}}>
                <div style={{fontSize:8,letterSpacing:2,color:decFilter==="all"?C.cyan:C.dim}}>ALL</div>
                <div style={{fontSize:13,fontWeight:700,color:C.textBright}}>{ALL_ITEMS.length}</div>
              </div>
              {Object.entries(DECISIONS).map(([key,d])=>(
                <div key={key} onClick={()=>setDecFilter(decFilter===key?"all":key)} style={{padding:"7px 8px",cursor:"pointer",border:`1px solid ${decFilter===key?d.color:C.border}`,borderTop:`2px solid ${decFilter===key?d.color:"transparent"}`,background:decFilter===key?d.bg:C.panel}}>
                  <div style={{fontSize:8,letterSpacing:1,color:decFilter===key?d.color:C.dim}}>{d.label}</div>
                  <div style={{fontSize:13,fontWeight:700,color:C.textBright}}>{ALL_ITEMS.filter(i=>i.decision===key).length}</div>
                </div>
              ))}
            </div>

            {/* Sub-filters */}
            <div style={{display:"flex",gap:6,marginBottom:10,flexWrap:"wrap"}}>
              <select value={rarFilter} onChange={e=>setRarFilter(e.target.value)} style={{flex:"1 1 120px",background:"#0c1215",border:`1px solid ${C.border}`,color:C.textDim,padding:"7px 8px",fontSize:10,...F,outline:"none"}}>
                {RARITIES.map(r=><option key={r} value={r}>{r==="All"?"All Rarities":r}</option>)}
              </select>
              <select value={catFilter} onChange={e=>setCatFilter(e.target.value)} style={{flex:"1 1 140px",background:"#0c1215",border:`1px solid ${C.border}`,color:C.textDim,padding:"7px 8px",fontSize:10,...F,outline:"none"}}>
                {CATS.map(c=><option key={c} value={c}>{c==="All"?"All Categories":c}</option>)}
              </select>
            </div>

            <div style={{fontSize:9,color:C.dim,letterSpacing:2,marginBottom:8}}>SHOWING {filteredLoot.length} OF {ALL_ITEMS.length} ITEMS</div>

            <div style={{border:`1px solid ${C.border}`}}>
              <div style={{display:"grid",gridTemplateColumns:"190px 75px 95px 90px 1fr",background:"#0c1115",borderBottom:`1px solid ${C.border}`}}>
                {["ITEM","RARITY","CATEGORY","ACTION / QTY","WHY / DETAILS"].map(h=>(
                  <div key={h} style={{padding:"5px 9px",fontSize:8,letterSpacing:2,color:C.dimmer,borderRight:`1px solid ${C.border}`}}>{h}</div>
                ))}
              </div>
              {filteredLoot.length===0 && <div style={{padding:24,textAlign:"center",color:C.dim,fontSize:11,letterSpacing:3}}>NO ITEMS MATCH</div>}
              {filteredLoot.map((item,i)=>{
                const d=DECISIONS[item.decision];
                return (
                  <div key={i} style={{display:"grid",gridTemplateColumns:"190px 75px 95px 90px 1fr",borderBottom:i<filteredLoot.length-1?`1px solid #0f1820`:"none",background:i%2===0?"#090c0e":"#0b0e11"}}
                    onMouseEnter={e=>e.currentTarget.style.background=`${d.color}0a`}
                    onMouseLeave={e=>e.currentTarget.style.background=i%2===0?"#090c0e":"#0b0e11"}>
                    <div style={{padding:"7px 9px",fontSize:10,color:C.textBright,display:"flex",alignItems:"center",gap:5,borderRight:`1px solid #0f1820`}}>
                      <span style={{width:3,height:3,background:d.color,flexShrink:0,display:"inline-block"}}/>
                      {item.name}
                    </div>
                    <div style={{padding:"7px 9px",fontSize:9,color:RARE_COLORS[item.rarity]||C.dim,borderRight:`1px solid #0f1820`,display:"flex",alignItems:"center"}}>{item.rarity}</div>
                    <div style={{padding:"7px 9px",fontSize:9,color:C.textDim,borderRight:`1px solid #0f1820`,display:"flex",alignItems:"center"}}>{item.cat}</div>
                    <div style={{padding:"7px 7px",borderRight:`1px solid #0f1820`,display:"flex",flexDirection:"column",gap:3,justifyContent:"center"}}>
                      <span style={{fontSize:8,letterSpacing:1,color:d.color,background:d.bg,border:`1px solid ${d.color}44`,padding:"2px 4px",textAlign:"center"}}>{d.label}</span>
                      {item.qty && item.qty!=="–" && <span style={{fontSize:9,color:C.gold,textAlign:"center",fontWeight:700}}>{item.qty}</span>}
                    </div>
                    <div style={{padding:"7px 9px",fontSize:10,color:C.textDim,lineHeight:1.6,display:"flex",alignItems:"center"}}>{item.note}</div>
                  </div>
                );
              })}
            </div>
            <div style={{marginTop:10,display:"flex",flexWrap:"wrap",gap:6}}>
              {Object.entries(DECISIONS).map(([key,d])=>(
                <div key={key} style={{display:"flex",alignItems:"center",gap:5,padding:"3px 7px",background:d.bg,border:`1px solid ${d.color}33`}}>
                  <span style={{width:3,height:3,background:d.color,display:"inline-block"}}/>
                  <span style={{fontSize:8,letterSpacing:2,color:d.color}}>{d.label}</span>
                </div>
              ))}
              <span style={{fontSize:8,color:C.dimmer,letterSpacing:1,alignSelf:"center"}}>· ALWAYS RECYCLE AT SPERANZA, NOT MID-RAID · QTY = MINIMUM TO KEEP</span>
            </div>
          </>
        )}

        {/* ── QUESTS ── */}
        {section==="QUESTS" && (
          <>
            <div style={{fontSize:9,color:C.textDim,letterSpacing:2,marginBottom:10}}>
              TAP ANY QUEST FOR FULL WALKTHROUGH · ITEMS IN STASH COUNT · RESETS ON EXPEDITION
            </div>
            <div style={{display:"flex",gap:3,marginBottom:12,flexWrap:"wrap"}}>
              {Object.keys(questData).map(n=>{
                const col=questData[n].color;
                const active=npc===n;
                return (
                  <button key={n} onClick={()=>{setNpc(n);setExpanded(null);}} style={{
                    flex:"1 1 auto",padding:"7px 4px",
                    background:active?"#0d1410":C.panel,
                    border:active?`1px solid ${col}`:`1px solid ${C.border}`,
                    borderTop:active?`2px solid ${col}`:"2px solid transparent",
                    color:active?col:C.dim,
                    cursor:"pointer",fontSize:10,letterSpacing:2,...F,fontWeight:active?700:400,whiteSpace:"nowrap",
                  }}>{n.toUpperCase()}</button>
                );
              })}
            </div>
            <div style={{border:`1px solid ${questData[npc].color}33`,borderLeft:`3px solid ${questData[npc].color}`,padding:"7px 12px",marginBottom:12,background:"#0c1014"}}>
              <span style={{fontSize:10,color:questData[npc].color,letterSpacing:2,fontWeight:700}}>{npc.toUpperCase()} — </span>
              <span style={{fontSize:10,color:C.textDim}}>{questData[npc].role} · {questData[npc].focus}</span>
            </div>

            {filteredQuests.map((q,qi)=>{
              const key=`${npc}-${qi}`;
              const open=expanded===key;
              const col=questData[npc].color;
              return (
                <div key={qi} style={{border:`1px solid ${open?col+"55":C.border}`,marginBottom:6,background:C.panel}}>
                  <div onClick={()=>setExpanded(open?null:key)}
                    style={{padding:"10px 12px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8,
                      background:open?`${col}08`:"transparent",borderBottom:open?`1px solid ${C.border}`:"none"}}
                    onMouseEnter={e=>e.currentTarget.style.background=`${col}0a`}
                    onMouseLeave={e=>e.currentTarget.style.background=open?`${col}08`:"transparent"}>
                    <div style={{flex:1}}>
                      <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",marginBottom:4}}>
                        <span style={{fontSize:10,color:col,fontWeight:700}}>#{q.num}</span>
                        <span style={{fontSize:11,color:C.textBright,fontWeight:700}}>{q.name}</span>
                        <span style={{fontSize:8,letterSpacing:2,color:col,background:`${col}15`,border:`1px solid ${col}44`,padding:"2px 6px"}}>{q.map}</span>
                      </div>
                      <div style={{fontSize:10,color:C.textDim,lineHeight:1.5}}>{q.obj}</div>
                    </div>
                    <span style={{color:col,fontSize:14,flexShrink:0,marginTop:2}}>{open?"▲":"▼"}</span>
                  </div>
                  {open && (
                    <div style={{padding:"12px 14px"}}>
                      <div style={{marginBottom:10}}>
                        <div style={{fontSize:8,letterSpacing:3,color:col,marginBottom:4}}>📍 WHERE TO GO + FIND ITEMS</div>
                        <div style={{fontSize:10,color:C.text,lineHeight:1.7,background:`${col}08`,padding:"8px 10px",borderLeft:`2px solid ${col}44`}}>{q.where}</div>
                      </div>
                      {q.bring && (
                        <div style={{marginBottom:10}}>
                          <div style={{fontSize:8,letterSpacing:3,color:C.gold,marginBottom:4}}>🎒 BRING INTO RAID</div>
                          <div style={{fontSize:10,color:C.text,background:`${C.gold}08`,padding:"8px 10px",borderLeft:`2px solid ${C.gold}44`}}>{q.bring}</div>
                        </div>
                      )}
                      <div style={{marginBottom:10}}>
                        <div style={{fontSize:8,letterSpacing:3,color:C.green,marginBottom:4}}>STEP-BY-STEP</div>
                        <div style={{background:`${C.green}06`,padding:"8px 10px",borderLeft:`2px solid ${C.green}33`}}>
                          {q.steps.map((step,si)=>(
                            <div key={si} style={{display:"flex",gap:8,marginBottom:si<q.steps.length-1?5:0}}>
                              <span style={{color:C.green,fontSize:9,fontWeight:700,flexShrink:0,marginTop:1}}>{si+1}.</span>
                              <span style={{fontSize:10,color:C.text,lineHeight:1.6}}>{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                        <div style={{background:`${C.orange}08`,padding:"8px 10px",borderLeft:`2px solid ${C.orange}44`}}>
                          <div style={{fontSize:8,letterSpacing:3,color:C.orange,marginBottom:4}}>⚡ PRO TIP</div>
                          <div style={{fontSize:10,color:C.textDim,lineHeight:1.6}}>{q.tip}</div>
                        </div>
                        <div style={{background:`${C.gold}08`,padding:"8px 10px",borderLeft:`2px solid ${C.gold}44`}}>
                          <div style={{fontSize:8,letterSpacing:3,color:C.gold,marginBottom:4}}>★ REWARD</div>
                          <div style={{fontSize:10,color:C.gold,lineHeight:1.6}}>{q.reward}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            {filteredQuests.length===0 && <div style={{textAlign:"center",color:C.dim,fontSize:11,padding:30,letterSpacing:3}}>NO RESULTS</div>}
          </>
        )}

        {/* ── WORKSHOP ── */}
        {section==="WORKSHOP" && (
          <>
            <div style={{fontSize:9,color:C.textDim,letterSpacing:2,marginBottom:12}}>
              UPGRADE ORDER: GUNSMITH L2 → SCRAPPY L2 → GEAR BENCH L2 → REST BY PLAYSTYLE
            </div>
            {filteredWorkshop.map((st,si)=>(
              <div key={si} style={{marginBottom:18}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
                  <span style={{fontSize:14}}>{st.icon}</span>
                  <div style={{width:3,height:15,background:st.color}}/>
                  <span style={{fontSize:12,letterSpacing:3,color:st.color,fontWeight:700}}>{st.name.toUpperCase()}</span>
                  <div style={{flex:1,height:1,background:`${st.color}22`}}/>
                </div>
                {st.note && <div style={{fontSize:10,color:C.textDim,marginBottom:7,paddingLeft:27,lineHeight:1.6}}>{st.note}</div>}
                <div style={{border:`1px solid ${C.border}`}}>
                  <div style={{display:"grid",gridTemplateColumns:"80px 1fr 1fr",background:"#0c1115",borderBottom:`1px solid ${C.border}`}}>
                    {["LEVEL","UNLOCKS","MATERIALS REQUIRED"].map(h=>(
                      <div key={h} style={{padding:"5px 10px",fontSize:8,letterSpacing:2,color:C.dimmer,borderRight:`1px solid ${C.border}`}}>{h}</div>
                    ))}
                  </div>
                  {st.levels.map((lvl,li)=>(
                    <div key={li} style={{display:"grid",gridTemplateColumns:"80px 1fr 1fr",borderBottom:li<st.levels.length-1?`1px solid #0f1820`:"none",background:li%2===0?"#090c0e":"#0b0e11"}}
                      onMouseEnter={e=>e.currentTarget.style.background="#0e1a22"}
                      onMouseLeave={e=>e.currentTarget.style.background=li%2===0?"#090c0e":"#0b0e11"}>
                      <div style={{padding:"9px 10px",fontSize:11,color:st.color,fontWeight:700,borderRight:`1px solid #0f1820`}}>{lvl.level}</div>
                      <div style={{padding:"9px 10px",fontSize:10,color:C.text,borderRight:`1px solid #0f1820`,lineHeight:1.5}}>{lvl.unlocks}</div>
                      <div style={{padding:"9px 10px",fontSize:10,color:C.textDim,lineHeight:1.5}}>{lvl.materials}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {filteredWorkshop.length===0 && <div style={{textAlign:"center",color:C.dim,fontSize:11,padding:30,letterSpacing:3}}>NO RESULTS</div>}
          </>
        )}

        {/* ── ENEMIES ── */}
        {section==="ENEMIES" && (
          <>
            <div style={{fontSize:9,color:C.textDim,letterSpacing:2,marginBottom:12}}>
              18 ARC TYPES · TAP ANY ENEMY FOR FULL TACTICS · ALL ARC DROP ARC ALLOY + UNIQUE PARTS
            </div>

            {/* Tier legend */}
            <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:14}}>
              {TIER_ORDER.filter(t=>t!=="Loot Object").map(tier=>(
                <div key={tier} style={{display:"flex",alignItems:"center",gap:5,padding:"3px 8px",background:`${TIER_COLORS[tier]}10`,border:`1px solid ${TIER_COLORS[tier]}44`}}>
                  <span style={{width:3,height:3,background:TIER_COLORS[tier],display:"inline-block"}}/>
                  <span style={{fontSize:8,letterSpacing:2,color:TIER_COLORS[tier]}}>{tier.toUpperCase()}</span>
                </div>
              ))}
              <div style={{display:"flex",alignItems:"center",gap:5,padding:"3px 8px",background:`${TIER_COLORS["Loot Object"]}10`,border:`1px solid ${TIER_COLORS["Loot Object"]}44`}}>
                <span style={{width:3,height:3,background:TIER_COLORS["Loot Object"],display:"inline-block"}}/>
                <span style={{fontSize:8,letterSpacing:2,color:TIER_COLORS["Loot Object"]}}>LOOT OBJECT</span>
              </div>
            </div>

            {TIER_ORDER.map(tier=>{
              const tierEnemies = ENEMIES.filter(e=>e.tier===tier && (!search || e.name.toLowerCase().includes(search.toLowerCase()) || e.drops.join(" ").toLowerCase().includes(search.toLowerCase()) || e.weakness.toLowerCase().includes(search.toLowerCase())));
              if(!tierEnemies.length) return null;
              const col = TIER_COLORS[tier];
              return (
                <div key={tier} style={{marginBottom:20}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                    <div style={{width:3,height:14,background:col}}/>
                    <span style={{fontSize:9,letterSpacing:4,color:col,fontWeight:700}}>{tier.toUpperCase()}</span>
                    <div style={{flex:1,height:1,background:`${col}22`}}/>
                    <span style={{fontSize:9,color:C.dimmer,letterSpacing:2}}>{tierEnemies.length} ENEMIES</span>
                  </div>
                  {tierEnemies.map((enemy,ei)=>{
                    const key=`enemy-${enemy.name}`;
                    const open=expanded===key;
                    return (
                      <div key={ei} style={{border:`1px solid ${open?col+"55":C.border}`,marginBottom:6,background:C.panel}}>
                        {/* Header */}
                        <div onClick={()=>setExpanded(open?null:key)}
                          style={{padding:"10px 12px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8,
                            background:open?`${col}08`:"transparent",borderBottom:open?`1px solid ${C.border}`:"none"}}
                          onMouseEnter={e=>e.currentTarget.style.background=`${col}0a`}
                          onMouseLeave={e=>e.currentTarget.style.background=open?`${col}08`:"transparent"}>
                          <div style={{flex:1}}>
                            <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",marginBottom:4}}>
                              <span style={{fontSize:12,color:col,fontWeight:900}}>{enemy.name.toUpperCase()}</span>
                              <span style={{fontSize:8,letterSpacing:2,color:col,background:`${col}15`,border:`1px solid ${col}44`,padding:"2px 6px"}}>{tier}</span>
                            </div>
                            <div style={{fontSize:10,color:C.textDim}}>
                              <span style={{color:`${col}88`}}>Weakness: </span>{enemy.weakness}
                            </div>
                          </div>
                          <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4,flexShrink:0}}>
                            <span style={{color:col,fontSize:14}}>{open?"▲":"▼"}</span>
                          </div>
                        </div>

                        {/* Expanded */}
                        {open && (
                          <div style={{padding:"12px 14px"}}>
                            {/* Where to find */}
                            <div style={{marginBottom:10}}>
                              <div style={{fontSize:8,letterSpacing:3,color:col,marginBottom:4}}>📍 WHERE TO FIND</div>
                              <div style={{fontSize:10,color:C.text,lineHeight:1.7,background:`${col}08`,padding:"8px 10px",borderLeft:`2px solid ${col}44`}}>{enemy.where}</div>
                            </div>
                            {/* How to kill */}
                            <div style={{marginBottom:10}}>
                              <div style={{fontSize:8,letterSpacing:3,color:C.green,marginBottom:4}}>⚔ HOW TO KILL</div>
                              <div style={{fontSize:10,color:C.text,lineHeight:1.7,background:`${C.green}06`,padding:"8px 10px",borderLeft:`2px solid ${C.green}33`}}>{enemy.how}</div>
                            </div>
                            {/* Ammo + Drops side by side */}
                            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
                              <div style={{background:`${C.cyan}08`,padding:"8px 10px",borderLeft:`2px solid ${C.cyan}44`}}>
                                <div style={{fontSize:8,letterSpacing:3,color:C.cyan,marginBottom:4}}>🔫 BEST AMMO / WEAPON</div>
                                <div style={{fontSize:10,color:C.textDim,lineHeight:1.6}}>{enemy.ammo}</div>
                              </div>
                              <div style={{background:`${C.gold}08`,padding:"8px 10px",borderLeft:`2px solid ${C.gold}44`}}>
                                <div style={{fontSize:8,letterSpacing:3,color:C.gold,marginBottom:4}}>📦 DROPS</div>
                                <div style={{display:"flex",flexDirection:"column",gap:3}}>
                                  {enemy.drops.map((d,di)=>(
                                    <span key={di} style={{fontSize:10,color:C.gold}}>{d}</span>
                                  ))}
                                </div>
                              </div>
                            </div>
                            {/* Tip */}
                            <div style={{background:`${C.orange}08`,padding:"8px 10px",borderLeft:`2px solid ${C.orange}44`}}>
                              <div style={{fontSize:8,letterSpacing:3,color:C.orange,marginBottom:4}}>⚡ PRO TIP</div>
                              <div style={{fontSize:10,color:C.textDim,lineHeight:1.6}}>{enemy.tip}</div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
            {ENEMIES.filter(e=>!search||e.name.toLowerCase().includes(search.toLowerCase())||e.drops.join(" ").toLowerCase().includes(search.toLowerCase())).length===0 && (
              <div style={{textAlign:"center",color:C.dim,fontSize:11,padding:30,letterSpacing:3}}>NO RESULTS</div>
            )}
          </>
        )}

        <div style={{marginTop:20,borderTop:`1px solid ${C.border}`,paddingTop:10,fontSize:9,color:C.dimmer,letterSpacing:2,textAlign:"center"}}>
          FLASHPOINT UPDATE · RECYCLE AT SPERANZA ONLY · QUESTS RESET ON EXPEDITION
        </div>
      </div>
    </div>
  );
}
