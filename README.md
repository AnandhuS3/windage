                                                      # WindAge 

A high-performance, dark-themed cinematic landing page for **WindAge**, a fictional professional cinema camera system. Built with React, Vite, Framer Motion, and Tailwind CSS.

## ✨ Features

- **Scroll-driven Image Sequence** — Apple-style hero with 78-frame spring-damped animation synced to scroll position
- **Cinematic Storytelling** — Three scroll-triggered text phases with smooth fade/slide transitions
- **Interactive Ecosystem Section** — Hoverable hotspots on a modular camera diagram with animated overlay panels
- **Tech Specs Table** — Clean, monospaced component specification table
- **Animated Backgrounds** — Ambient red glow blobs, radial pulse effects, and micro-animations throughout
- **Custom SVG Favicon & Navbar Icon** — Branded camera icon used in both the browser tab and the navbar logo

## 🛠 Tech Stack

| Tool | Purpose |
|---|---|
| [React 18](https://react.dev/) | UI framework |
| [Vite](https://vitejs.dev/) | Build tool & dev server |
| [Framer Motion](https://www.framer.com/motion/) | Scroll & animation engine |
| [Lucide React](https://lucide.dev/) | Icon library |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling |
| [Google Fonts](https://fonts.google.com/) | Inter & JetBrains Mono typefaces |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

## 📁 Project Structure

```
animated landing page/
├── public/
│   ├── favicon.svg          # Site & navbar icon
│   ├── camera_sensor.png    # Sensor section image
│   └── assets/
│       ├── hero/            # 78-frame scroll sequence PNGs (02–80)
│       └── images/
│           └── camera_parts.png
├── src/
│   ├── App.jsx              # Main component (Navbar, HeroSequence, sections)
│   ├── main.jsx             # React entry point
│   └── index.css            # Global styles
├── index.html
├── vite.config.js
└── package.json
```

## 🎬 Sections

1. **Hero Sequence** — Scroll-pinned full-screen image animation with 3 overlaid text phases
2. **Full-Frame Brilliance** — Sensor overview with animated stats cards and pulsing sensor graphic
3. **Professional Ecosystem** — Interactive exploded camera diagram with hoverable module hotspots
4. **Integrated Accessories** — Technical specifications table
5. **Performance Footer** — CTA section with key camera specs and pre-order button

## 📄 License

© 2026 WindAge Cinematic Systems.
