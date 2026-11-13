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

- [ ] **Task 6: Moving customer menu and analytics APIs**
  - Description: Move the public menu and analytics API routes without changing their response contracts.
  - Acceptance:
    - Public menu filters and response shape are preserved.
    - No admin write operation is exposed by these public routes.
  - Verification: Build the customer workspace and smoke-test the existing GET endpoints.
  - Dependencies: Tasks 2 and 4.
  - Files likely touched: `src/app/api/v1/menu/route.ts`, `src/app/api/v1/analytics/route.ts`, corresponding customer API routes.
  - Estimated scope: Medium.

- [ ] **Task 7: Moving home page sections, group one**
  - Description: Move the hero, best sellers, flavor showcase, and samgyup showcase components.
  - Acceptance:
    - The customer homepage renders all four sections.
    - Existing interactions and image paths continue to work.
  - Verification: Build the customer workspace and smoke-test the homepage at desktop and mobile widths.
  - Dependencies: Tasks 3 and 4.
  - Files likely touched: `HeroSection.tsx`, `BestSellersSection.tsx`, `FlavorsShowcase.tsx`, `SamgyupShowcase.tsx`.
  - Estimated scope: Medium.

- [ ] **Task 8: Moving home page sections, group two**
  - Description: Move the promo, about, location, and delivery partner sections.
  - Acceptance:
    - The customer homepage renders all four sections in the current order.
    - Links, reservation entry points, and delivery partner entry points remain available.
  - Verification: Build the customer workspace and smoke-test section anchors and actions.
  - Dependencies: Tasks 3 and 4.
  - Files likely touched: `PromoSection.tsx`, `AboutSection.tsx`, `LocationSection.tsx`, `DeliveryPartnersSection.tsx`.
  - Estimated scope: Medium.

- [ ] **Task 9: Moving customer navigation and menu components**
  - Description: Move the navbar, footer, sticky mobile bar, menu card, and menu section.
  - Acceptance:
    - Customer navigation and menu browsing work independently of admin state.
    - Keyboard and mobile interactions retain semantic controls.
  - Verification: Build the customer workspace and smoke-test menu navigation and category selection.
  - Dependencies: Tasks 3 and 4.
  - Files likely touched: `Navbar.tsx`, `Footer.tsx`, `StickyMobileBar.tsx`, `MenuCard.tsx`, `MenuSection.tsx`.
  - Estimated scope: Medium.

- [ ] **Task 10: Moving cart and item customization**
  - Description: Move the cart context, order drawer, and item customization flow.
  - Acceptance:
    - Cart totals and item customization continue to work.
    - Messenger checkout handoff remains unchanged.
  - Verification: Smoke-test add, update, remove, and checkout actions.
  - Dependencies: Tasks 3, 4, and 9.
  - Files likely touched: `CartContext.tsx`, `OrderDrawer.tsx`, `ItemCustomizerModal.tsx`.
  - Estimated scope: Medium.

- [ ] **Task 11: Moving delivery, reservation, and menu-scan flows**
  - Description: Move delivery rider, table reservation, and physical menu scan interactions.
  - Acceptance:
    - Delivery and reservation entry points remain available.
    - Menu scans load from customer routes.
  - Verification: Smoke-test the three modal flows and their close/return actions.
  - Dependencies: Tasks 3 and 9; cart context from Task 10.
  - Files likely touched: `DeliveryRidersModal.tsx`, `TableReservationModal.tsx`, `MenuScanModal.tsx`.
  - Estimated scope: Medium.

- [ ] **Task 12: Moving AI recommendation surfaces**
  - Description: Move the customer AI assistant and Gemini recommendation API/library to the customer app.
  - Acceptance:
    - The recommendation endpoint remains under the same customer URL.
    - Gemini credentials remain server-only.
  - Verification: Build the customer workspace and smoke-test endpoint validation and success responses.
  - Dependencies: Tasks 2, 4, and 9.
  - Files likely touched: `PakAiAssistant.tsx`, `geminiRecommender.ts`, `src/app/api/v1/ai/recommend/route.ts`.
  - Estimated scope: Medium.

## Checkpoint: Customer App

- [ ] Public routes and APIs build independently.
- [ ] Current menu, cart, reservation, delivery, and checkout actions remain available.
- [ ] No admin tools are mounted in the customer layout.

## Phase 3: Admin App Boundary

- [ ] **Task 13: Moving the admin dashboard surface**
  - Description: Move the existing dashboard, admin modal, admin context, and admin app shell out of the customer app.
  - Acceptance:
    - Admin pages and controls are absent from the customer build.
    - The admin build is not enabled as a public deployment before `admin-access` is complete.
  - Verification: Build both apps and confirm customer routes do not include dashboard/admin controls.
  - Dependencies: Tasks 2 and 4.
  - Files likely touched: `src/app/dashboard/page.tsx`, `src/app/dashboard/layout.tsx`, `AdminModal.tsx`, `AdminContext.tsx`, `apps/admin/src/app/layout.tsx`.
  - Estimated scope: Medium.

- [ ] **Task 14: Removing admin-only customer wiring**
  - Description: Remove admin providers and dashboard-only navigation logic from customer runtime.
  - Acceptance:
    - Customer layout mounts only customer-facing providers and overlays.
    - No query-string, keyboard, or localStorage shortcut opens admin tools in the customer app.
  - Verification: Search customer output for admin controls and smoke-test customer navigation.
  - Dependencies: Task 13.
  - Files likely touched: customer `layout.tsx`, customer `Navbar.tsx`.
  - Estimated scope: Small.

## Phase 4: Static Assets

- [ ] **Task 15: Moving customer app identity assets**
  - Description: Move the customer favicon and app icons into the customer app's static asset root.
  - Acceptance:
    - Existing icon URLs resolve in the customer deployment.
  - Verification: Request each icon locally and inspect the rendered page metadata.
  - Dependencies: Task 3.
  - Files likely touched: `apple-touch-icon.png`, `favicon.ico`, `icon.png`.
  - Estimated scope: Small.

- [ ] **Task 16: Moving menu images, group one**
  - Description: Move the first dish image group into the customer app and make the same paths available to admin previews.
  - Acceptance: All listed paths resolve in both app deployments without changing image contents.
  - Verification: Request the image paths from both local apps.
  - Dependencies: Tasks 4 and 13.
  - Files likely touched: `chao-fan-poster.jpg`, `chicken-bundle-wings.jpg`, `chicken-pak-burger.jpg`, `drinks-and-soju.jpg`.
  - Estimated scope: Medium.

- [ ] **Task 17: Moving menu images, group two**
  - Description: Move the next dish image group into the customer app and make the same paths available to admin previews.
  - Acceptance: All listed paths resolve in both app deployments without changing image contents.
  - Verification: Request the image paths from both local apps.
  - Dependencies: Tasks 4 and 13.
  - Files likely touched: `fried-chicken-chao-fan.jpg`, `full-pak-meal-carbonara.jpg`, `full-pak-meal-spaghetti.jpg`, `korean-bibimbowl.jpg`.
  - Estimated scope: Medium.

- [ ] **Task 18: Moving menu images, group three**
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
