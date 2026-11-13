# Capability Map: Pak na Pak Customer and Admin Platform

## Approved architecture

- Keep one repository with independently buildable and deployable customer and admin Next.js apps.
- Deploy the apps as separate Vercel project targets.
- Use one environment-provisioned admin account; never store credentials in source code or browser storage.
- Persist menu and availability changes in shared server-side storage so both apps see the same data.
- Preserve the current Messenger and delivery-partner checkout handoff. Do not add online payments or an admin order inbox.
- Use Gemini for budget-aware recommendations and show deterministic budget-based suggestions if Gemini is unavailable or takes more than three seconds.
- Cart quantity and total updates should be immediate.

## Modules

| Module id | Responsibility | Depends on |
|---|---|---|
| `platform-split` | Establish separate customer and admin apps in the same repository and define their shared boundaries. | — |
| `admin-access` | Provide the protected admin app and single-account email/password authentication configured outside source control. | `platform-split` |
| `shared-menu-data` | Persist menu, stock, and promotion data; expose a shared API for both apps, with admin writes protected by `admin-access`. | `platform-split`, `admin-access` |
| `customer-storefront` | Provide the responsive customer landing page and menu experience using shared menu data. | `platform-split`, `shared-menu-data` |
| `order-flow` | Improve the customer cart and checkout experience while preserving Messenger and delivery-partner handoffs. | `customer-storefront` |
| `budget-recommendations` | Recommend menu combinations within a budget using Gemini and an immediate deterministic fallback. | `customer-storefront` |

## Build order

`platform-split` → `admin-access` → `shared-menu-data` → `customer-storefront` → `order-flow` and `budget-recommendations`.

Each module requires its own approved specification before planning or implementation begins. The module ids and dependency direction in this map are the source of truth.
