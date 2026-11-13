# Spec: Platform Split

## Objective

Separate the existing single Next.js application into independently buildable and deployable customer and admin applications in one repository. The customer app owns the public landing page, menu, and customer ordering experience. The admin app owns the private management surface. Both apps must use explicit shared boundaries rather than browser-local storage to communicate.

This module establishes the application structure and preserves existing customer behavior. Admin authentication, shared menu persistence, storefront improvements, ordering improvements, and budget recommendations are specified in their own modules.

## Tech Stack

- Next.js 16.4.3 App Router
- React 19.3
- TypeScript 5
- Tailwind CSS 4
- npm
- Vercel, with one deployment target per app

## Commands

Current repository checks:

```powershell
npm run lint
npm run build
npx tsc --noEmit
```

Target app checks after the split:

```powershell
npm run build --workspace @pak-na-pak/customer
npm run build --workspace @pak-na-pak/admin
npm run lint
```

The current repository has no test script. Add focused automated checks for app routing and shared-boundary behavior as part of this initiative; select the test tooling during planning rather than treating a successful build as sufficient.

## Project Structure

```text
apps/
  customer/       → Public customer Next.js application
  admin/          → Separately deployed admin Next.js application
packages/
  shared/         → Explicitly shared types and utilities only
public/           → Customer-facing images and static assets, assigned to the app that serves them
```

The final shared package boundaries and static asset ownership will be documented during planning after this spec is approved. Admin routes, login UI, and management tools must not remain reachable through the customer deployment.

## Code Style

Follow the existing TypeScript and App Router conventions: explicit types, named shared exports, focused components, and the project's Tailwind tokens. Keep app-specific UI inside its app; share only code required by both apps.

```tsx
import type { ReactNode } from "react";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return <main className="min-h-screen">{children}</main>;
}
```

## Testing Strategy

- Build each app independently and run the existing ESLint and TypeScript checks.
- Verify public landing, menu, cart, and checkout routes remain available in the customer app.
- Verify admin routes and management UI are absent from the customer deployment.
- Verify both Vercel targets can resolve shared workspace packages without relying on files outside the repository.
- Preserve current Messenger and delivery-partner checkout behavior; payment processing is out of scope.

## Boundaries

- **Always:** Keep customer and admin code in separate apps; keep shared boundaries explicit; preserve existing customer checkout handoffs; ensure no unauthenticated admin deployment is exposed.
- **Ask first:** Changing the approved app split, adding a separate repository, changing deployment providers, or introducing additional paid services.
- **Never:** Put admin credentials in source code or client-side storage; leave a backdoor admin route or shortcut in the customer app; add online payments or an admin order inbox in this module.

## Success Criteria

- Customer and admin apps each have an independent build command and Vercel deployment target.
- The customer app retains its existing public landing/menu and checkout behavior.
- The customer deployment does not expose admin routes, controls, or shortcuts.
- Shared code is limited to explicit packages and is resolvable by both apps in local and Vercel builds.
- No credentials or deployment secrets are committed.

## Open Questions

- None for this module. The approved initiative-level choices are recorded in `CAPABILITY-MAP.md`.
