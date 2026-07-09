# FIGMA DESIGN PROMPT — "Always Beautiful" E-Commerce Store + Admin Dashboard

> Paste everything below into Figma (Figma Make / First Draft / or hand to a designer as a brief). It's written as a single design instruction.

---

## 0. ONE-LINE BRIEF

Design a premium, bilingual (Spanish-first, English toggle) e-commerce experience for **Always Beautiful**, a Colombian shapewear (fajas) and activewear brand shipping across the USA — plus a matching seller/admin dashboard. The result should feel like a funded DTC brand (SKIMS × Gymshark × Fashion Nova energy), not a template store.

---

## 1. BRAND FOUNDATION

**Name:** Always Beautiful
**Category:** Fajas (post-op/postpartum compression shapewear) + women's activewear
**Origin/trust signal:** Made in Colombia 🇨🇴 — lead with this, it's a real credibility asset in this category
**Market:** Ships across the entire United States; primarily Spanish-speaking / bilingual Latina customers
**Tone:** Empowering, feminine, confident — body-positive, not clinical. Avoid sterile "medical device" framing even though several products are post-surgical compression garments; keep the emotional register aspirational (strength, self-care, confidence), similar to how the brand's own Instagram copy reads ("moldea tu figura," "control y soporte").

**Logo:** Attached — a hand-lettered "AB" monogram in gradient purple, with the "B" formed by a butterfly-wing-style loop. Soft, feminine, modern. Use it at full color on light backgrounds; provide a single-color (white or charcoal) version for dark backgrounds/footers.

---

## 2. COLOR SYSTEM

| Role | Color | Hex | Usage |
|---|---|---|---|
| Background (60%) | Soft Lavender-White | `#F4F0FA` | Global site background instead of pure white — premium, soft feel |
| Primary / Structure (30%) | Deep Royal Purple | `#5A2D9C` | Nav bar, primary buttons ("Añadir al carrito"), headings, active states, admin sidebar |
| Secondary structure | Muted Orchid/Lavender | `#B384C8` | Subheadings, category labels, secondary button outlines, script accents |
| Body text | Charcoal | `#2B2B2B` | All body copy and product descriptions — never pure black, softer contrast |
| Accent (10%) | Vibrant Magenta | `#E845A3` | Sale badges, "Solo 1 disponible" scarcity badges, discount tags, hover states, urgency banners |
| Supporting neutral | True Black (sparingly) | `#000000` / near-black | Some product photography backgrounds and admin data tables use black — fine as an occasional accent, not a base color |

Register all five as Figma color styles/variables before building screens. Do not introduce new brand colors — every accent should map back to this palette.

**Typography (assumption — no brand font was supplied, flag before final handoff):**
- Display/script accent (taglines, hero headlines): a soft rounded or hand-lettered script, echoing the brand's Instagram style (e.g., Playfair Display italic or a script pairing) — used sparingly, never for body text or UI.
- UI/body: a clean modern grammatical sans — Poppins, Manrope, or Inter — for nav, product names, prices, buttons, and all admin UI.

**Imagery style:** Bold, editorial fashion/fitness photography. Diverse body types. Movement/energy shots for activewear; confident, empowering close-ups for the fajas line (not clinical/medical stock photography).

**Dummy/placeholder images — required, do not leave empty slots:** No real product photography has been supplied yet. Every product card, gallery slot, and thumbnail in the mockup must still be filled with a realistic dummy/stock image relevant to that specific product type — not a blank gray box or generic placeholder icon. Match the dummy image to the category:
- Fajas/shapewear items → stock photos of shapewear/compression garments or fitted bodysuits
- Leggings → stock photos of women's leggings/activewear bottoms
- Tops, crop tops, blusas → stock photos of the corresponding top style
- Conjuntos/sets → matching activewear set photos
- Chaquetas → jacket product photos
- Vestidos/enterizos → dress/jumpsuit photos
This keeps every screen looking fully populated and realistic for stakeholder review. All dummy images must be swapped for real product photography before dev handoff — flag this clearly on the cover page of the Figma file.

---

## 3. INFORMATION ARCHITECTURE (cleaned & de-duplicated)

The raw product list had heavy overlap (same items listed under multiple sections) and one pseudo-category ("Únicas Unidades") that's really a stock-scarcity flag. Use this cleaned structure instead:

**Primary navigation:**

1. **Inicio** (Home)
2. **Fajas** (Shapewear)
   - Tablas de Compresión Abdominal (abdominal boards — marcación, lumbar, mariposa, pera)
   - Fajas Short (Texas con/sin brasier, Morpho Large con/sin brasier, Morpho Libi)
   - Panties Moldeadores (levanta cola push up)
3. **Ropa Deportiva** (Activewear)
   - Leggings (liso, negro, estampado, super héroes, cierre frontal, transparencia)
   - Tops Deportivos (tiras ajustables, espalda ajustable, crop tops)
   - Shorts y Faldas Short (push up liso/estampados/rayas/militar/súper héroes, licra interna, falda short)
4. **Conjuntos** (Matching Sets)
5. **Enterizos y Vestidos** (Bodysuits, Jumpsuits & Dresses)
6. **Chaquetas** (Jackets)
7. **Blusas y Camisillas** (Casual tops — cuello tortuga, transparente, manga sisa, camisillas)
8. **Ofertas** (Sale) — optional, structural placeholder

**Cross-cutting badge (not a nav item):** `Pieza Única — Solo 1 disponible` — a magenta badge applied at the product level for any one-off/limited-stock item (this replaces the old "Únicas Unidades" bucket and doubles as urgency marketing).

**Language toggle:** ES / EN switcher, persistent in header, Spanish as default locale.

---

## 4. MASTER PRODUCT CATALOG — USE THESE EXACT NAMES & PRICES

The raw list had ~76 line items with heavy duplication across overlapping sections. Below is the de-duplicated catalog of **50 unique SKUs** — use these exact prices (USD) verbatim in every mockup; do not invent or round different figures.

### Fajas
| Product | Price |
|---|---|
| Tabla marcación de abdomen | $32.00 |
| Tabla lumbar | $32.00 |
| Tabla mariposa abdominal | $32.00 |
| Tabla pera abdominal (Acrílico) | $27.00 |
| Short Texas sin brasier | $135.00 |
| Short Texas con brasier | $140.00 |
| Morpho Large con brasier | $145.00 |
| Morpho Large sin brasier | $140.00 |
| Short Morpho sin brasier | $130.00 |
| Short Morpho Libi con brasier | $145.00 |
| Panty levanta cola bidireccional push up | $75.00 |

### Ropa Deportiva — Leggings
| Product | Price |
|---|---|
| Leggings (liso) | $35.00 |
| Leggings negros | $35.00 |
| Leggings estampados | $45.00 |
| Leggings Estampados ⚠️ | $28.00 |
| Leggings super héroes | $45.00 |
| Leggings cierre frontal | $35.00 |
| Leggings transparencia completa | $35.00 |

⚠️ **Naming collision flagged, not merged:** the source data lists "Leggings estampados" at $45 (with a description) and "Leggings Estampados" at $28 (no description) as two separate SKUs. They're kept as two distinct products here because the prices differ and the source treated them separately — but these names are too similar for a live storefront. Rename one before launch (e.g., "Leggings Estampados Premium — $45" vs. "Leggings Estampados Básicos — $28") so customers and admin staff aren't confused about which is which.

### Ropa Deportiva — Tops
| Product | Price |
|---|---|
| Top tiras ajustables | $25.00 |
| Top espalda ajustable | $25.00 |
| Crop tops | $10.00 |

### Ropa Deportiva — Shorts y Faldas Short
| Product | Price |
|---|---|
| Short Push up (liso) | $25.00 |
| Short Push up Estampado Comic | $25.00 |
| Short Push up Estampado Drip | $25.00 |
| Short Push up Rayas | $25.00 |
| Short Push up Estampado Militar | $25.00 |
| Short Super Héroes | $25.00 |
| Short Licra Interna | $25.00 |
| Falda Short | $38.00 |

### Conjuntos
| Product | Price |
|---|---|
| Conjunto Falda short y top | $53.00 |
| Conjunto Short con top tiras | $53.00 |
| Conjunto Short push up - Top tiras ajustables | $53.00 |
| Conjuntos Super Héroes | $53.00 |
| Conjunto Leggings liso - top manga sisa | $73.00 |
| Conjunto leggings levanta cola y top manga sisa | $73.00 |
| Conjunto Leggings levanta cola y top tiras | $73.00 |
| Conjunto leggings levanta cola y top manga corta | $78.00 |
| Conjunto Leggings push up y malla lados (Talla única; Gris/Azul) | $78.00 |
| Conjunto Leggings liso y top manga larga | $82.00 |

### Enterizos y Vestidos
| Product | Price |
|---|---|
| Vestido tiras cruzadas con falda short | $68.00 |
| Enterizo leggings sin push up con control abdomen | $72.00 |
| Enterizo Short push up (única unidad, beige) 🏷️ | $55.00 |

### Chaquetas
| Product | Price |
|---|---|
| Chaqueta estampada | $35.00 |
| Chaqueta malla con capota | $35.00 |

### Blusas y Camisillas
| Product | Price |
|---|---|
| Blusa cuello tortuga | $12.00 |
| Blusa transparente | $12.00 |
| Blusa manga sisa | $18.00 |
| Blusas | $10.00 |
| Camisilla malla recogido atrás | $28.00 |
| Camisilla lisa abertura atrás | $32.00 |

🏷️ = the only SKU explicitly confirmed as single-unit in the source data (Enterizo Short push up, beige). The rest of the original "Únicas Unidades" grouping did not explicitly confirm per-item stock counts — confirm real quantities before applying the scarcity badge to any other SKU; don't assume the whole original list is 1-of-1.

---

## 5. STOREFRONT PAGES TO DESIGN

Design both **desktop (1440px)** and **mobile (390px)** frames for each:

1. **Home** — hero (lifestyle photo + headline + CTA), shop-by-category tiles, bestsellers carousel, "Hecho en Colombia" trust strip, testimonials/social proof section, Instagram feed strip, email capture with first-purchase discount, footer.
2. **Category / PLP (Product Listing Page)** — filter sidebar (size, color, price, "solo únicas"), sort dropdown, responsive product grid (populate with the exact catalog above + dummy images), pagination or infinite scroll.
3. **Product Detail Page (PDP)** — image gallery with zoom, product name/price (use exact catalog prices), color/size selectors, **size guide modal** (critical for fajas — compression level, garment structure, care instructions), quantity, sticky "Añadir al carrito" bar on mobile scroll, description + specifications tabs, "Pieza única" badge where relevant, related/you-may-also-like carousel, reviews section.
4. **Cart** — mini-cart drawer (slide-in) + full cart page, quantity edit, promo code field, subtotal, shipping estimate.
5. **Checkout** — multi-step (shipping → payment → review), guest checkout option, USD pricing throughout, US-address format, trust badges (secure checkout icons).
6. **Search results page**
7. **Account** — order history, saved addresses, wishlist.
8. **Static pages** — Nosotros/About, Envíos y Devoluciones (Shipping & Returns), Guía de Tallas (global size guide), Contáctanos (WhatsApp CTA prominent, matching how the brand currently sells via DM/WhatsApp).

---

## 6. ADMIN / SELLER DASHBOARD

Structural reference was a generic marketplace template (unrelated brand, PKR currency) — keep the **layout logic**, replace all branding, currency (→ USD), and copy:

1. **Profile page** — full name, email, account type/role card.
2. **Sales analytics dashboard** — this week / this month / total earnings (USD), orders placed, 30-day sales line chart, empty state ("No sales recorded yet") styled on-brand.
3. **Orders management** — active orders table/empty state, refresh action.
4. **Delivery charge settings** — global default + per-product override.
5. **Product list** — table grouped by category/sub-category, populated with the exact catalog (Section 4) and dummy thumbnail images, price, delivery charge, inline Edit/Delete actions.
6. **Add/Edit Product form** — Name, Category, Sub-category, Price, Original Price (optional, for strike-through sale pricing), Price note, Delivery charge, up to 6 product images (upload or paste URL, first = main image — populate mockup with dummy images matching the product), Description, Specifications (line-by-line), **Size chart field (new — not in the reference, but required for fajas)**, **"Pieza única / limited quantity" toggle (new)**, In-stock checkbox, Save/Cancel actions.

Style entirely in the Always Beautiful palette — purple sidebar/nav, lavender-white canvas, magenta for alerts/low-stock indicators, charcoal data text.

---

## 7. PROFESSIONAL E-COMMERCE UX PATTERNS TO BAKE IN

- Sticky mobile "Add to Cart" bar
- Trust badges: secure checkout, made-in-Colombia, US shipping
- Reviews/ratings on PDP
- "También te puede gustar" related-products module
- Recently viewed
- Size guide modal (mandatory for fajas)
- Image zoom/hover gallery
- Wishlist (heart icon)
- Breadcrumbs on PLP/PDP
- Promo/announcement bar (top of site)
- Newsletter signup with first-order discount
- Footer with policy links, WhatsApp/contact, social icons
- Empty/loading/skeleton states (mirror the calm, on-brand empty states shown in the dashboard reference)
- Micro-interactions: button hover states, image hover-swap on product cards, smooth cart drawer transition

---

## 8. COMPONENT LIBRARY TO BUILD FIRST

Before full pages, build a Figma component page with variants for:
- Buttons (primary/purple, secondary/outline-orchid, ghost, disabled)
- Badges ("Oferta"/magenta, "Pieza Única"/magenta-outline, "Nuevo")
- Product card (default + hover state)
- Form inputs, dropdowns, checkboxes (storefront + admin styles)
- Modals (size guide, quick view)
- Navigation (desktop mega-menu, mobile hamburger + drawer)
- Data table (admin)
- Footer
- Language toggle (ES/EN)

---

## 9. DELIVERABLE FORMAT

- Figma file with: Cover page (flag that images are dummy/placeholder, pending real photography) → Design tokens (color/type styles as variables) → Component library page → Storefront pages (desktop + mobile frames, populated with the exact catalog + dummy images) → Admin dashboard pages (desktop) → Prototype flow linking: Home → PLP → PDP → Cart → Checkout, and Admin: Login → Dashboard → Add Product.

---

## 10. OPEN ITEMS (must resolve before dev handoff)

- [ ] Real product photography (mockup currently uses category-matched dummy/stock images as stand-ins)
- [ ] Rename the two colliding "Leggings estampados/Estampados" SKUs ($45 vs $28) so they're distinguishable
- [ ] Confirm real stock counts for "Pieza Única" candidates beyond the one explicitly confirmed (Enterizo Short push up, beige)
- [ ] Size chart measurements per category (critical for fajas)
- [ ] Confirm typography choice (assumption made above)
- [ ] Confirm payment methods to support at checkout (card / PayPal / etc.)
- [ ] Confirm whether WhatsApp ordering stays as a parallel channel or is fully replaced by checkout