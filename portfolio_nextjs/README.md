# Dohar Siregar Portfolio

A bounded Next.js App Router portfolio prototype based on the migration PRD. The current implementation preserves the core portfolio structure without inventing unverified profile data or external API behavior.

## Current scope

Implemented:

- Responsive homepage at `/`
- About/profile section
- Journey section with an explicit placeholder until verified history data is available
- Contact links with safe external-link attributes
- Projects route at `/projects` with an explicit unconnected-data state
- Semantic layout, navigation, and footer
- Responsive styling and keyboard focus states
- Next.js metadata and optimized Geist fonts
- Route-level error and not-found boundaries

Intentionally deferred:

- GitHub repository discovery
- Vercel deployment matching
- Theme switching
- Interactive work and education timeline
- Portrait assets
- Vercel Analytics and Speed Insights
- Additional UI libraries and unused PRD dependencies

These items should be added only after the original implementation, source data, and credentials are verified.

## Stack

- Next.js App Router
- React 19
- TypeScript
- Tailwind CSS v4 tooling
- `next/font` with Geist

The project intentionally keeps the dependency set small. React Router, Vite-only packages, API clients, and speculative UI dependencies were not carried into this prototype.

## Project structure

```text
app/
├── error.tsx            # Route error boundary
├── globals.css          # Global and responsive styles
├── layout.tsx           # Root layout, metadata, and fonts
├── not-found.tsx        # 404 page
├── page.tsx             # About, journey, contact, and footer
└── projects/
    └── page.tsx         # Projects empty state
```

## Getting started

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available commands

```bash
npm run dev       # Start the development server
npm run lint      # Run ESLint
npx tsc --noEmit  # Type-check without emitting files
npm run build     # Create a production build
npm run start     # Serve the production build
```

## Validation

The current prototype has been validated with:

- `npm run lint`
- `npx tsc --noEmit`
- `npm run build`

Manual smoke checks should cover `/`, `/projects`, keyboard navigation, external links, and responsive layouts at mobile, tablet, and desktop widths.

## Migration notes

When the deferred integrations are implemented:

1. Keep GitHub and Vercel credentials server-only.
2. Use Server Components for project data fetching by default.
3. Add explicit empty and error states instead of an indefinite loading skeleton.
4. Preserve the optional `deploymentUrl` field only for verified production deployments.
5. Add client components only for interactions such as theme controls, mobile navigation, and timeline selection.
6. Keep environment variables unprefixed by `NEXT_PUBLIC_`.

Expected server-only variables for the full migration are documented in the PRD:

```env
GITHUB_TOKEN=
GITHUB_USERNAME=
GITHUB_AUTHOR_EMAIL=
VERCEL_TOKEN=
VERCEL_TEAM_ID=
```

Do not commit real values or expose them to browser code.

## Deployment

The app is suitable for deployment on [Vercel](https://vercel.com). Build locally with `npm run build` before deploying. Configure server-only environment variables in the Vercel project settings when the GitHub and Vercel integrations are implemented.

## Reference

See [`../nextjs-migration-prd.md`](../nextjs-migration-prd.md) for the complete product requirements, migration phases, security rules, and acceptance criteria.
