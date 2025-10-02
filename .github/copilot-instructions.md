# Copilot Instructions for AI Coding Agents

## Project Overview
- This is a Next.js 13+ app using the `/src/app` directory structure and the App Router.
- Major features are split into sections (`src/app/sections/`), components (`src/app/components/`), and API routes (`src/app/api/`).
- Data flows from API routes (e.g., `src/app/api/blog/route.ts`) to client/server components (e.g., `BlogClient.tsx`, `BlogServer.tsx`).
- External data is fetched via `src/app/lib/queries.ts` and `src/app/lib/sanity.ts` (Sanity CMS integration).

## Key Workflows
- **Development:** Use `npm run dev` to start the local server (port 3000).
- **Build:** Use `npm run build` for production builds.
- **Linting:** Project uses ESLint with config in `eslint.config.mjs`.
- **Type Checking:** TypeScript is enforced via `tsconfig.json`.
- **Styling:** Global styles in `src/app/globals.css` and `src/app/styles/globals.css`. Uses PostCSS (`postcss.config.mjs`).

## Patterns & Conventions
- **Components:** Prefer functional components in `src/app/components/`. Use client/server suffixes to distinguish rendering context.
- **Sections:** Page sections (e.g., Hero, Footer, Skills) are in `src/app/sections/` and composed in top-level pages.
- **API Routes:** Use Next.js API route handlers in `src/app/api/` for backend logic. Return JSON responses.
- **Data Fetching:** Use `lib/queries.ts` for Sanity queries. Use `lib/sanityImage.ts` for image URLs.
- **Routing:** Top-level pages are in `src/app/pages/` and `src/app/page.tsx`. Custom 404 in `src/app/pages/404.tsx`.
- **Assets:** Static files (SVG, PNG) are in `public/`.

## Integration Points
- **Sanity CMS:** All dynamic content is fetched via Sanity. See `lib/sanity.ts` for client setup.
- **Font Optimization:** Uses `next/font` for loading Geist font.

## Examples
- To add a new section, create a file in `src/app/sections/`, then import and use it in `src/app/page.tsx`.
- To add a new API route, create a handler in `src/app/api/[route]/route.ts`.
- To fetch data from Sanity, use helpers in `lib/queries.ts`.

## References
- See `README.md` for basic setup and deployment.
- See `src/app/layout.tsx` for global layout and providers.
- See `src/app/components/Navbar.tsx` and `Footer.tsx` for navigation patterns.

---
_If any conventions or workflows are unclear, ask for clarification or examples from the user before proceeding._
