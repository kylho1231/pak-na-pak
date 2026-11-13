# Implementation Plan: Platform Split

## Overview

Move the current single Next.js application into independently buildable customer and admin apps in the same npm-workspace repository, ready for separate Vercel project targets. This plan covers only the approved `platform-split` module. The customer UI redesign and interactive ordering work requested by the user belong to the later `customer-storefront` and `order-flow` modules; this split must preserve the current customer behavior.

## Architecture Decisions

- Use `apps/customer` and `apps/admin` as the Next.js app roots and keep a single root lockfile.
- Keep shared code in explicit workspace packages; do not make either app depend on undocumented paths into the other app.
- The customer app owns public pages and customer-facing API routes. The admin app owns the management surface and must not be deployed publicly until `admin-access` is complete.
- Keep Supabase-backed menu persistence for the separate `shared-menu-data` module; do not add database behavior in this split.
- Keep the existing Messenger and delivery-partner checkout flow. No online payments or admin order inbox are included.
- Before implementation, inspect the installed Next.js 16.4.3 guides under `node_modules/next/dist/docs/` for the supported monorepo, workspace, and deployment conventions.

## Verified Framework Guidance

- Next.js 16 automatically transpiles npm workspace packages with Turbopack, so do not add `transpilePackages` unless a specific package requires it.
- If an app imports files from a sibling workspace package, set `outputFileTracingRoot` to the monorepo root where needed so production traces include those files.
- Vercel supports a separate project for each app directory in the same Git repository; configure each project's Root Directory to its app folder.

Sources:

- [Next.js `transpilePackages`](https://nextjs.org/docs/app/api-reference/config/next-config-js/transpilePackages)
- [Next.js output tracing in monorepos](https://nextjs.org/docs/app/api-reference/config/next-config-js/output#caveats)
- [Vercel monorepos](https://vercel.com/docs/monorepos)

## Work Sequence

1. Establish the npm workspace and separate app build/dev commands while retaining the existing root lockfile.
2. Move the current customer application into `apps/customer`, including its app routes, components, context, data, API routes, and public assets; preserve current behavior.
3. Establish `apps/admin` as a separate app boundary and move the dashboard surface out of the customer deployment. Do not expose this deployment until the `admin-access` module adds server-side protection.
4. Extract only code genuinely shared by both apps into explicit workspace packages; keep styles and components app-specific unless both apps need them.
5. Add smoke checks for app manifests, route ownership, independent production builds, and customer checkout handoff.
6. Document separate Vercel project root/build settings and verify both apps build from the repository root.

## Dependency and Parallelization Notes

- Workspace configuration precedes either app build.
- Customer and admin code migration may be prepared separately, but shared package contracts must be agreed before both apps consume the same code.
- The admin deployment is blocked until `admin-access` is complete; the route move alone is not authorization.
- `shared-menu-data`, `customer-storefront`, `order-flow`, and `budget-recommendations` remain gated by their own approved specs.

## Verification Checkpoints

- After workspace setup: root lint and TypeScript checks pass.
- After app migration: customer and admin production builds pass independently.
- Before platform-split completion: customer routes and existing Messenger/partner checkout are smoke-tested; admin routes are absent from customer output; no unauthenticated admin deployment is enabled.

## Risks and Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Current app-wide providers mount cart, admin, and customer UI together. | Admin-only state or shortcuts could leak into the customer deployment. | Audit root layout/provider imports and verify route ownership after the split. |
| Current admin menu edits are stored in browser localStorage. | Two separate deployments cannot share these edits. | Replace this only in the later `shared-menu-data` module; do not claim cross-app persistence during the split. |
| Next.js 16 monorepo behavior differs from earlier conventions. | Incorrect workspace or Vercel configuration could break builds. | Read the installed Next.js 16 guides before code and validate both app builds at each checkpoint. |
| A split can accidentally change customer ordering behavior. | Customers may lose existing Messenger or delivery-partner checkout. | Add focused smoke coverage for the existing handoff before and after the migration. |
| Admin code is moved before authentication is implemented. | A separately deployed admin app could be exposed without protection. | Keep its Vercel target disabled until `admin-access` passes its auth verification. |

## Open Questions

- None requiring a new user decision. Next.js 16 workspace and Vercel build details will be verified against the installed documentation during implementation.
