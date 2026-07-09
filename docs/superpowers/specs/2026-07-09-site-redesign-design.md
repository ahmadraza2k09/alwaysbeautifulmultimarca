# Always Beautiful — Site Redesign & PDP Design

Date: 2026-07-09
Status: Draft for review

## 1. Overview

A single redesign pass across branding, header, hero, trust signals, visual
styling (skeuomorphic surfaces), footer, category filtering, product data,
product cards, and a brand-new Product Detail Page (PDP). No new runtime
dependencies are added — the app currently has zero routing/icon libraries
(`react` + `react-dom` only), and every new piece (routing, icons, marquee,
zoom) is built with the same hand-rolled patterns already used throughout
the codebase (state-based page switching, inline SVGs).

Constraints carried over from the existing codebase:
- No React Router — page navigation is `useState<Page>` in `App.tsx`.
- No icon library — all icons are inline `<svg>`.
- Brand tokens already exist in `src/index.css` `@theme` (`--color-brand-*`,
  `--font-sans: Poppins`, `--font-serif: Playfair Display`) but are
  under-used; components mostly hardcode hex values via inline `style`.
  This redesign keeps using inline styles/hex to match the existing
  convention rather than mixing patterns — no token-migration refactor.

## 2. Branding & App Shell

Title/description/favicon are controlled by `.figma/make/site.json` (read
by `vite.config.ts`'s `figmaSiteConfiguration` plugin), **not**
`index.html` directly.

- `site.json.title`: set to `"Always Beautiful"`.
- `site.json.description`: reworded to drop the one hyphen it contains
  (`"e-commerce"` → `"online store"`): *"An online store featuring a
  custom logo and integrated contact options via Instagram and WhatsApp
  for seamless customer inquiries."*
- Favicon: no `public/` directory exists yet. Create `public/favicon.png`
  as a copy of the existing AB butterfly-monogram asset
  (`src/imports/cf2cb152-86cd-4195-a7b5-9bdfb72589f4.png`, already
  1024×1024, already square) and set `site.json.icons.icon = "/favicon.png"`.
  This is the same PNG used for the header/footer logo, just served
  un-filtered (full color) as the favicon instead of forced-white.

## 3. Header / Navigation (`src/components/Header.tsx`)

- **Logo size**: bump from `h-10` (40px) to `h-12` (48px) for better
  visibility, still `w-auto object-contain`.
- **Wordmark font**: remove the inline `fontFamily: "'Playfair Display', serif"`
  override on the "Always Beautiful" `<span>` so it falls back to the
  page's default `font-sans` (Poppins, already loaded and already the
  `<body>` default). No change to `hidden sm:block` — the wordmark is
  already hidden below the `sm` breakpoint, so "desktop and laptop only"
  is already the current behavior; this is a pure font swap.
- **Announcement bar → marquee**: replace the static
  `🇨🇴 Hecho en Colombia · Envíos... | Consultas por WhatsApp: ...` bar
  with a continuously scrolling CSS marquee, same magenta background
  (`#E845A3`), same bar height/typography. Content (bilingual via the
  existing `t()` helper), no flag emoji:
  - `Hecho en Colombia` / `Made in Colombia`
  - `Envíos a toda USA` / `Shipping across USA`
  - `WhatsApp`
  Items are separated by a `•` and the sequence is duplicated back-to-back
  in the track so the loop is seamless; implemented with a `@keyframes`
  translateX animation in `index.css` (no library). Pauses on
  hover/focus for accessibility (`animation-play-state: paused`).
- **Flag emoji removal**: this also removes the `🇨🇴` from the old bar
  (moot, since the bar is replaced) and is applied everywhere else in
  §5, §7 below — "Made in Colombia" as text stays exactly as-is.

## 4. Homepage Hero (`src/components/HomePage.tsx`)

Current hero is a full-bleed cropped background photo with text overlaid.
Per your confirmed direction, it becomes a **split layout**:

- Left: headline, copy, CTAs (unchanged content/copy).
- Right: the hero image in a dedicated **1:1 square frame** — a fixed
  `aspectRatio: '1/1'` container, `object-contain` (or a cover crop that's
  pre-composed to be square — using `object-contain` guarantees "entire
  image visible, no cropping" regardless of the source photo's native
  ratio, satisfying the requirement literally).
- Effects on the frame (CSS, layered, on the square container):
  - Soft **ambient glow**: a blurred magenta/purple radial glow behind
    the frame (`box-shadow` with large blur + brand colors, or a
    pseudo-element with `filter: blur(...)`).
  - **Vignette gradient**: subtle radial darkening at the frame's own
    edges, inset, so the image reads as "staged" rather than pasted.
  - **Soft edge shadow**: elevated drop shadow under the frame
    (`box-shadow: 0 20px 60px rgba(90,45,156,0.35)` ballpark).
  - **Light magenta highlight**: a thin soft-glow ring/border tinted
    `#E845A3` at low opacity along one edge (e.g. top-left) for a
    catch-light effect.
- Layout stacks to image-below-text on mobile, image still framed 1:1.
- Background section keeps its dark purple (`#1a0a30`) backdrop so the
  glow reads well.
- **"Made in Colombia" badge removed** from the hero only (the pill above
  the H1, lines ~34-36 today). It is *not* removed from the trust strip
  directly beneath the hero — that's a separate, still-present feature
  (§5).

## 5. Trust Features (`src/components/HomePage.tsx`, trust strip section)

Confirmed: keep the same 4 items, restyle only.

- Replace each emoji (`🇨🇴`, `🚚`, `💬`, `✨`) with a **custom inline SVG
  icon** (hand-drawn, consistent stroke style with the rest of the app's
  icons — map-pin, truck, chat-bubble, sparkle/star):
  - Made in Colombia → map-pin icon
  - Ships across USA → truck icon
  - WhatsApp Support → chat-bubble icon
  - Premium Quality → sparkle/checkmark icon
- Each icon sits inside an **embossed circular badge**: a small circle
  (`~44px`) with a soft raised/inset dual-shadow treatment (see §6 for
  the shared skeuomorphic token), brand-purple icon color on a light
  lavender fill.
- **Mobile layout**: strip changes from `flex flex-wrap` (which just
  wraps unpredictably) to an explicit `grid grid-cols-2 gap-y-6` below
  `sm`, reverting to the current centered flex row at `sm:` and up.
- The separate "Colombian Pride" callout section further down the page
  (with its big `🇨🇴` and the 3-item `✦` list) is a distinct marketing
  section, not "trust features" — out of scope for the icon/badge
  restyle. Its standalone decorative flag emoji is still removed per the
  global "remove Colombia flag emoji everywhere" instruction, with no
  replacement icon (the section heading doesn't need one).

## 6. Skeuomorphic Styling System

A shared, reusable soft-UI treatment defined once in `index.css` as a
small set of utility classes (not a redesign of the color palette —
existing brand colors stay):

- `.skeu-surface` — base raised-surface look: subtle linear-gradient
  fill (very light top-to-bottom lightening), dual box-shadow (outer
  soft drop shadow + inset top highlight line + inset bottom hairline
  shadow), and a hairline border (`rgba(255,255,255,.6)` on light
  surfaces / `rgba(255,255,255,.08)` on dark surfaces like the header/
  footer). Example:
  `box-shadow: 0 1px 0 rgba(255,255,255,.6) inset, 0 -1px 0 rgba(0,0,0,.05) inset, 0 10px 24px rgba(90,45,156,.12), 0 2px 6px rgba(90,45,156,.08);`
- `.skeu-surface-dark` — same idea, calibrated for the dark-purple header/
  footer backgrounds (lighter inset highlight, darker outer shadow) so
  they read as gently raised panels rather than flat fills.
- **Applied to**: `ProductCard` (cards), the Shop sidebar/filter panel and
  mobile filter drawer (panels), `Header`'s main bar, `Footer`, and the
  homepage category tiles.
- **Not applied to buttons** — all buttons (Add to Cart, CTAs, filters,
  language toggle) stay exactly as flat/pill-shaped as they are today,
  per your instruction.
- Embossed circular icon badges (§5) use a tighter variant of the same
  technique at small scale.

## 7. Footer (`src/components/Footer.tsx`)

- Copyright: `© 2025 Always Beautiful.` → dynamic
  `` © {new Date().getFullYear()} Always Beautiful. `` so it's always
  current (shows © 2026 today).
- Remove the line `Hecho con ❤️ en Colombia para el mundo.` / `Made with
  ❤️ in Colombia for the world.` entirely.
- Add, in its place in the bottom bar: **"Designed by Mazhar Creative
  Agency"**, wrapped in a clickable `<a>` (bilingual not required — it's
  a credit line, kept in English). Since no destination URL was given,
  it links out via a `mailto:` or a placeholder `href="#"`... — **open
  question, see §12**.
- The other flag-emoji instance in the Contact column
  (`🇨🇴 Hecho en Colombia`) loses its emoji, text unchanged, per the
  global flag-removal rule.

## 8. Category Browsing Sync Fix

Root cause confirmed: `ShopPage.tsx` seeds its own `activeCategory` state
from the `initialCategory` prop only once (`useState(initialCategory)`),
so subsequent category changes made while already on the Shop page
(Header nav → different category) never propagate, since `ShopPage`
isn't remounted.

Fix: add
```ts
useEffect(() => setActiveCategory(initialCategory), [initialCategory])
```
so the internal state re-syncs whenever `App` passes a new category.
This is a straightforward, contained bug fix — no other filtering logic
changes.

## 9. Product Data (`src/data/products.ts`)

- **Hyphen removal — Spanish `name`** (2 products use `" - "` as a
  connector between two garment pieces): replace with `" y "` ("and"),
  matching how the English names already join pieces with `&`:
  - id 32: `Conjunto Short push up - Top tiras ajustables` → `Conjunto Short push up y Top tiras ajustables`
  - id 34: `Conjunto Leggings liso - top manga sisa` → `Conjunto Leggings liso y top manga sisa`
- **Hyphen removal — English `nameEn`**: broader than it first looked —
  16 English names contain hyphens (compound modifiers like "Push-Up",
  "Butt-Lift", "Front-Zip", "Full-Mesh", "Back-Gathered", "Open-Back").
  "Remove hyphens from all English product names" is taken literally:
  every hyphen in every `nameEn` is removed, replaced with a space
  (`"Push-Up"` → `"Push Up"`, `"Butt-Lift"` → `"Butt Lift"`, etc.). Full
  list of affected products: ids 11, 17, 18, 22, 23, 24, 25, 26, 32, 35,
  36, 37, 38, 42, 49, 50.
- **New optional fields** on `Product`: `description?: string` and
  `descriptionEn?: string`. Optional (not required on all 50 products) —
  populated only for the 3 requested products, matching the instruction
  to "include descriptions for" those specific items rather than
  backfilling all 50 (avoids inventing copy for products with no brief).
  Draft copy (premium, on-brand, short):
  - **Top espalda ajustable / Adjustable Back Top** (id 20):
    ES: *"Top deportivo con espalda ajustable y soporte medio, ideal
    para entrenar o usar en el día a día. Tela suave que se adapta a tu
    cuerpo sin marcar."*
    EN: *"A sports top with an adjustable back and medium support,
    perfect for training or everyday wear. Soft fabric that moves with
    your body without digging in."*
  - **Leggings super héroes / Superhero Leggings** (id 16):
    ES: *"Leggings de estampado súper héroes con compresión suave y
    cintura alta. Divertidos, cómodos y con el ajuste perfecto para tu
    rutina de ejercicio."*
    EN: *"Superhero-print leggings with gentle compression and a
    high waist. Fun, comfortable, and shaped to move with your
    workout."*
  - **Leggings negros / Black Leggings** (id 13):
    ES: *"El básico infaltable: leggings negros de cintura alta con
    compresión suave, versátiles para el gym o el día a día."*
    EN: *"The everyday essential: high-waist black leggings with
    gentle compression, versatile enough for the gym or daily wear."*

## 10. Product Card (`src/components/ProductCard.tsx`)

- **Title clamp**: add `line-clamp-2` (Tailwind v4 utility) plus a fixed
  min-height on the title so cards in the same row stay aligned even
  when one title wraps to 2 lines and a neighbor doesn't.
- **Mobile Add to Cart fix**: the button currently uses the same
  `text-xs px-3 py-1.5` at every breakpoint, which crowds the price row
  on narrow 2-column grids. Give it a slightly larger tap target and
  breathing room on mobile (`py-2` / adjusted `gap`/`shrink-0`), keeping
  desktop as-is or scaling down slightly there instead — net effect:
  button no longer collides with/overflows the price on small screens.
- **Click → navigate to PDP**: add an `onSelect: (product: Product) => void`
  prop; wrap the card's clickable area with an `onClick={() => onSelect(product)}`
  (excluding the Add to Cart and Wishlist buttons, which already
  `stopPropagation`/will get it). `HomePage` and `ShopPage` receive and
  forward `onSelectProduct` from `App`. No modal — this always navigates
  to the new PDP (see §11).

## 11. Product Detail Page (new: `src/components/ProductDetailPage.tsx`)

**Navigation/architecture**: extend `App.tsx`'s `Page` union to
`'home' | 'shop' | 'product'`, add `selectedProduct: Product | null`
state. Clicking any product card calls `App`'s `onSelectProduct(product)`,
which sets `selectedProduct` + `page: 'product'` + scrolls to top —
same pattern `goToShop` already uses, no router needed. `Header`/`Footer`
stay mounted throughout, consistent with today.

**Page contents**:
- **Breadcrumb**: `Home / {Category} / {Product Name}` — Home navigates
  via `onNav('home')`, Category navigates via the existing `goToShop(cat)`
  (so it lands pre-filtered on Shop, also exercising the sync fix from
  §8), Product Name is the current (non-clickable) crumb.
- **Large product image**: the product's existing image, in a large
  framed panel (reuses the skeuomorphic panel treatment from §6, product
  photography stays `object-cover` here since PDP images are already
  correctly cropped 4:5 stock photos — the 1:1 uncropped requirement
  from §4 is hero-specific).
- **Image zoom button**: a small magnifier-icon button overlaid on the
  image corner; opens a full-screen lightbox overlay (image large,
  `object-contain`, dark backdrop, close on `Esc`/backdrop-click/✕
  button). No library — a simple conditional overlay + `useEffect`
  keydown listener.
- **Category** label above the title (small caps, orchid `#B384C8`,
  same styling as the card's category label).
- **Product title** (full Spanish/English name per `lang`, no clamping
  here — this is the detail view).
- **Made in Colombia badge** + **Available badge**: two small pills
  under the title. "Available" is static/always-shown — the data model
  has no per-SKU stock/inventory field today, so there's no real
  "unavailable" state to branch on; this matches current site behavior
  (no OOS handling exists anywhere else either).
- **Discount pricing** (Oferta only): the data model has a single
  `price` field (no separate "original price"). To render a genuine
  strikethrough + "Save 20%" without touching the other 49 products'
  prices, `price` is treated as the *sale* price and an original price
  is derived as `price / 0.8`, rounded up to the nearest whole dollar
  for display (e.g. a $10 Oferta item shows a struck-through original
  price of $13 next to the $10 sale price, with a "Save 20%" tag). Only
  rendered when `product.badge === 'Oferta'` (today: ids 21, 48).
  Non-Oferta products just show `price`, no strikethrough.
- **Quantity stepper**: local `useState(1)`, `−` / count / `+`, min 1
  (no max — no stock data to cap against).
- **Add to Cart button**: calls `onAddToCart` (App's cart counter)
  `quantity` times — `onAddToCart` gets an optional `qty = 1` param,
  backward compatible with `ProductCard`'s existing no-arg calls.
- **Buy Now button**: opens
  `https://wa.me/16504047700?text=<encoded message>` in a new tab — same
  number already used site-wide (Header/Footer/Contact CTA). Message
  template (bilingual): *"Hola! Quiero comprar: {product name} — Cantidad: {qty} — ${total}"* / *"Hi! I'd like to buy: {product name} — Qty: {qty} — ${total}"*.
- **Wishlist button**: local toggle (filled/outline heart on click) —
  same fidelity as the wishlist hearts elsewhere in the app (decorative/
  client-only, nothing in the codebase persists wishlist state today).
- **Trust/assurance icons** beneath the purchase section: reuses the
  same 4 custom SVG icons from §5 (map-pin/truck/chat/sparkle) at small
  size with short labels, reinforcing Made in Colombia / Ships USA /
  WhatsApp support / Premium quality right at the point of purchase.

## 12. Open Question

Footer's new "Designed by Mazhar Creative Agency" link needs a
destination. I don't have one — please provide a URL (website, Instagram,
etc.) or say to leave it as a non-navigating `#` placeholder.

## 13. Explicitly Out of Scope

Not touched by this pass (not requested): cart drawer/full cart page,
checkout flow, size-guide modal, reviews, related-products carousel,
wishlist persistence, search, account pages, admin dashboard. These are
documented in the original design brief
(`src/imports/pasted_text/always-beautiful-design-brief.md`) as future
work but are outside the current request.
