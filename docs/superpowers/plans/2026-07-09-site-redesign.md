# Always Beautiful Site Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the full redesign spec in `docs/superpowers/specs/2026-07-09-site-redesign-design.md` — branding/app shell, header, hero, trust features, skeuomorphic styling, footer, category-sync bug fix, product data, product cards, and a new Product Detail Page.

**Architecture:** No new dependencies. Same state-based page-switching architecture already in `App.tsx` (adds a third `'product'` page state instead of a router). Same hand-rolled inline-SVG icon convention. Shared skeuomorphic CSS utilities and marquee keyframes added once to `src/index.css` and reused via className across components.

**Tech Stack:** React 19, Vite 8, Tailwind CSS v4 (via `@tailwindcss/vite`, no PostCSS), TypeScript 5.7 (strict mode, `noUnusedLocals`/`noUnusedParameters`).

## Global Constraints

- No new npm dependencies (no router, no icon library) — the app currently only depends on `react`/`react-dom`.
- No test runner exists (`package.json` has no `test`/`lint` script). Verification per task = `npx tsc --noEmit -p tsconfig.json` (must report zero errors) + manual check in the running dev server (per `AGENTS.md`, a Vite dev server is always running on `$PORT`, default 8443 — no need to start it).
- Bilingual copy uses each file's existing local `t(lang, es, en)` (or `t(es, en)`) helper pattern — keep using it, don't introduce a new i18n mechanism.
- Buttons stay flat (no skeuomorphic treatment) — skeuomorphic styling applies only to cards, panels, header, footer, category tiles.
- Colombia flag emoji (`🇨🇴`) is removed everywhere; the text "Made in Colombia" (and its Spanish equivalent) is never altered.
- WhatsApp number used everywhere (marquee is text-only, no number needed there) is `+1 (650) 404-7700` / `wa.me/16504047700` — already used in `Header.tsx`, `Footer.tsx`, `HomePage.tsx`; reuse verbatim for the PDP's Buy Now link.
- Footer's new "Designed by Mazhar Creative Agency" credit uses `href="#"` (no destination URL was provided) — not blocking, but flag this to the user in the final summary.

---

### Task 1: Branding & App Shell

**Files:**
- Modify: `.figma/make/site.json`
- Create: `public/favicon.png` (copy of `src/imports/cf2cb152-86cd-4195-a7b5-9bdfb72589f4.png`)

**Interfaces:** None (config-only task, no code consumed by later tasks).

- [ ] **Step 1: Create the `public/` directory and copy the favicon asset**

```bash
mkdir -p public
cp "src/imports/cf2cb152-86cd-4195-a7b5-9bdfb72589f4.png" "public/favicon.png"
```

- [ ] **Step 2: Update `.figma/make/site.json`**

Replace the full file contents with:

```json
{
  "title": "Always Beautiful",
  "description": "An online store featuring a custom logo and integrated contact options via Instagram and WhatsApp for seamless customer inquiries.",
  "icons": {
    "icon": "/favicon.png"
  },
  "robots": {
    "index": false
  },
  "accessibility": {
    "addBypassLinks": false,
    "ignoreReducedMotion": false
  }
}
```

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit -p tsconfig.json`
Expected: no output (0 errors) — this step doesn't touch `.ts`/`.tsx`, this just confirms the repo is still clean before continuing.

Then check the running dev server: open the preview URL and confirm the browser tab shows "Always Beautiful" as the title and the AB monogram as the favicon. If the title/favicon don't update immediately, the dev server may need a restart to pick up the `vite.config.ts`-adjacent JSON change (`vite.config.ts` imports `site.json` directly at module load).

- [ ] **Step 4: Commit**

```bash
git add .figma/make/site.json public/favicon.png
git commit -m "feat: set site title, description, and favicon"
```

---

### Task 2: CSS Foundation + Header Redesign

**Files:**
- Modify: `src/index.css`
- Modify: `src/components/Header.tsx`

**Interfaces:**
- Produces (CSS classes later tasks depend on): `.marquee-track` (scrolling marquee, expects two duplicated child groups), `.skeu-surface` (light-surface embossed look — cards/panels), `.skeu-surface-dark` (dark-surface embossed look — header/footer), `.skeu-badge` (small embossed circular badge shadow, no gradient/border, meant to sit on top of a `.skeu-surface`/`.skeu-surface-dark` parent or a flat light background).

- [ ] **Step 1: Append the shared CSS utilities to `src/index.css`**

Add this block at the end of the file (after the existing `*::-webkit-scrollbar-thumb` rule):

```css

/* Marquee */
@keyframes marquee-scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee-scroll 22s linear infinite;
}

.marquee-track:hover,
.marquee-track:focus-within {
  animation-play-state: paused;
}

@media (prefers-reduced-motion: reduce) {
  .marquee-track {
    animation: none;
  }
}

/* Skeuomorphic surfaces */
.skeu-surface {
  background-image: linear-gradient(180deg, rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 255, 0) 40%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.65),
    inset 0 -1px 0 rgba(43, 43, 43, 0.06),
    0 10px 24px rgba(90, 45, 156, 0.12),
    0 2px 6px rgba(90, 45, 156, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.6);
}

.skeu-surface-dark {
  background-image: linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 40%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.12),
    inset 0 -1px 0 rgba(0, 0, 0, 0.25),
    0 10px 24px rgba(0, 0, 0, 0.28),
    0 2px 6px rgba(0, 0, 0, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.skeu-badge {
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.7),
    inset 0 -1px 0 rgba(90, 45, 156, 0.15),
    0 4px 10px rgba(90, 45, 156, 0.18);
}
```

- [ ] **Step 2: Bump the header logo size**

In `src/components/Header.tsx`, find (around line 51):

```tsx
              className="h-10 w-auto object-contain"
```

Replace with:

```tsx
              className="h-12 w-auto object-contain"
```

- [ ] **Step 3: Switch the wordmark font from Playfair Display to the default sans (Poppins)**

Find (around lines 54-59):

```tsx
            <span
              className="text-white font-semibold text-lg hidden sm:block"
              style={{ fontFamily: "'Playfair Display', serif", letterSpacing: '0.02em' }}
            >
              Always Beautiful
            </span>
```

Replace with:

```tsx
            <span
              className="text-white font-semibold text-lg hidden sm:block"
              style={{ letterSpacing: '0.02em' }}
            >
              Always Beautiful
            </span>
```

(No `fontFamily` override left — it now inherits the page's default `font-sans` / Poppins, already loaded in `index.css` and already the `<body>` default.)

- [ ] **Step 4: Replace the static announcement bar with a scrolling marquee**

Find (around lines 31-38):

```tsx
      {/* Announcement bar */}
      <div
        className="text-white text-xs font-medium text-center py-2 px-4"
        style={{ backgroundColor: '#E845A3' }}
      >
        🇨🇴 {t('Hecho en Colombia · Envíos a todo Estados Unidos', 'Made in Colombia · Shipping across the USA')} &nbsp;|&nbsp;
        {t('Consultas por WhatsApp', 'Inquiries via WhatsApp')}: +1 (650) 404-7700
      </div>
```

Replace with:

```tsx
      {/* Announcement marquee */}
      <div
        className="text-white text-xs font-medium py-2 overflow-hidden"
        style={{ backgroundColor: '#E845A3' }}
      >
        <div className="marquee-track">
          {[0, 1].map((rep) => (
            <div key={rep} className="flex items-center shrink-0" aria-hidden={rep === 1}>
              {[t('Hecho en Colombia', 'Made in Colombia'), t('Envíos a toda USA', 'Shipping across USA'), 'WhatsApp'].map(
                (item, i) => (
                  <span key={i} className="px-6 whitespace-nowrap">
                    {item}
                  </span>
                )
              )}
            </div>
          ))}
        </div>
      </div>
```

- [ ] **Step 5: Apply the skeuomorphic surface to the main header bar**

Find (around lines 41-44):

```tsx
      <header
        className="sticky top-0 z-50 shadow-sm"
        style={{ backgroundColor: '#5A2D9C' }}
      >
```

Replace with:

```tsx
      <header
        className="sticky top-0 z-50 skeu-surface-dark"
        style={{ backgroundColor: '#5A2D9C' }}
      >
```

- [ ] **Step 6: Verify**

Run: `npx tsc --noEmit -p tsconfig.json`
Expected: no output (0 errors).

Open the running dev server preview and confirm: the top bar text ("Hecho en Colombia" / "Shipping across USA" / "WhatsApp") scrolls continuously and loops seamlessly, with no flag emoji anywhere in it; the logo is visibly larger; the "Always Beautiful" wordmark (desktop width) renders in the sans-serif Poppins font, not the old serif; the header bar has a subtle raised/embossed look (soft inner highlight + outer shadow) instead of a flat fill.

- [ ] **Step 7: Commit**

```bash
git add src/index.css src/components/Header.tsx
git commit -m "feat: add skeuomorphic/marquee CSS foundation and redesign header"
```

---

### Task 3: Footer Redesign

**Files:**
- Modify: `src/components/Footer.tsx`

**Interfaces:**
- Consumes: `.skeu-surface-dark` (from Task 2, `src/index.css`).

- [ ] **Step 1: Apply the skeuomorphic surface to the footer**

Find (line 14):

```tsx
    <footer style={{ backgroundColor: '#1a0a30' }}>
```

Replace with:

```tsx
    <footer className="skeu-surface-dark" style={{ backgroundColor: '#1a0a30' }}>
```

- [ ] **Step 2: Remove the flag emoji from the Contact column's "Made in Colombia" line**

Find (around lines 141-144):

```tsx
              <li className="flex items-center gap-2">
                <span style={{ color: '#B384C8' }}>●</span>
                {t(lang, '🇨🇴 Hecho en Colombia', '🇨🇴 Made in Colombia')}
              </li>
```

Replace with:

```tsx
              <li className="flex items-center gap-2">
                <span style={{ color: '#B384C8' }}>●</span>
                {t(lang, 'Hecho en Colombia', 'Made in Colombia')}
              </li>
```

- [ ] **Step 3: Dynamic copyright year, remove the "Made with ❤️" line, add the credit link**

Find (around lines 150-153):

```tsx
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30">
          <p>© 2025 Always Beautiful. {t(lang, 'Todos los derechos reservados.', 'All rights reserved.')}</p>
          <p>{t(lang, 'Hecho con ❤️ en Colombia para el mundo.', 'Made with ❤️ in Colombia for the world.')}</p>
        </div>
```

Replace with:

```tsx
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30">
          <p>© {new Date().getFullYear()} Always Beautiful. {t(lang, 'Todos los derechos reservados.', 'All rights reserved.')}</p>
          <a href="#" className="hover:text-white/60 transition-colors">
            Designed by Mazhar Creative Agency
          </a>
        </div>
```

- [ ] **Step 4: Verify**

Run: `npx tsc --noEmit -p tsconfig.json`
Expected: no output (0 errors).

Open the dev server preview, scroll to the footer, and confirm: no flag emoji anywhere in the footer; the bottom bar shows "© 2026 Always Beautiful..." (today's year) and a clickable "Designed by Mazhar Creative Agency" link where the old "Made with ❤️" line was; the footer panel has the same soft embossed look as the header.

- [ ] **Step 5: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "feat: redesign footer (dynamic year, credit link, skeuomorphic surface)"
```

---

### Task 4: Category Browsing Sync Fix + Skeuomorphic Filter Panels

**Files:**
- Modify: `src/components/ShopPage.tsx`

**Interfaces:**
- Consumes: `.skeu-surface` (from Task 2, `src/index.css`).

- [ ] **Step 1: Reproduce the bug manually (before fixing)**

In the dev server preview: go to Shop, filter to "Fajas" (grid shows only Fajas products). Without leaving the Shop page, use the header nav to jump to "Leggings". Expected (buggy) result: the grid/sidebar still show "Fajas" selected instead of switching to "Leggings" — confirms the bug described in the spec (`ShopPage`'s local `activeCategory` state is seeded once from `initialCategory` and never re-synced).

- [ ] **Step 2: Fix — re-sync local state when the prop changes**

In `src/components/ShopPage.tsx`, find (line 1):

```tsx
import { useState, useMemo } from 'react'
```

Replace with:

```tsx
import { useState, useMemo, useEffect } from 'react'
```

Find (line 18):

```tsx
  const [activeCategory, setActiveCategory] = useState<Category | null>(initialCategory)
```

Replace with:

```tsx
  const [activeCategory, setActiveCategory] = useState<Category | null>(initialCategory)

  useEffect(() => {
    setActiveCategory(initialCategory)
  }, [initialCategory])
```

- [ ] **Step 3: Apply the skeuomorphic surface to the desktop filter sidebar**

Find (line 56):

```tsx
        <aside className="hidden lg:block w-56 shrink-0">
```

Replace with:

```tsx
        <aside className="hidden lg:block w-56 shrink-0 skeu-surface rounded-2xl p-5" style={{ backgroundColor: '#fff' }}>
```

- [ ] **Step 4: Apply the skeuomorphic surface to the mobile filter drawer**

Find (line 142):

```tsx
          <div className="absolute left-0 top-0 h-full w-72 overflow-y-auto p-6 shadow-xl" style={{ backgroundColor: '#F4F0FA' }}>
```

Replace with:

```tsx
          <div className="absolute left-0 top-0 h-full w-72 overflow-y-auto p-6 skeu-surface" style={{ backgroundColor: '#F4F0FA' }}>
```

- [ ] **Step 5: Verify**

Run: `npx tsc --noEmit -p tsconfig.json`
Expected: no output (0 errors).

Repeat the Step 1 repro in the dev server preview: filter to "Fajas" on the Shop page, then use the header nav to switch to "Leggings" without leaving Shop. Expected (fixed): the grid and sidebar now correctly show "Leggings" selected and only Leggings products. Also confirm the desktop sidebar and the mobile filter drawer (resize the browser or use device toolbar) both show the soft embossed panel look.

- [ ] **Step 6: Commit**

```bash
git add src/components/ShopPage.tsx
git commit -m "fix: re-sync ShopPage category filter with header nav; style filter panels"
```

---

### Task 5: Product Data — Hyphen Removal & Descriptions

**Files:**
- Modify: `src/data/products.ts`

**Interfaces:**
- Produces: `Product.description?: string`, `Product.descriptionEn?: string` (consumed by Task 8, `ProductDetailPage.tsx`).

- [ ] **Step 1: Add the optional description fields to the `Product` interface**

Find (lines 11-20):

```ts
export interface Product {
  id: number;
  name: string;
  nameEn: string;
  price: number;
  category: Category;
  image: string;
  badge?: 'Oferta' | 'Pieza Única' | 'Nuevo';
  bestseller?: boolean;
}
```

Replace with:

```ts
export interface Product {
  id: number;
  name: string;
  nameEn: string;
  description?: string;
  descriptionEn?: string;
  price: number;
  category: Category;
  image: string;
  badge?: 'Oferta' | 'Pieza Única' | 'Nuevo';
  bestseller?: boolean;
}
```

- [ ] **Step 2: Remove the hyphen from the two Spanish `name` fields that use it as a connector**

Find (line 291):

```ts
    name: 'Conjunto Short push up - Top tiras ajustables',
```

Replace with:

```ts
    name: 'Conjunto Short push up y Top tiras ajustables',
```

Find (line 307):

```ts
    name: 'Conjunto Leggings liso - top manga sisa',
```

Replace with:

```ts
    name: 'Conjunto Leggings liso y top manga sisa',
```

- [ ] **Step 3: Remove hyphens from every `nameEn` field**

Apply each of these 16 replacements (exact `nameEn` line matches):

| Find | Replace |
|---|---|
| `nameEn: 'Bidirectional Push-Up Butt Lifter',` | `nameEn: 'Bidirectional Push Up Butt Lifter',` |
| `nameEn: 'Front-Zip Leggings',` | `nameEn: 'Front Zip Leggings',` |
| `nameEn: 'Full-Mesh Leggings',` | `nameEn: 'Full Mesh Leggings',` |
| `nameEn: 'Push-Up Short (solid)',` | `nameEn: 'Push Up Short (solid)',` |
| `nameEn: 'Comic Print Push-Up Short',` | `nameEn: 'Comic Print Push Up Short',` |
| `nameEn: 'Drip Print Push-Up Short',` | `nameEn: 'Drip Print Push Up Short',` |
| `nameEn: 'Striped Push-Up Short',` | `nameEn: 'Striped Push Up Short',` |
| `nameEn: 'Military Print Push-Up Short',` | `nameEn: 'Military Print Push Up Short',` |
| `nameEn: 'Push-Up Short & Adjustable Top Set',` | `nameEn: 'Push Up Short & Adjustable Top Set',` |
| `nameEn: 'Butt-Lift Leggings & Sleeveless Top Set',` | `nameEn: 'Butt Lift Leggings & Sleeveless Top Set',` |
| `nameEn: 'Butt-Lift Leggings & Strap Top Set',` | `nameEn: 'Butt Lift Leggings & Strap Top Set',` |
| `nameEn: 'Butt-Lift Leggings & Short Sleeve Top Set',` | `nameEn: 'Butt Lift Leggings & Short Sleeve Top Set',` |
| `nameEn: 'Push-Up Leggings & Side Mesh Set (One Size; Grey/Blue)',` | `nameEn: 'Push Up Leggings & Side Mesh Set (One Size; Grey/Blue)',` |
| `nameEn: 'Push-Up Short Bodysuit (one unit, beige)',` | `nameEn: 'Push Up Short Bodysuit (one unit, beige)',` |
| `nameEn: 'Back-Gathered Mesh Tank',` | `nameEn: 'Back Gathered Mesh Tank',` |
| `nameEn: 'Open-Back Solid Tank',` | `nameEn: 'Open Back Solid Tank',` |

- [ ] **Step 4: Add descriptions to the 3 requested products**

Find product id 13 (around lines 129-136):

```ts
  {
    id: 13,
    name: 'Leggings negros',
    nameEn: 'Black Leggings',
    price: 35,
    category: 'Leggings',
    image: UNSPLASH('1584863495140-a320b13a11a8'),
  },
```

Replace with:

```ts
  {
    id: 13,
    name: 'Leggings negros',
    nameEn: 'Black Leggings',
    description: 'El básico infaltable: leggings negros de cintura alta con compresión suave, versátiles para el gym o el día a día.',
    descriptionEn: 'The everyday essential: high-waist black leggings with gentle compression, versatile enough for the gym or daily wear.',
    price: 35,
    category: 'Leggings',
    image: UNSPLASH('1584863495140-a320b13a11a8'),
  },
```

Find product id 16 (around lines 153-160):

```ts
  {
    id: 16,
    name: 'Leggings super héroes',
    nameEn: 'Superhero Leggings',
    price: 45,
    category: 'Leggings',
    image: UNSPLASH('1597586309260-5562dd1c6b3c'),
  },
```

Replace with:

```ts
  {
    id: 16,
    name: 'Leggings super héroes',
    nameEn: 'Superhero Leggings',
    description: 'Leggings de estampado súper héroes con compresión suave y cintura alta. Divertidos, cómodos y con el ajuste perfecto para tu rutina de ejercicio.',
    descriptionEn: 'Superhero-print leggings with gentle compression and a high waist. Fun, comfortable, and shaped to move with your workout.',
    price: 45,
    category: 'Leggings',
    image: UNSPLASH('1597586309260-5562dd1c6b3c'),
  },
```

Find product id 20 (around lines 187-194):

```ts
  {
    id: 20,
    name: 'Top espalda ajustable',
    nameEn: 'Adjustable Back Top',
    price: 25,
    category: 'Tops Deportivos',
    image: UNSPLASH('1586323289103-e309634e2a1b'),
  },
```

Replace with:

```ts
  {
    id: 20,
    name: 'Top espalda ajustable',
    nameEn: 'Adjustable Back Top',
    description: 'Top deportivo con espalda ajustable y soporte medio, ideal para entrenar o usar en el día a día. Tela suave que se adapta a tu cuerpo sin marcar.',
    descriptionEn: 'A sports top with an adjustable back and medium support, perfect for training or everyday wear. Soft fabric that moves with your body without digging in.',
    price: 25,
    category: 'Tops Deportivos',
    image: UNSPLASH('1586323289103-e309634e2a1b'),
  },
```

- [ ] **Step 5: Verify**

Run: `npx tsc --noEmit -p tsconfig.json`
Expected: no output (0 errors).

Search the file for any remaining hyphen inside a `name:`/`nameEn:` string value to confirm none were missed (a `-` inside a parenthetical like `(one unit, beige)` is fine — only literal hyphens as word-joiners were the target, and all 16 + 2 have been listed above).

- [ ] **Step 6: Commit**

```bash
git add src/data/products.ts
git commit -m "feat: remove hyphens from product names, add product descriptions"
```

---

### Task 6: Homepage Hero Redesign

**Files:**
- Modify: `src/components/HomePage.tsx`

**Interfaces:** None beyond what's already in scope (`ImageWithFallback`, existing `t()` helper, existing `onShop` prop).

- [ ] **Step 1: Replace the hero section**

Find the entire hero `<section>` (lines 21-75):

```tsx
      <section className="relative min-h-[88vh] flex items-center overflow-hidden" style={{ backgroundColor: '#1a0a30' }}>
        {/* Background image */}
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1768929096150-9a76dc1d6560?w=1400&h=900&fit=crop&auto=format"
            alt="Always Beautiful activewear"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(90,45,156,0.85) 0%, rgba(26,10,48,0.6) 60%, transparent 100%)' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 py-20">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full text-xs font-semibold text-white/80 border border-white/20 backdrop-blur-sm">
              🇨🇴 {t(lang, 'Hecho en Colombia', 'Made in Colombia')}
            </div>
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-none mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {t(lang, 'Siéntete', 'Feel')}
              <br />
              <em className="italic" style={{ color: '#E845A3' }}>
                {t(lang, 'hermosa.', 'beautiful.')}
              </em>
            </h1>
            <p className="text-white/75 text-lg mb-8 leading-relaxed">
              {t(lang,
                'Fajas colombianas y ropa deportiva que moldean tu figura, elevan tu confianza y te acompañan en cada paso.',
                'Colombian shapewear and activewear that sculpt your figure, elevate your confidence, and move with you every step.'
              )}
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => onShop()}
                className="px-8 py-3.5 rounded-full text-white font-semibold text-sm transition-all duration-200 hover:scale-105 hover:shadow-lg"
                style={{ backgroundColor: '#E845A3' }}
              >
                {t(lang, 'Ver Colección', 'Shop Collection')}
              </button>
              <button
                onClick={() => onShop('Fajas')}
                className="px-8 py-3.5 rounded-full font-semibold text-sm border border-white/40 text-white hover:bg-white/10 transition-all duration-200"
              >
                {t(lang, 'Explorar Fajas', 'Explore Shapewear')}
              </button>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 text-xs">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-white/30" />
        </div>
      </section>
```

Replace with:

```tsx
      <section className="relative overflow-hidden" style={{ backgroundColor: '#1a0a30' }}>
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 py-16 sm:py-20 grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="max-w-xl">
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-none mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {t(lang, 'Siéntete', 'Feel')}
              <br />
              <em className="italic" style={{ color: '#E845A3' }}>
                {t(lang, 'hermosa.', 'beautiful.')}
              </em>
            </h1>
            <p className="text-white/75 text-lg mb-8 leading-relaxed">
              {t(lang,
                'Fajas colombianas y ropa deportiva que moldean tu figura, elevan tu confianza y te acompañan en cada paso.',
                'Colombian shapewear and activewear that sculpt your figure, elevate your confidence, and move with you every step.'
              )}
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => onShop()}
                className="px-8 py-3.5 rounded-full text-white font-semibold text-sm transition-all duration-200 hover:scale-105 hover:shadow-lg"
                style={{ backgroundColor: '#E845A3' }}
              >
                {t(lang, 'Ver Colección', 'Shop Collection')}
              </button>
              <button
                onClick={() => onShop('Fajas')}
                className="px-8 py-3.5 rounded-full font-semibold text-sm border border-white/40 text-white hover:bg-white/10 transition-all duration-200"
              >
                {t(lang, 'Explorar Fajas', 'Explore Shapewear')}
              </button>
            </div>
          </div>

          {/* Framed 1:1 image */}
          <div className="relative mx-auto w-full max-w-md">
            <div
              className="absolute -inset-8 rounded-full opacity-70 pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(232,69,163,0.35) 0%, rgba(90,45,156,0.25) 45%, transparent 70%)',
                filter: 'blur(32px)',
              }}
            />
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{
                aspectRatio: '1/1',
                boxShadow: '0 24px 60px rgba(90,45,156,0.45), 0 4px 14px rgba(0,0,0,0.25), inset 0 0 0 1px rgba(232,69,163,0.35)',
              }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1768929096150-9a76dc1d6560?w=1000&h=1000&fit=crop&auto=format"
                alt="Always Beautiful activewear"
                className="w-full h-full object-contain"
                style={{ backgroundColor: '#2B1245' }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.12) 0%, transparent 35%), radial-gradient(ellipse at center, transparent 55%, rgba(26,10,48,0.55) 100%)',
                }}
              />
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="relative z-10 hidden sm:flex justify-center pb-8">
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-white/30" />
        </div>
      </section>
```

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit -p tsconfig.json`
Expected: no output (0 errors).

Open the dev server preview at the homepage. Confirm: the hero is now a two-column layout on desktop (text left, image right) and stacks with the image below the text on mobile widths; the image sits in a perfect square frame showing the whole photo (not cropped) with a soft glow behind it, a visible drop shadow, a subtle magenta-tinted highlight ring, and a vignette darkening toward the frame's edges; the "Made in Colombia" pill that used to sit above the headline is gone (the trust strip directly below the hero still shows a Colombia item — that's expected, see Task 7).

- [ ] **Step 3: Commit**

```bash
git add src/components/HomePage.tsx
git commit -m "feat: redesign homepage hero as split layout with framed 1:1 image"
```

---

### Task 7: Trust Features — Custom Icons, Embossed Badges, Mobile Grid

**Files:**
- Modify: `src/components/HomePage.tsx`

**Interfaces:**
- Produces: `export function TrustIcon({ name, size }: { name: 'pin' | 'truck' | 'chat' | 'sparkle'; size?: number })` — exported from `HomePage.tsx`, imported by Task 8 (`ProductDetailPage.tsx`).

- [ ] **Step 1: Add the `TrustIcon` helper**

In `src/components/HomePage.tsx`, find the top of the file (after the `t` helper, around line 13):

```tsx
const t = (lang: Lang, es: string, en: string) => lang === 'es' ? es : en
```

Add immediately after it:

```tsx

export function TrustIcon({ name, size = 20 }: { name: 'pin' | 'truck' | 'chat' | 'sparkle'; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: '#5A2D9C',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }
  if (name === 'pin') {
    return (
      <svg {...common} xmlns="http://www.w3.org/2000/svg">
        <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    )
  }
  if (name === 'truck') {
    return (
      <svg {...common} xmlns="http://www.w3.org/2000/svg">
        <path d="M3 7h11v8H3z" />
        <path d="M14 10h4l3 3v2h-7z" />
        <circle cx="7" cy="18" r="1.6" />
        <circle cx="17" cy="18" r="1.6" />
      </svg>
    )
  }
  if (name === 'chat') {
    return (
      <svg {...common} xmlns="http://www.w3.org/2000/svg">
        <path d="M4 4h16v11H8l-4 4V4z" />
      </svg>
    )
  }
  return (
    <svg {...common} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2l1.8 5.6L19 9l-5.2 1.8L12 16l-1.8-5.2L5 9l5.2-1.4L12 2z" />
    </svg>
  )
}
```

- [ ] **Step 2: Replace the trust strip markup**

Find (around lines 78-97, after Step 1's hero replacement this is now a few lines lower — locate by content):

```tsx
      {/* Trust strip */}
      <section className="py-5 border-y" style={{ backgroundColor: '#5A2D9C', borderColor: '#4a2280' }}>
        <div className="max-w-6xl mx-auto px-4 flex flex-wrap items-center justify-center gap-8 md:gap-16 text-white/80 text-sm font-medium">
          <div className="flex items-center gap-2">
            <span className="text-xl">🇨🇴</span>
            <span>{t(lang, 'Hecho en Colombia', 'Made in Colombia')}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🚚</span>
            <span>{t(lang, 'Envíos a todo USA', 'Ships across USA')}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl">💬</span>
            <span>{t(lang, 'Atención por WhatsApp', 'WhatsApp Support')}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl">✨</span>
            <span>{t(lang, 'Calidad Premium', 'Premium Quality')}</span>
          </div>
        </div>
      </section>
```

Replace with:

```tsx
      {/* Trust strip */}
      <section className="py-6 border-y" style={{ backgroundColor: '#5A2D9C', borderColor: '#4a2280' }}>
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 gap-y-6 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-16 sm:gap-y-4 text-white/80 text-sm font-medium">
          {(
            [
              { label: t(lang, 'Hecho en Colombia', 'Made in Colombia'), icon: 'pin' as const },
              { label: t(lang, 'Envíos a todo USA', 'Ships across USA'), icon: 'truck' as const },
              { label: t(lang, 'Atención por WhatsApp', 'WhatsApp Support'), icon: 'chat' as const },
              { label: t(lang, 'Calidad Premium', 'Premium Quality'), icon: 'sparkle' as const },
            ]
          ).map((f) => (
            <div key={f.label} className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
              <span
                className="skeu-badge flex items-center justify-center rounded-full shrink-0"
                style={{ width: 44, height: 44, backgroundColor: '#F4F0FA' }}
              >
                <TrustIcon name={f.icon} />
              </span>
              <span>{f.label}</span>
            </div>
          ))}
        </div>
      </section>
```

- [ ] **Step 3: Remove the standalone flag emoji from the "Colombian Pride" callout**

Find (around line 219):

```tsx
          <div className="text-5xl mb-4">🇨🇴</div>
```

Delete this line entirely (no replacement — the section heading directly below it doesn't need an icon).

- [ ] **Step 4: Verify**

Run: `npx tsc --noEmit -p tsconfig.json`
Expected: no output (0 errors).

Open the dev server preview. Confirm: the trust strip under the hero shows 4 items, each with a small custom icon in a soft embossed circular badge (map-pin, truck, chat bubble, sparkle) instead of emoji; on a narrow/mobile viewport the 4 items form a 2×2 grid instead of wrapping unpredictably; further down the page, the "Colombian Pride" / "Orgullo Colombiano" section no longer shows a giant flag emoji above its heading.

- [ ] **Step 5: Commit**

```bash
git add src/components/HomePage.tsx
git commit -m "feat: restyle trust features with custom SVG icons and embossed badges"
```

---

### Task 8: Category Tiles Skeuomorphic Styling

**Files:**
- Modify: `src/components/HomePage.tsx`

**Interfaces:**
- Consumes: `.skeu-surface` (from Task 2, `src/index.css`).

- [ ] **Step 1: Apply the skeuomorphic surface to each category tile**

Find (around line 118):

```tsx
              className="group relative rounded-2xl overflow-hidden text-left transition-transform duration-300 hover:-translate-y-1"
```

Replace with:

```tsx
              className="group relative rounded-2xl overflow-hidden text-left transition-transform duration-300 hover:-translate-y-1 skeu-surface"
```

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit -p tsconfig.json`
Expected: no output (0 errors).

Open the dev server preview, scroll to "Nuestra Colección" / "Our Collection". Confirm the category tiles show a subtle embossed edge/sheen (soft highlight border) in addition to their existing hover lift.

- [ ] **Step 3: Commit**

```bash
git add src/components/HomePage.tsx
git commit -m "feat: apply skeuomorphic styling to homepage category tiles"
```

---

### Task 9: Product Card — Title Clamp, Mobile Button Fix, Skeuomorphic Surface, Select Hook

**Files:**
- Modify: `src/components/ProductCard.tsx`

**Interfaces:**
- Produces: `onSelect?: (product: Product) => void` prop on `ProductCard` (optional here; Task 11 wires real callers and tightens it to required).

- [ ] **Step 1: Add the optional `onSelect` prop and wire the card's click handler**

Find (lines 1-21):

```tsx
import { useState } from 'react'
import { ImageWithFallback } from './ImageWithFallback'
import type { Product } from '../data/products'
import type { Lang } from '../App'

interface Props {
  product: Product
  lang: Lang
  onAddToCart: () => void
}

export function ProductCard({ product, lang, onAddToCart }: Props) {
  const [hovered, setHovered] = useState(false)
  const [added, setAdded] = useState(false)

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation()
    setAdded(true)
    onAddToCart()
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div
      className="group relative rounded-2xl overflow-hidden cursor-pointer transition-transform duration-300"
      style={{
        backgroundColor: '#fff',
        boxShadow: hovered ? '0 8px 32px rgba(90,45,156,0.18)' : '0 2px 8px rgba(90,45,156,0.08)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
```

Replace with:

```tsx
import { useState } from 'react'
import { ImageWithFallback } from './ImageWithFallback'
import type { Product } from '../data/products'
import type { Lang } from '../App'

interface Props {
  product: Product
  lang: Lang
  onAddToCart: () => void
  onSelect?: (product: Product) => void
}

export function ProductCard({ product, lang, onAddToCart, onSelect }: Props) {
  const [hovered, setHovered] = useState(false)
  const [added, setAdded] = useState(false)

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation()
    setAdded(true)
    onAddToCart()
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div
      className="group relative rounded-2xl overflow-hidden cursor-pointer transition-transform duration-300 skeu-surface"
      style={{
        backgroundColor: '#fff',
        boxShadow: hovered
          ? 'inset 0 1px 0 rgba(255,255,255,0.7), inset 0 -1px 0 rgba(43,43,43,0.05), 0 14px 32px rgba(90,45,156,0.22)'
          : 'inset 0 1px 0 rgba(255,255,255,0.7), inset 0 -1px 0 rgba(43,43,43,0.05), 0 2px 8px rgba(90,45,156,0.10)',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onSelect?.(product)}
    >
```

(The inline `boxShadow` now carries the skeuomorphic inset highlight/hairline in both hover states, since inline styles override the `.skeu-surface` class's own `box-shadow`; the class still contributes its background gradient and border.)

- [ ] **Step 2: Clamp the title to 2 lines**

Find (line 74):

```tsx
        <h3 className="text-sm font-semibold leading-snug mb-2" style={{ color: '#2B2B2B' }}>
```

Replace with:

```tsx
        <h3 className="text-sm font-semibold leading-snug mb-2 line-clamp-2" style={{ color: '#2B2B2B', minHeight: '2.6em' }}>
```

- [ ] **Step 3: Fix the mobile Add to Cart button sizing/alignment**

Find (lines 77-94):

```tsx
        <div className="flex items-center justify-between">
          <span className="text-base font-bold" style={{ color: '#5A2D9C' }}>
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={handleAdd}
            className="text-xs font-semibold px-3 py-1.5 rounded-full text-white transition-all duration-200"
            style={{
              backgroundColor: added ? '#22c55e' : '#5A2D9C',
              transform: added ? 'scale(0.95)' : 'scale(1)',
            }}
          >
            {added
              ? '✓'
              : lang === 'es' ? '+ Carrito' : '+ Cart'
            }
          </button>
        </div>
```

Replace with:

```tsx
        <div className="flex items-center justify-between gap-2">
          <span className="text-base font-bold shrink-0" style={{ color: '#5A2D9C' }}>
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={handleAdd}
            className="text-[11px] sm:text-xs font-semibold px-2.5 sm:px-3 py-2 sm:py-1.5 rounded-full text-white transition-all duration-200 shrink-0 whitespace-nowrap"
            style={{
              backgroundColor: added ? '#22c55e' : '#5A2D9C',
              transform: added ? 'scale(0.95)' : 'scale(1)',
            }}
          >
            {added
              ? '✓'
              : lang === 'es' ? '+ Carrito' : '+ Cart'
            }
          </button>
        </div>
```

- [ ] **Step 4: Verify**

Run: `npx tsc --noEmit -p tsconfig.json`
Expected: no output (0 errors).

Open the dev server preview, resize to a narrow/mobile width, view the Shop grid (2 columns) or Home bestsellers grid. Confirm: a long product title wraps to at most 2 lines and cards in the same row stay the same height; the Add to Cart button has a larger, comfortable tap target and no longer crowds/overlaps the price on narrow cards; cards show a soft embossed edge; clicking a card (not the buttons) does nothing yet (expected — `onSelect` has no caller until Task 11) and does not throw a console error.

- [ ] **Step 5: Commit**

```bash
git add src/components/ProductCard.tsx
git commit -m "feat: clamp product titles, fix mobile add-to-cart sizing, add card select hook"
```

---

### Task 10: Product Detail Page (new component)

**Files:**
- Create: `src/components/ProductDetailPage.tsx`

**Interfaces:**
- Consumes: `Product`, `Category` types (`../data/products`), `Lang` type (`../App`), `TrustIcon` (`./HomePage`, produced by Task 7), `ImageWithFallback` (`./ImageWithFallback`), `.skeu-surface`/`.skeu-badge` (from Task 2).
- Produces: `export function ProductDetailPage({ product, lang, onAddToCart, onNavHome, onNavCategory }: Props)` where
  `Props = { product: Product; lang: Lang; onAddToCart: (qty?: number) => void; onNavHome: () => void; onNavCategory: (cat: Category) => void }`
  — consumed by Task 11 (`App.tsx`).

- [ ] **Step 1: Create the component file**

```tsx
import { useEffect, useState } from 'react'
import { ImageWithFallback } from './ImageWithFallback'
import { TrustIcon } from './HomePage'
import type { Category, Product } from '../data/products'
import type { Lang } from '../App'

interface Props {
  product: Product
  lang: Lang
  onAddToCart: (qty?: number) => void
  onNavHome: () => void
  onNavCategory: (cat: Category) => void
}

export function ProductDetailPage({ product, lang, onAddToCart, onNavHome, onNavCategory }: Props) {
  const [quantity, setQuantity] = useState(1)
  const [zoomOpen, setZoomOpen] = useState(false)
  const [wishlisted, setWishlisted] = useState(false)

  const t = (es: string, en: string) => (lang === 'es' ? es : en)
  const productName = lang === 'es' ? product.name : product.nameEn
  const description = lang === 'es' ? product.description : product.descriptionEn
  const isOferta = product.badge === 'Oferta'
  const originalPrice = isOferta ? Math.ceil(product.price / 0.8) : null

  useEffect(() => {
    if (!zoomOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZoomOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [zoomOpen])

  const total = (product.price * quantity).toFixed(2)
  const waMessage = encodeURIComponent(
    t(
      `Hola! Quiero comprar: ${productName} — Cantidad: ${quantity} — $${total}`,
      `Hi! I'd like to buy: ${productName} — Qty: ${quantity} — $${total}`
    )
  )
  const buyNowHref = `https://wa.me/16504047700?text=${waMessage}`

  const trustItems: { label: string; icon: 'pin' | 'truck' | 'chat' | 'sparkle' }[] = [
    { label: t('Hecho en Colombia', 'Made in Colombia'), icon: 'pin' },
    { label: t('Envíos a todo USA', 'Ships across USA'), icon: 'truck' },
    { label: t('Soporte WhatsApp', 'WhatsApp Support'), icon: 'chat' },
    { label: t('Calidad Premium', 'Premium Quality'), icon: 'sparkle' },
  ]

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <nav className="text-xs mb-6 flex items-center gap-1 flex-wrap" style={{ color: '#B384C8' }}>
        <button onClick={onNavHome} className="hover:underline">
          {t('Inicio', 'Home')}
        </button>
        <span>/</span>
        <button onClick={() => onNavCategory(product.category)} className="hover:underline">
          {product.category}
        </button>
        <span>/</span>
        <span style={{ color: '#5A2D9C' }}>{productName}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Image */}
        <div className="relative rounded-3xl overflow-hidden skeu-surface" style={{ aspectRatio: '4/5', backgroundColor: '#f0e8f8' }}>
          <ImageWithFallback src={product.image} alt={productName} className="w-full h-full object-cover" />
          <button
            onClick={() => setZoomOpen(true)}
            className="absolute bottom-4 right-4 w-10 h-10 rounded-full flex items-center justify-center bg-white/90 hover:bg-white transition-colors"
            aria-label={t('Ampliar imagen', 'Zoom image')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#5A2D9C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="11" y1="8" x2="11" y2="14" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
          </button>
        </div>

        {/* Info */}
        <div>
          <p className="text-xs font-medium mb-2 uppercase tracking-wider" style={{ color: '#B384C8' }}>
            {product.category}
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: '#2B2B2B' }}>
            {productName}
          </h1>

          <div className="flex flex-wrap gap-2 mb-4">
            <span
              className="skeu-badge inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
              style={{ backgroundColor: '#F4F0FA', color: '#5A2D9C' }}
            >
              <TrustIcon name="pin" size={14} /> {t('Hecho en Colombia', 'Made in Colombia')}
            </span>
            <span
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
              style={{ backgroundColor: 'rgba(34,197,94,0.12)', color: '#16a34a' }}
            >
              ● {t('Disponible', 'Available')}
            </span>
          </div>

          {description && (
            <p className="text-sm leading-relaxed mb-6" style={{ color: '#2B2B2B' }}>
              {description}
            </p>
          )}

          <div className="flex items-baseline gap-3 mb-6">
            {isOferta && originalPrice !== null ? (
              <>
                <span className="text-3xl font-bold" style={{ color: '#E845A3' }}>
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-lg line-through" style={{ color: '#B384C8' }}>
                  ${originalPrice.toFixed(2)}
                </span>
                <span className="text-xs font-bold px-2 py-1 rounded-full text-white" style={{ backgroundColor: '#E845A3' }}>
                  {t('Ahorra 20%', 'Save 20%')}
                </span>
              </>
            ) : (
              <span className="text-3xl font-bold" style={{ color: '#5A2D9C' }}>
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-medium" style={{ color: '#2B2B2B' }}>
              {t('Cantidad', 'Quantity')}
            </span>
            <div className="flex items-center rounded-full overflow-hidden border" style={{ borderColor: '#B384C8' }}>
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-9 h-9 flex items-center justify-center text-lg"
                style={{ color: '#5A2D9C' }}
                aria-label={t('Disminuir', 'Decrease')}
              >
                −
              </button>
              <span className="w-10 text-center text-sm font-semibold" style={{ color: '#2B2B2B' }}>
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-9 h-9 flex items-center justify-center text-lg"
                style={{ color: '#5A2D9C' }}
                aria-label={t('Aumentar', 'Increase')}
              >
                +
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <button
              onClick={() => onAddToCart(quantity)}
              className="flex-1 px-8 py-3.5 rounded-full text-white font-semibold text-sm transition-all duration-200 hover:scale-105"
              style={{ backgroundColor: '#5A2D9C' }}
            >
              {t('Añadir al Carrito', 'Add to Cart')}
            </button>
            <a
              href={buyNowHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center px-8 py-3.5 rounded-full text-white font-semibold text-sm transition-all duration-200 hover:scale-105"
              style={{ backgroundColor: '#25D366' }}
            >
              {t('Comprar por WhatsApp', 'Buy Now via WhatsApp')}
            </a>
            <button
              onClick={() => setWishlisted((w) => !w)}
              className="w-12 h-12 rounded-full flex items-center justify-center border transition-colors shrink-0"
              style={{ borderColor: '#B384C8', backgroundColor: wishlisted ? 'rgba(232,69,163,0.1)' : 'transparent' }}
              aria-label={t('Lista de deseos', 'Wishlist')}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill={wishlisted ? '#E845A3' : 'none'}
                stroke="#E845A3"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t" style={{ borderColor: '#e9e0f5' }}>
            {trustItems.map((f) => (
              <div key={f.label} className="flex flex-col items-center text-center gap-2">
                <span
                  className="skeu-badge flex items-center justify-center rounded-full"
                  style={{ width: 36, height: 36, backgroundColor: '#F4F0FA' }}
                >
                  <TrustIcon name={f.icon} size={16} />
                </span>
                <span className="text-[11px] font-medium" style={{ color: '#2B2B2B' }}>
                  {f.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {zoomOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-6"
          style={{ backgroundColor: 'rgba(26,10,48,0.9)' }}
          onClick={() => setZoomOpen(false)}
        >
          <button
            className="absolute top-6 right-6 text-white text-2xl"
            onClick={() => setZoomOpen(false)}
            aria-label={t('Cerrar', 'Close')}
          >
            ✕
          </button>
          <img
            src={product.image}
            alt={productName}
            className="max-w-full max-h-full object-contain rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </main>
  )
}
```

- [ ] **Step 2: Verify**

Run: `npx tsc --noEmit -p tsconfig.json`
Expected: no output (0 errors) — this confirms the new component type-checks correctly against `TrustIcon`'s exported signature and the `Product`/`Category`/`Lang` types, even though nothing renders it yet (Task 11 wires it in).

- [ ] **Step 3: Commit**

```bash
git add src/components/ProductDetailPage.tsx
git commit -m "feat: add ProductDetailPage component"
```

---

### Task 11: Wire Everything Together in App

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/components/HomePage.tsx`
- Modify: `src/components/ShopPage.tsx`
- Modify: `src/components/ProductCard.tsx`

**Interfaces:**
- Consumes: `ProductDetailPage` (Task 10), `ProductCard`'s `onSelect` prop (Task 9).

- [ ] **Step 1: Extend `App.tsx` — page type, selected product state, handlers, rendering**

Replace the full contents of `src/App.tsx` with:

```tsx
import { useState } from 'react'
import { Header } from './components/Header'
import { HomePage } from './components/HomePage'
import { ShopPage } from './components/ShopPage'
import { ProductDetailPage } from './components/ProductDetailPage'
import { Footer } from './components/Footer'
import type { Category, Product } from './data/products'

export type Page = 'home' | 'shop' | 'product'
export type Lang = 'es' | 'en'

export default function App() {
  const [page, setPage] = useState<Page>('home')
  const [lang, setLang] = useState<Lang>('es')
  const [activeCategory, setActiveCategory] = useState<Category | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [cartCount, setCartCount] = useState(0)

  const goToShop = (cat?: Category) => {
    setActiveCategory(cat ?? null)
    setPage('shop')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const selectProduct = (p: Product) => {
    setSelectedProduct(p)
    setPage('product')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const addToCart = (qty: number = 1) => setCartCount((c) => c + qty)

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F4F0FA' }}>
      <Header
        lang={lang}
        setLang={setLang}
        onNav={(p) => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
        onShopCategory={goToShop}
        cartCount={cartCount}
        currentPage={page}
      />
      {page === 'home' && (
        <HomePage lang={lang} onShop={goToShop} onAddToCart={addToCart} onSelectProduct={selectProduct} />
      )}
      {page === 'shop' && (
        <ShopPage lang={lang} initialCategory={activeCategory} onAddToCart={addToCart} onSelectProduct={selectProduct} />
      )}
      {page === 'product' && selectedProduct && (
        <ProductDetailPage
          product={selectedProduct}
          lang={lang}
          onAddToCart={addToCart}
          onNavHome={() => { setPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          onNavCategory={(cat) => goToShop(cat)}
        />
      )}
      <Footer lang={lang} onNav={(p) => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }) }} />
    </div>
  )
}
```

- [ ] **Step 2: Thread `onSelectProduct` through `HomePage`**

In `src/components/HomePage.tsx`, find the `Props` interface (around lines 7-11):

```tsx
interface Props {
  lang: Lang
  onShop: (cat?: Category) => void
  onAddToCart: () => void
}
```

Replace with:

```tsx
interface Props {
  lang: Lang
  onShop: (cat?: Category) => void
  onAddToCart: () => void
  onSelectProduct: (product: Product) => void
}
```

Find (around line 4):

```tsx
import type { Category } from '../data/products'
```

Replace with:

```tsx
import type { Category, Product } from '../data/products'
```

Find (around line 15):

```tsx
export function HomePage({ lang, onShop, onAddToCart }: Props) {
```

Replace with:

```tsx
export function HomePage({ lang, onShop, onAddToCart, onSelectProduct }: Props) {
```

Find the bestsellers grid's `ProductCard` usage (around line 164):

```tsx
              <ProductCard key={product.id} product={product} lang={lang} onAddToCart={onAddToCart} />
```

Replace with:

```tsx
              <ProductCard key={product.id} product={product} lang={lang} onAddToCart={onAddToCart} onSelect={onSelectProduct} />
```

- [ ] **Step 3: Thread `onSelectProduct` through `ShopPage`**

In `src/components/ShopPage.tsx`, find (line 4):

```tsx
import type { Category } from '../data/products'
```

Replace with:

```tsx
import type { Category, Product } from '../data/products'
```

Find the `Props` interface (lines 7-11):

```tsx
interface Props {
  lang: Lang
  initialCategory: Category | null
  onAddToCart: () => void
}
```

Replace with:

```tsx
interface Props {
  lang: Lang
  initialCategory: Category | null
  onAddToCart: () => void
  onSelectProduct: (product: Product) => void
}
```

Find (line 17):

```tsx
export function ShopPage({ lang, initialCategory, onAddToCart }: Props) {
```

Replace with:

```tsx
export function ShopPage({ lang, initialCategory, onAddToCart, onSelectProduct }: Props) {
```

Find the grid's `ProductCard` usage (around line 131):

```tsx
              {filtered.map(product => (
                <ProductCard key={product.id} product={product} lang={lang} onAddToCart={onAddToCart} />
              ))}
```

Replace with:

```tsx
              {filtered.map(product => (
                <ProductCard key={product.id} product={product} lang={lang} onAddToCart={onAddToCart} onSelect={onSelectProduct} />
              ))}
```

- [ ] **Step 4: Tighten `ProductCard`'s `onSelect` to required now that both callers always supply it**

In `src/components/ProductCard.tsx`, find:

```tsx
interface Props {
  product: Product
  lang: Lang
  onAddToCart: () => void
  onSelect?: (product: Product) => void
}

export function ProductCard({ product, lang, onAddToCart, onSelect }: Props) {
```

Replace with:

```tsx
interface Props {
  product: Product
  lang: Lang
  onAddToCart: () => void
  onSelect: (product: Product) => void
}

export function ProductCard({ product, lang, onAddToCart, onSelect }: Props) {
```

Find:

```tsx
      onClick={() => onSelect?.(product)}
```

Replace with:

```tsx
      onClick={() => onSelect(product)}
```

- [ ] **Step 5: Verify**

Run: `npx tsc --noEmit -p tsconfig.json`
Expected: no output (0 errors).

Open the dev server preview and walk the full flow:
1. From the homepage bestsellers grid, click a product card (not the Add to Cart button) — confirm it navigates to a new Product Detail Page showing that product's image, category, title, "Made in Colombia" + "Available" badges, price, quantity stepper, Add to Cart / Buy Now / wishlist buttons, and the 4 trust icons.
2. Click the breadcrumb's category crumb — confirm it navigates to the Shop page pre-filtered to that product's category.
3. Click the breadcrumb's "Home"/"Inicio" crumb — confirm it returns to the homepage.
4. On the PDP, click the zoom button on the image — confirm a full-screen lightbox opens; press `Escape` — confirm it closes.
5. Increase quantity to 2, click "Add to Cart" — confirm the header cart badge count increases by 2 (not 1).
6. Click "Comprar por WhatsApp"/"Buy Now via WhatsApp" — confirm it opens `wa.me/16504047700` in a new tab with a pre-filled message containing the product name, quantity, and total.
7. Find a product with the "Oferta" badge (e.g. "Crop tops"/id 21) via Shop → confirm its PDP shows a struck-through original price and a "Save 20%" tag next to the current price; confirm a non-Oferta product's PDP shows only a plain price.
8. From the Shop page grid, click a card — confirm the same PDP flow works from Shop as well as from Home.

- [ ] **Step 6: Commit**

```bash
git add src/App.tsx src/components/HomePage.tsx src/components/ShopPage.tsx src/components/ProductCard.tsx
git commit -m "feat: wire product cards to a new Product Detail Page"
```

---

### Task 12: Final Full-Spec Walkthrough

**Files:** None (verification-only task).

- [ ] **Step 1: Full type-check**

Run: `npx tsc --noEmit -p tsconfig.json`
Expected: no output (0 errors).

- [ ] **Step 2: Production build sanity check**

Run: `npm run build`
Expected: build completes successfully with no errors (warnings about chunk size, if any, are fine).

- [ ] **Step 3: Manual walkthrough against the spec**

Using the dev server preview, confirm each item from `docs/superpowers/specs/2026-07-09-site-redesign-design.md`:
- Browser tab title is "Always Beautiful"; favicon is the AB monogram.
- Header logo is visibly larger; wordmark uses Poppins (sans), not serif; announcement area is a smoothly looping marquee reading "Made in Colombia · Shipping across USA · WhatsApp" (ES/EN via the language toggle) with no flag emoji.
- Homepage hero shows the framed 1:1 square image with glow/vignette/shadow effects, no "Made in Colombia" badge in the hero itself.
- Trust strip below the hero shows 4 icon-badge items, no emoji, 2×2 on mobile.
- Cards, filter panels, header, footer, and category tiles show the soft embossed/skeuomorphic surface; all buttons remain flat.
- Footer shows "© 2026 Always Beautiful" and a clickable "Designed by Mazhar Creative Agency" link; no "Made with ❤️" line; no flag emoji.
- On the Shop page, switching categories via the header nav while already on Shop correctly updates the grid every time (no stale category).
- Product names for "Conjunto Short push up y Top tiras ajustables" and "Conjunto Leggings liso y top manga sisa" show no hyphens; spot-check a couple of English names (e.g. a "Push Up" or "Butt Lift" item) to confirm no hyphens remain.
- Product cards show at most 2-line titles and a properly sized/aligned mobile Add to Cart button.
- Clicking any product card opens its Product Detail Page (never a modal) with breadcrumb, large image + zoom, category, title, Made in Colombia + Available badges, Oferta discount pricing where applicable, quantity stepper, Add to Cart, Buy Now (WhatsApp), wishlist, and trust icons.
- "Top espalda ajustable", "Leggings super héroes", and "Leggings negros" show their new description text on their PDPs (in the current UI language).

- [ ] **Step 4: Report results**

Summarize verification results to the user, including the outstanding open item: the footer's "Designed by Mazhar Creative Agency" link currently points to `#` pending a real destination URL.
