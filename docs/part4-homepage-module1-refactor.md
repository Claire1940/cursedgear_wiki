# Part 4 Homepage Module 1 Refactor Plan (Cursed Gear)

## Scope
- Project: `/root/Documents/GameProjects/cursedgear_wiki`
- Files to update:
  - `src/app/[locale]/page.tsx`
  - `src/locales/en.json`
- Goal: Replace remaining WWE-themed homepage content with a complete Cursed Gear homepage module set, while keeping ad components and existing homepage architecture.

## Constraints and Guardrails
- Modify only the existing homepage component file (`src/app/[locale]/page.tsx`), no new simplified page file.
- Keep homepage ad components in place; do not strip ad placements.
- Use `lucide-react` icons through existing dynamic icon system.
- Ensure each homepage navigation card uses a unique icon.
- Use theme tokens (`hsl(var(--nav-theme))`, `hsl(var(--gold))`, etc.); avoid hardcoded hex colors in homepage component.
- Remove internal URL links from homepage footer area and use external references only.
- Update English copy only; no translation pass.
- FAQ must explicitly include `Cursed Gear` in questions/answers.

## Content Strategy
- Build a 16-module homepage information architecture aligned with `00首页信息.md`:
  1. Cursed Gear Codes
  2. Cursed Gear Beginner Guide
  3. Cursed Gear Trello, Discord & Wiki Links
  4. Cursed Gear Gears / Classes
  5. Cursed Gear Clans
  6. Cursed Gear Techniques
  7. Cursed Gear Stats Guide
  8. Cursed Gear Best Builds
  9. Cursed Gear Grade Progression
  10. Cursed Gear Expeditions Guide
  11. Cursed Gear Controls & Combat Mechanics
  12. Cursed Gear Heian Rating & Skill Tree
  13. Cursed Gear Technique Unlock & Upgrades
  14. Cursed Gear Weapons & Cybernetics
  15. Cursed Gear Base Building / PMC
  16. Cursed Gear Extraction & Survival Loop
- Keep “video -> quick navigation -> modules” flow to support in-page jump scrolling.
- Keep all module titles prefixed with `Cursed Gear` for SEO consistency.

## UI/UX Refactor Direction
- Preserve current visual identity and motion language, but replace old section templates with reusable module renderer:
  - Overview bullets
  - Optional quick-link cards (external only)
  - Optional status/code table block
  - Optional insight cards
  - Optional action steps/checklist
  - Optional FAQs per module
- Keep responsive behavior for mobile/desktop.
- Maintain animation classes and section anchors for smooth scroll navigation.

## Implementation Plan
1. Replace outdated homepage section wiring in `page.tsx` with data-driven section rendering over `t.modules.sectionOrder`.
2. Keep Hero, Video, Ad slots, FAQ, CTA, and footer structure, but update copy binding to Cursed Gear-only fields.
3. Update footer legal/community links to external URLs only.
4. Replace `src/locales/en.json` homepage-related payload (`tools`, `modules`, `faq`, hero/game copy) with Cursed Gear dataset.
5. Validate with grep checks and build/lint/typecheck workflow.

## Validation Checklist
- `src/locales/en.json` contains Cursed Gear module names and no WWE 2K26 leftover in homepage copy.
- `src/app/[locale]/page.tsx` imports `lucide-react` and uses theme variables instead of hardcoded colors.
- Homepage navigation card icons are all unique.
- FAQ entries contain `Cursed Gear`.
- Local dev server route checks return HTTP 200 for `/` and `/pt`.
- `npm run typecheck`, `npm run lint`, and `npm run build` all pass.
