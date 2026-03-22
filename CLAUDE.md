# Radial

Digital product design studio that designs and builds digital products with a strong focus on user experience. We leverage AI in our process.

## Tech Stack

- Next.js (App Router)
- TypeScript (always)
- Tailwind CSS v4
- shadcn/ui for UI components
- Syne font for headings, DM Sans for body text

## Design Principles

- Light, clean, minimalist aesthetic
- Off-white background (#FAFAFA) with near-black text (#0A0A0A)
- Single accent color: Radial blue (#005BE4)
- Subtle shadows, no gradients or glows
- Light and dark mode support
- Clean, well-structured components
- Mobile-first responsive design

## Design Tokens

All design tokens are defined in `app/globals.css` via Tailwind's `@theme` block.
Available as Tailwind classes: `bg-surface`, `text-primary`, `text-accent`, `rounded-xl`, `shadow-card`, etc.

## Conventions

- Use "Studio" (not "Agency") when referring to Radial
- Keep components small and focused
- Use server components by default; only add "use client" when needed
- Prefer semantic HTML elements
