# Tasks: Platform Split

This task list implements only the approved `platform-split` module in `SPEC-platform-split.md`. Customer UI polish and ordering improvements remain gated by their own module specs.

## Phase 1: Workspace Foundation

- [x] **Task 1: Establishing npm workspace manifests**
  - Description: Configure the repository as an npm workspace with separate customer and admin app packages while retaining one lockfile.
  - Acceptance:
    - Root scripts can address each app independently.
    - Both app manifests use the existing Next.js/React stack without unrelated dependencies.
  - Verification: `npm install --package-lock-only`; `npm ls --workspaces --depth=0`.
  - Dependencies: None.
  - Files likely touched: `package.json`, `package-lock.json`, `apps/customer/package.json`, `apps/admin/package.json`.
  - Estimated scope: Medium.

- [x] **Task 2: Configuring independent Next.js app roots**
  - Description: Add app-specific Next.js and TypeScript configuration after checking the installed Next.js 16.4.3 workspace guidance.
  - Acceptance:
    - Each app resolves its own source and shared workspace packages.
    - Neither app relies on undocumented imports from the other app.
  - Verification: Run TypeScript checks for both workspace packages.
  - Dependencies: Task 1.
  - Files touched: `apps/customer/next.config.ts`, `apps/customer/tsconfig.json`, `apps/admin/next.config.ts`, `apps/admin/tsconfig.json`, `.gitignore`.
  - Estimated scope: Medium.

## Checkpoint: Workspace

- [ ] Both apps are discoverable workspaces.
- [ ] Root lint and TypeScript checks pass.

## Phase 2: Customer App Migration

- [x] **Task 3: Moving the customer app shell**
  - Description: Move the customer root layout, global styles, and home route into the customer app.
  - Acceptance:
    - Customer metadata, fonts, theme, and home route remain intact.
    - Customer layout does not mount admin UI.
  - Verification: Build the customer workspace and smoke-test `/`.
  - Dependencies: Task 2.
  - Files touched: `package.json`, `apps/customer/tsconfig.json`, `apps/customer/src/app/layout.tsx`, `apps/customer/src/app/globals.css`, `apps/customer/src/app/page.tsx` (moved from `src/app`).
  - Estimated scope: Medium.

- [x] **Task 4: Extracting shared menu types and catalog data**
  - Description: Put menu/store types and initial catalog data behind an explicit workspace package consumed by both apps.
  - Acceptance:
    - Both apps compile against the same menu and store contracts.
    - No app imports source files through a relative path into the other app.
  - Verification: Type-check both apps and compare the public menu response against the existing contract.
  - Dependencies: Task 1.
  - Files touched: `package.json`, `package-lock.json`, `apps/customer/package.json`, `apps/admin/package.json`, `src/data/menuData.ts`, `src/data/storeData.ts`, `src/types/index.ts`, `packages/shared/package.json`, `packages/shared/src/`.
  - Estimated scope: Medium.

- [x] **Task 5: Moving customer secondary routes**
  - Description: Move the menu, robots, and sitemap routes into the customer app.
  - Acceptance:
    - Existing customer URLs remain available at the same paths.
    - Metadata and sitemap entries do not expose admin routes.
  - Verification: Build the customer workspace and request each route locally.
  - Dependencies: Tasks 3 and 4.
  - Files touched: `apps/customer/src/app/menu/page.tsx`, `apps/customer/src/app/robots.ts`, `apps/customer/src/app/sitemap.ts` (moved from `src/app`).
  - Estimated scope: Medium.

- [x] **Task 6: Moving customer menu and analytics APIs**
  - Description: Move the public menu and analytics API routes without changing their response contracts.
  - Acceptance:
    - Public menu filters and response shape are preserved.
    - No admin write operation is exposed by these public routes.
  - Verification: Build the customer workspace and smoke-test the existing GET endpoints.
  - Dependencies: Tasks 2 and 4.
  - Files touched: `apps/customer/src/app/api/v1/menu/route.ts`, `apps/customer/src/app/api/v1/analytics/route.ts` (moved from `src/app`).
  - Estimated scope: Medium.

- [ ] **Task 7: Moving home page sections, group one**
  - Description: Move the hero, best sellers, flavor showcase, and samgyup showcase components.
  - Acceptance:
    - The customer homepage renders all four sections.
    - Existing interactions and image paths continue to work.
  - Verification: Build and verify the four sections at desktop and mobile widths; recheck image URLs after asset tasks 16-20.
  - Dependencies: Tasks 3 and 4.
  - Files moved: `apps/customer/src/components/home/HeroSection.tsx`, `apps/customer/src/components/home/BestSellersSection.tsx`, `apps/customer/src/components/home/FlavorsShowcase.tsx`, `apps/customer/src/components/home/SamgyupShowcase.tsx`.
  - Estimated scope: Medium.

- [x] **Task 8: Moving home page sections, group two**
  - Description: Move the promo, about, location, and delivery partner sections.
  - Acceptance:
    - The customer homepage renders all four sections in the current order.
    - Links, reservation entry points, and delivery partner entry points remain available.
  - Verification: Build the customer workspace and smoke-test section anchors and actions.
  - Dependencies: Tasks 3 and 4.
  - Files moved: `apps/customer/src/components/home/PromoSection.tsx`, `apps/customer/src/components/home/AboutSection.tsx`, `apps/customer/src/components/home/LocationSection.tsx`, `apps/customer/src/components/home/DeliveryPartnersSection.tsx`.
  - Estimated scope: Medium.

- [x] **Task 9: Moving customer navigation and menu components**
  - Description: Move the navbar, footer, sticky mobile bar, menu card, and menu section.
  - Acceptance:
    - Customer navigation and menu browsing work independently of admin state.
    - Keyboard and mobile interactions retain semantic controls.
  - Verification: Build the customer workspace and smoke-test menu navigation and category selection.
  - Dependencies: Tasks 3 and 4.
  - Files touched: `apps/customer/src/components/layout/Navbar.tsx`, `apps/customer/src/components/layout/Footer.tsx`, `apps/customer/src/components/layout/StickyMobileBar.tsx`, `apps/customer/src/components/menu/MenuCard.tsx`, `apps/customer/src/components/menu/MenuSection.tsx`, `apps/customer/src/components/home/BestSellersSection.tsx`, `apps/customer/src/components/home/FlavorsShowcase.tsx`.
  - Estimated scope: Medium.

- [x] **Task 10: Moving cart and item customization**
  - Description: Move the cart context, order drawer, and item customization flow.
  - Acceptance:
    - Cart totals and item customization continue to work.
    - Messenger checkout handoff remains unchanged.
  - Verification: Smoke-test add, update, remove, and checkout actions.
  - Dependencies: Tasks 3, 4, and 9.
  - Files moved: `apps/customer/src/context/CartContext.tsx`, `apps/customer/src/components/order/OrderDrawer.tsx`, `apps/customer/src/components/menu/ItemCustomizerModal.tsx`.
  - Estimated scope: Medium.

- [ ] **Task 11: Moving delivery, reservation, and menu-scan flows**
  - Description: Move delivery rider, table reservation, and physical menu scan interactions.
  - Acceptance:
    - Delivery and reservation entry points remain available.
    - Menu scans load from customer routes.
  - Verification: Smoke-test modal open/close actions; verify scan image URLs after asset task 21.
  - Dependencies: Tasks 3 and 9; cart context from Task 10.
  - Files moved: `apps/customer/src/components/delivery/DeliveryRidersModal.tsx`, `apps/customer/src/components/reservation/TableReservationModal.tsx`, `apps/customer/src/components/menu/MenuScanModal.tsx`.
  - Estimated scope: Medium.

- [x] **Task 12: Moving AI recommendation surfaces**
  - Description: Move the customer AI assistant and Gemini recommendation API/library to the customer app.
  - Acceptance:
    - The recommendation endpoint remains under the same customer URL.
    - Gemini credentials remain server-only.
  - Verification: Build the customer workspace and smoke-test endpoint validation and success responses.
  - Dependencies: Tasks 2, 4, and 9.
  - Files moved: `apps/customer/src/components/ai/PakAiAssistant.tsx`, `apps/customer/src/lib/geminiRecommender.ts`, `apps/customer/src/app/api/v1/ai/recommend/route.ts`.
  - Estimated scope: Medium.

## Checkpoint: Customer App

- [ ] Public routes and APIs build independently.
- [ ] Current menu, cart, reservation, delivery, and checkout actions remain available.
- [ ] No admin tools are mounted in the customer layout.

## Phase 3: Admin App Boundary

- [x] **Task 13: Moving the admin dashboard surface**
  - Description: Move the existing dashboard, admin modal, admin context, and admin app shell out of the customer app.
  - Acceptance:
    - Admin pages and controls are absent from the customer build.
    - The admin build is not enabled as a public deployment before `admin-access` is complete.
  - Verification: Build both apps and confirm customer routes do not include dashboard/admin controls.
  - Dependencies: Tasks 2 and 4.
  - Deployment gate: The admin workspace is buildable for local verification only. No Vercel project or deploy workflow is configured; do not deploy it until `admin-access` is complete.
  - Files touched: `apps/admin/src/app/layout.tsx`, `apps/admin/src/app/globals.css`, `apps/admin/src/app/dashboard/page.tsx`, `apps/admin/src/app/dashboard/layout.tsx`, `apps/admin/src/components/admin/AdminModal.tsx`, `apps/admin/src/context/AdminContext.tsx`, `apps/customer/src/app/layout.tsx`.
  - Estimated scope: Medium.

- [x] **Task 14: Removing admin-only customer wiring**
  - Description: Remove admin providers and dashboard-only navigation logic from customer runtime.
  - Acceptance:
    - Customer layout mounts only customer-facing providers and overlays.
    - No query-string, keyboard, or localStorage shortcut opens admin tools in the customer app.
  - Verification: Search customer output for admin controls and smoke-test customer navigation.
  - Dependencies: Task 13.
  - Files touched: `apps/customer/src/app/robots.ts`, `apps/customer/src/components/ai/PakAiAssistant.tsx`, `apps/customer/src/components/layout/Navbar.tsx`, `apps/customer/src/components/layout/Footer.tsx`, `apps/customer/src/components/layout/StickyMobileBar.tsx`.
  - Estimated scope: Small.

## Phase 4: Static Assets

- [x] **Task 15: Moving customer app identity assets**
  - Description: Move the customer favicon and app icons into the customer app's static asset root.
  - Acceptance:
    - Existing icon URLs resolve in the customer deployment.
  - Verification: Request each icon locally and inspect the rendered page metadata.
  - Dependencies: Task 3.
  - Files touched: `apps/customer/src/app/favicon.ico`, `apps/customer/src/app/icon.png`, `apps/customer/src/app/apple-icon.png`, `apps/customer/public/apple-touch-icon.png`.
  - Estimated scope: Small.

- [x] **Task 16: Moving menu images, group one**
  - Description: Move the first dish image group into the customer app and make the same paths available to admin previews.
  - Acceptance: All listed paths resolve in both app deployments without changing image contents.
  - Verification: Request the image paths from both local apps.
  - Dependencies: Tasks 4 and 13.
  - Files likely touched: `chao-fan-poster.jpg`, `chicken-bundle-wings.jpg`, `chicken-pak-burger.jpg`, `drinks-and-soju.jpg`.
  - Estimated scope: Medium.

- [x] **Task 17: Moving menu images, group two**
  - Description: Move the next dish image group into the customer app and make the same paths available to admin previews.
  - Acceptance: All listed paths resolve in both app deployments without changing image contents.
  - Verification: Request the image paths from both local apps.
  - Dependencies: Tasks 4 and 13.
  - Files likely touched: `fried-chicken-chao-fan.jpg`, `full-pak-meal-carbonara.jpg`, `full-pak-meal-spaghetti.jpg`, `korean-bibimbowl.jpg`.
  - Estimated scope: Medium.

- [x] **Task 18: Moving menu images, group three**
  - Description: Move the next dish image group into the customer app and make the same paths available to admin previews.
  - Acceptance: All listed paths resolve in both app deployments without changing image contents.
  - Verification: Request the image paths from both local apps.
  - Dependencies: Tasks 4 and 13.
  - Files likely touched: `loaded-cheesy-fries.jpg`, `pak-meal-3pcs.png`, `pasta-pak-plate.jpg`, `pork-pepper-rice.jpg`.
  - Estimated scope: Medium.

- [ ] **Task 19: Moving menu images, group four**
  - Description: Move the next dish image group into the customer app and make the same paths available to admin previews.
  - Acceptance: All listed paths resolve in both app deployments without changing image contents.
  - Verification: Request the image paths from both local apps.
  - Dependencies: Tasks 4 and 13.
  - Files likely touched: `porkchop-chao-fan.jpg`, `samgyup-feast-grill.jpg`, `samgyup-lettuce-wrap.jpg`, `samgyup-table-spread.jpg`.
  - Estimated scope: Medium.

- [ ] **Task 20: Moving menu images, group five**
  - Description: Move the final dish image group into the customer app and make the same paths available to admin previews.
  - Acceptance: All listed paths resolve in both app deployments without changing image contents.
  - Verification: Request the image paths from both local apps.
  - Dependencies: Tasks 4 and 13.
  - Files likely touched: `samgyupsal-wrap.jpg`, `shanghai-chao-fan.jpg`, `siomai-chao-fan.jpg`, `sizzling-sisig.jpg`, `unli-pak-plate.jpg`.
  - Estimated scope: Medium.

- [ ] **Task 21: Moving printed menu scans**
  - Description: Move the scanned menu images under the customer app's static asset root while preserving their URLs.
  - Acceptance: All five scan URLs resolve in the customer deployment.
  - Verification: Open each scan in the local menu viewer.
  - Dependencies: Task 11.
  - Files likely touched: `chao-fan.png`, `flavors-unli-alacarte.png`, `pepper-rice-sizzling-bundles.png`, `samgyupsal.png`, `snacks-drinks.png`.
  - Estimated scope: Medium.

## Phase 5: Verification and Documentation

- [ ] **Task 22: Documenting workspace and Vercel deployment targets**
  - Description: Update setup instructions for local development and separate Vercel project roots/build commands.
  - Acceptance:
    - README documents how to run and build each app independently.
    - Admin deployment instructions state it must remain disabled until authentication is implemented.
  - Verification: Follow the documented commands from a clean dependency install.
  - Dependencies: Tasks 1, 2, 3, and 13.
  - Files likely touched: `README.md`, `package.json`.
  - Estimated scope: Small.

- [ ] **Task 23: Verifying independent builds and route boundaries**
  - Description: Add focused workspace/route smoke checks and verify the split against the acceptance criteria.
  - Acceptance:
    - Customer and admin production builds pass independently.
    - Lint and TypeScript checks pass.
    - Customer checkout still opens the existing Messenger/partner handoff.
    - Customer output contains no admin routes or controls.
  - Verification: Run both workspace builds, `npm run lint`, `npx tsc --noEmit`, and focused smoke checks.
  - Dependencies: Tasks 5, 6, 10, 11, 12, 14, 15, 16, 17, 18, 19, 20, 21, and 22.
  - Files likely touched: `package.json`, `tests/workspace-boundaries.test.mjs`.
  - Estimated scope: Small.

## Checkpoint: Platform Split Complete

- [ ] All verification commands pass.
- [ ] Customer and admin apps build independently.
- [ ] The customer app preserves its existing order handoff.
- [ ] The admin deployment remains disabled pending the `admin-access` module.
