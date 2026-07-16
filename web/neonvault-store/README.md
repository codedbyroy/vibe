# 🌌 NeonVault Store — Premium Anime Collectibles E-Commerce

**NeonVault Store** is a high-fidelity, premium anime figures and collectibles e-commerce web platform. It features custom glassmorphic styling, an editorial dark Cyberpunk aesthetic, and a fully functional frontend cart and store management engine built entirely using **Vibe Coding** workflows.

---

## 🚀 The Vibe Coding Journey

NeonVault was designed and constructed by a conversational AI agent using spec-first prompting.

### 1. The Prompting Strategy
We prompted the agent to build a premium, highly responsive e-commerce web app using:
- **Strict Visual Design Rules**: Deep obsidian slate background (`#0A0A0F`), neon violet headers (`#8B5CF6`), and neon cyan action indicators (`#06B6D4`). Default browser fonts were replaced by custom google fonts.
- **Technology Stack Constraint**: Next.js 15 (App Router) as the framework, but styling had to use pure, vanilla CSS Modules (avoiding Tailwind) for maximum flexibility and performance.
- **State System**: Pure React context API and a reducer pattern (`useReducer`) for handling shopping cart interactions, checkout steps, and product filtering.

### 2. How the Agent Built It
- **The Obsidian Theme**: The agent generated a global CSS modules layout (`globals.css`) containing variables for colors, transition curves, and glassmorphic elevations.
- **Anime Catalog & Filtering**: The agent built a category filtering sidebar allowing dynamic client-side sorting of premium collectibles (by brand, type, or price).
- **Smooth Cart Interactions**: Cart sliding animations and add-to-cart count micro-interactions were designed using vanilla CSS transitions and state hooks.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 15 (App Router, dynamic client rendering)
- **Styling**: Vanilla CSS with CSS Modules
- **State Management**: React Context + `useReducer`
- **Asset Icons**: SVG-based responsive brand icons
- **Deployment**: Vercel

---

## 📂 Project Architecture

```
neonvault-store/
├── public/                 # Static brand media & vector graphics
├── src/
│   ├── app/                # Next.js App Router folders
│   │   ├── layout.js       # App layout shell with theme providers
│   │   └── page.js         # Home product catalog & store grid
│   ├── components/         # Reusable store components
│   │   ├── ProductCard.js  # Card representing individual collectibles
│   │   ├── FilterSidebar.js# Category sorting and filtering panel
│   │   └── CartDrawer.js   # Side-sliding cart drawer
│   ├── context/            # React state context
│   │   └── StoreContext.js # Global e-commerce cart & product reducer
│   └── styles/             # Modular CSS stylesheet components
│       ├── ProductCard.module.css
│       ├── CartDrawer.module.css
│       └── Store.module.css
```

---

## 🚀 Getting Started

To run NeonVault Store locally:

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
