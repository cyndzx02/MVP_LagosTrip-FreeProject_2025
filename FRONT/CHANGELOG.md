# Changelog — AgroNova FRONT

All notable changes to the AgroNova frontend (`FRONT/`) are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

**Versioning convention (pre-1.0)**
- `0.MINOR.PATCH` — pre-stable. API/UI may break between minors.
- `MINOR` bump = new feature, large refactor, or breaking visual change.
- `PATCH` bump = bug fixes, CSS-only changes, dependency bumps.

---

## [Unreleased]

### Planned
- `0.3.0` — **Component migration to Tailwind** + true mobile-first responsive design. One component per `0.3.x` patch. CSS-only bugs from the audit (`z-index: 100%`, `font-size: 15`, dead media queries, `cm` units, `scale: 0.1px`, negative widths) get fixed by the rewrite itself.
- `0.4.0` — **Architectural cleanup**: central `axios` instance with env-driven `baseURL`, removal of unused `vue-mq@1` (Vue 2-only), router auth guard, 404 catch-all, light global error handler, `NavbarView` conditional on auth routes.

---

## [0.2.1] — 2026-05-11 — Critical runtime / security fixes

Non-CSS bugs from the 2026-05-11 audit. Layout / scoped-CSS issues remain for `0.3.x`.

### Removed
- **`Legumes.vue`** — dead stub (empty template + style + 6 broken asset imports). Not registered anywhere.

### Fixed
- **NavbarView.vue** — removed ghost `import 'vuetify/styles'` (Vuetify is not a dependency). Added explicit `name: 'NavbarView'`.
- **Register.vue**
  - Removed assignment to undeclared `this.info` reactive prop.
  - Replaced `var` with `const` / async-await.
  - `API_BASE_URL` now reads `process.env.VUE_APP_API_URL` (fallback `http://localhost:3000`).
  - Added `loading` + `serverError` reactive state.
  - On 2xx: persists `userFullName` / `userEmail` to `localStorage`, navigates to `/login`.
  - Submit button disabled + relabelled while loading.
- **LoginPage.vue**
  - Replaced password-logging stub with a real `axios.post` to `/login`.
  - `API_BASE_URL` via env var.
  - Persists `auth_token` from response and navigates to `/home`.
  - Adds `loading` + `serverError` state, disabled-button affordance.
- **SpecifiqueFood.vue**
  - Wrapped product view in `v-if="product"` with a fallback "Produit introuvable" branch — fixes `TypeError: Cannot read properties of undefined (reading 'price')` when route param does not match a product.
  - `foodName` is now a `computed` from `$route.params` (reactive on route change) instead of a one-shot snapshot in `data()`.
  - `<input type="number">` uses `v-model.number` so arithmetic is numeric, not string.
  - Cart items pushed by `addToCart` now carry a unique `id` (`${name}-${Date.now()}`) — feeds correct `:key` downstream in FactureView.
- **ViewCategorie.vue** — `category` is now a `computed` from `$route.params`, reacting to in-route navigation. Removed `console.log` in `created`.
- **PaiyementPage.vue**
  - `<style>` is now `scoped` (was leaking `label`, `input`, `h3 i` globally).
  - Uncommented `mounted` hook so saved location actually rehydrates.
  - Merged `submitForm` and `navigateToNext` into one method invoked by the form's `@submit.prevent`; removed duplicate `@click` on the submit button.
- **PageChekValidCart.vue**
  - Card details now sent via `POST` (was `GET` with params — credentials in URL/logs).
  - `API_BANK_URL` via `process.env.VUE_APP_BANK_API_URL` (fallback `http://localhost:3500`).
  - Added `loading` state. Removed blanket `/* eslint-disable */`.
- **TransferPage.vue**
  - Step buttons no longer carry hardcoded `active-transfert` class — uses `:class="{ 'active-transfert': currentStep === index }"` so only the current step lights up.
  - All non-submit buttons inside the form (step indicators, Précédent, Suivant) explicitly typed `type="button"` to prevent inadvertent form submission.
  - Removed hardcoded `initiation.amount: "100000"`; both `termination.amount` and `initiation.amount` are now derived from cart `totalPrice` in `mounted`.
  - `API_BANK_URL` via env var; added `loading` state and navigation to `FactureView` on success.
- **FactureView.vue**
  - Removed hardcoded `customerName: "Toyosi Oyelayo"` — reads `userFullName` from `localStorage` (populated by Register).
  - Removed hardcoded `merchantCode`, `payableCode` — read from `VUE_APP_MERCHANT_CODE` / `VUE_APP_PAYABLE_CODE`.
  - `dueDate` is now computed dynamically in `mounted` (now + 30 days) instead of the fixed epoch `2604188800000`.
  - `:key` for cart rows now falls back to `${item.name}-${idx}` when no `id` is present.
  - `API_BANK_URL` via env var.
- **ResumeCommand.vue** — Form `@submit.prevent` now binds to a real `goToValidation` method (the previous `submitForm` was undeclared). Removed inline `this.$router.push` from the submit button's `@click`.

### Changed
- **`src/main.js`** — already cleaned in 0.2.0; no further changes here.
- Several components now read API base URLs from `process.env.VUE_APP_*` with fallbacks. A real central axios instance is still planned for `0.4.0`.

### Notes
- The `LoginPage` token is stored under `localStorage.auth_token`. The router guard (`0.4.0`) will use the same key.
- Some pre-existing CSS bugs (`z-index: 100%`, `scale: 0.1px`, `margin: 5cm`, dead media queries) are intentionally **not** fixed here — they're rewritten away in `0.3.x` and would be wasted effort otherwise.

---

## [0.2.0] — 2026-05-11 — Tailwind CSS infrastructure

### Added
- **`tailwindcss@^3` + `postcss@^8` + `autoprefixer@^10`** installed as dev dependencies in `FRONT/`.
- **`tailwind.config.js`** at FRONT root:
  - `content`: `./public/index.html` + `./src/**/*.{vue,js,ts,jsx,tsx}` (purge scope for production builds).
  - Theme extension: `brand` color palette (`brand-50` → `brand-900`, DEFAULT `#0a2850`).
  - Theme extension: `fontFamily.sans` defaulted to Inter + system stack.
  - Theme extension: `maxWidth.screen-content` = `1200px` (content rail constant).
- **`postcss.config.js`** at FRONT root wiring the `tailwindcss` + `autoprefixer` plugins.
- **`src/assets/styles/tailwind.css`** global stylesheet:
  - `@tailwind base; @tailwind components; @tailwind utilities;` directives.
  - `@layer base` resets: text-size-adjust, font smoothing, body defaults, anchor color.
  - `@layer components` reusable classes: `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-danger`, `.input-field`, `.card-soft`.

### Changed
- **`src/main.js`** now imports `./assets/styles/tailwind.css` before the service worker. Removed the redundant `if (module.hot) module.hot.accept()` block (Vue CLI / `vue-loader` handles HMR automatically — was a minor audit finding).

### Notes
- `vue.config.js` not touched: PostCSS is auto-picked up by Vue CLI 5 from `postcss.config.js`.
- No component touched yet — components still ship their scoped CSS and will be migrated one by one in `0.3.x`. During migration the new `@layer components` classes (`.btn-primary`, etc.) can be reused.

---

## [0.1.0] — 2026-01-22

Initial MVP baseline. Frozen state before the May 2026 refactor.

### Stack
- Vue 3.2 + Vue Router 4.5
- Build: Vue CLI 5 (`@vue/cli-service`, Webpack)
- HTTP: axios 1.7
- Icons: FontAwesome 6.7 (free)
- PWA: register-service-worker 1.7
- Styling: scoped CSS per component (no framework)

### Features
- Public landing (`/`) with category grid + search
- Auth screens: `/login`, `/register`
- Catalog: category view (`/ViewCategorie/:category`), product detail (`/SpecifiqueFood/:foodName`)
- Cart (`/PanierView`) with localStorage persistence
- Checkout flow: `/ResumeCommand` → `/Paiement` → `/PageChekValidCart` → `/TransferPage` → `/FactureView`
- Interswitch-style transfer payload structure (entityCode, currencyCode, paymentMethodCode, countryCode)

### Components
13 Single-File Components in `src/components/`: `NavbarView`, `Home`, `LoginPage`, `Register`, `ViewCategorie`, `SpecifiqueFood`, `PanierView`, `ResumeCommand`, `PaiyementPage`, `PageChekValidCart`, `TransferPage`, `FactureView`, plus the unused stub `Legumes`.

---

## Known Issues (audit of 2026-05-11)

These were identified before any refactor work began. Each entry is tagged with the version that will fix it.

### Critical — block correct rendering / data flow → planned `0.2.1`

- **NavbarView.vue** — `import 'vuetify/styles'` (L23) while Vuetify is **not in `package.json`**. Build emits a missing-module error.
- **Home.vue** — `z-index: 100%` (L121) is invalid CSS (percent is not a valid `z-index` value); declaration dropped → search bar stacking broken.
- **Home.vue** — `font-size: 15` without unit (L199) → declaration dropped.
- **Home.vue** — `@media (max-width: 767px)` block (L214–253) targets `.categories-grid`, `.our-category`, `.category-circle`, `.categoryimg`, `.category-name`, `.search-bar`. Actual class names have a `-home` suffix → **the entire mobile breakpoint is dead.**
- **ViewCategorie.vue** — `z-index: 100%` (L198) and `z-index: 15%` (L249) — both invalid.
- **ViewCategorie.vue** — `scale: 0.1px !important` (L275, L340) and `scale: 4px` (L349) — `scale` does not accept `px`; declarations dropped.
- **ViewCategorie.vue** — `width: -3%` (L350) — negative width is invalid.
- **LoginPage.vue** — `handleSubmit()` (L44–54) only `console.log`s the password in plaintext. No auth call, no navigation, no error handling.
- **Register.vue** — `.then(response => (this.info = response.data))` assigns to `this.info`, which is **not declared in `data()`**. No reactivity; Vue 3 will warn.
- **Register.vue** — Hardcoded `http://localhost:3000/register`.
- **SpecifiqueFood.vue** — `this.products.find(...)` may return `undefined`; the very next line reads `this.product.price` → `TypeError: Cannot read properties of undefined`.
- **PaiyementPage.vue** — `<style>` block is **not scoped** (every other component is). Bare-tag selectors (`label`, `input`, `h3 i`) leak globally and clobber other screens.
- **PageChekValidCart.vue** — Bank card details sent via HTTP **GET** with `params: this.cardDetails` to `http://localhost:3500/api/check-card`. Card data lands in URL/access logs.
- **TransferPage.vue** — Hardcoded financial constants (`entityCode: "044"`, `currencyCode: "566"`, `paymentMethodCode: "AC"`, `countryCode: "NG"`) plus a hardcoded `amount: "100000"` that ships ₦100k on every initiation regardless of cart total.
- **FactureView.vue** — Hardcoded `customerName: "Toyosi Oyelayo"` — every generated invoice goes out under one fixed name.
- **FactureView.vue** — Hardcoded merchant config (`merchantCode`, `payableCode`, `dueDate`, etc.) in client bundle.

### Major — breaks responsiveness, navigation, or state → planned `0.3.x`

- **NavbarView.vue** — `max-width: 100cm` inside mobile media query (L112). Duplicate `width` (L42–43).
- **Home.vue** — `margin-top: 5cm; margin-right: 4cm` (L92–93). `position: fixed` on `.search-bar-home` without inset; `margin-left: 5cm` pushes it off-screen on narrow viewports.
- **ViewCategorie.vue** — `category` cached in `data()` from `this.$route.params.category`; no `$route` watcher → stale on in-route navigation.
- **ViewCategorie.vue** — `.arrow-category` is `position: fixed; left: 0` and applied to three nested elements (`<a>`, `<p>`, …) — selector applies to all.
- **ViewCategorie.vue** — Duplicate `.item-list-category` declarations in mobile breakpoint with conflicting `width: 100%` then `width: -3%`.
- **SpecifiqueFood.vue** — `foodName` cached in `data()` (no `$route` watcher). `<input type="number" v-model="quantity">` should be `v-model.number`.
- **Legumes.vue** — Empty template + style, dead imports pointing to wrong asset paths. Either implement or delete.
- **PanierView.vue** — `cartItems` snapshot in `data()` (no refresh on re-entry). `watch.cartItems` never fires because mutations are in-place on the array.
- **PaiyementPage.vue** — `mounted` hook commented out → `loadFromLocalStorage` never runs; form values lost on back-nav.
- **PaiyementPage.vue** — `.progress-separator-paiement` styled but template uses `.progress-separator` → unstyled `<hr>`.
- **PageChekValidCart.vue** — `.input-group-validate` styled but template uses `.input-group` → dead selector.
- **TransferPage.vue** — Step nav buttons inside `<form>` lack `type="button"`; they submit the form. Active step `:class="{ active: ... }"` toggles `.active` but CSS targets `.active-transfert` → dead. Every button also has hardcoded `active-transfert` class → all five always appear active.
- **TransferPage.vue** — `.button-transfert` styled (with `t`), template uses `.button-transfer` → dead. `.container-transfert { margin-left: 9cm }` shoves form off-screen on mobile.
- **ResumeCommand.vue** — Submit button has both `type="submit"` and `@click="this.$router.push(...)"` while form's `@submit.prevent` references undeclared `submitForm`. `margin-right: 3cm` on `.btn-resumeCommand`.
- **FactureView.vue** — `:key="item.id"` on cart rows but cart items written by `SpecifiqueFood.addToCart` have no `id` field → all keys `undefined`.

### Minor — code hygiene → planned `0.3.x` / `0.4.x`

- Physical `cm` units used in 6 files for layout (Home, NavbarView, ViewCategorie, ResumeCommand, TransferPage) — replace with rem/% during Tailwind migration.
- Dead/commented CSS blocks in Home, NavbarView, ResumeCommand, PanierView.
- Double semicolons (`;;`) in ResumeCommand, PageChekValidCart.
- Typos: `Eeg` and `Laittue` in ViewCategorie product data.
- `transition: ease-in;` in PanierView (L181) — invalid shorthand.
- Universal selector inside scoped style in ViewCategorie (`* { margin:0; padding:0; box-sizing:border-box }`).
- `eslint-disable` blanket in PageChekValidCart masks real lint issues.
- Hover states reuse base colors in multiple files (no visible feedback).
- `var` declarations in Register.vue.

### Cross-cutting → planned `0.4.0`

- `vue-mq@1.0.1` declared but never imported, and incompatible with Vue 3.2 (Vue-2-only). Remove or migrate to `vue3-mq`.
- No central axios instance, no `baseURL` env var. Every screen hardcodes `http://localhost:3000` or `:3500`.
- No global error/loading store; each component reinvents `loading`/`errorMessage`.
- Mixed-style router definitions: some routes have `name`, some don't. No 404 catch-all, no auth guard despite Login/Register.
- NavbarView always mounted, including on `/login` and `/register`.

---

**Maintainer**: Cynthia Zinsou
**Last Updated**: 2026-05-11
