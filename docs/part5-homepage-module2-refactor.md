# Part 5 Homepage Module 2 Refactor Plan (Cursed Gear)

## Scope
- Project: `/root/Documents/GameProjects/cursedgear_wiki`
- Files to update:
  - `src/app/[locale]/page.tsx`
  - `src/locales/en.json`
- Requirement source:
  - `/root/Documents/GameProjects/0_meta/cursedgear_wiki/00首页信息-2.json`
- Goal: Implement homepage module set #2 (Clans, Techniques, Stats Guide, Best Builds) with complete section content and consistent Cursed Gear visual language.

## Preconditions Check
- Previous step commit exists on `main`: `5850190`.
- Existing page architecture already includes Hero/Video/Navigation/Modules/Ads; this refactor extends module rendering without removing ad components.

## Constraints
- Only modify existing homepage component file (`src/app/[locale]/page.tsx`), no new simplified page file.
- Keep all ad-related components and placements.
- Update English locale only (`src/locales/en.json`), no translation pass.
- Module names must keep `Cursed Gear + xxx` format for SEO.
- Use `lucide-react` icon system and keep navigation card icons unique.
- Use global theme tokens (e.g., `hsl(var(--nav-theme))`, `hsl(var(--gold))`) and avoid hardcoded hex in homepage component.
- Keep links external; no internal URL link blocks introduced.
- Avoid words like `reliability`, `unverified`, `disputed`, `tough` in homepage copy.

## Content Mapping (00首页信息-2)
1. `Cursed Gear Clans`
- Keep overview and cards.
- Add decision table block (`Question` / `Why it matters`) for Royal/reroll guidance.

2. `Cursed Gear Techniques`
- Keep overview and cards.
- Add filter chip/grid block for PvE/PvP/mobility/beginner/combo/Grade 4 angles.

3. `Cursed Gear Stats Guide`
- Replace generic cards with explicit six-stat cards:
  - Durability, Physicality, Output, Efficiency, Awareness, Dexterity.
- Add starter preset cards and explicit caution tips.

4. `Cursed Gear Best Builds`
- Expand starter build cards to four routes.
- Add build comparison table (`Build`, `Best For`, `Core Stats`, `Main Risk`).
- Add UI rules/tips block for beginner decision-making.

## UI/UX Changes in `page.tsx`
- Preserve existing section renderer and add optional blocks:
  - `section.infoTable` rendering for two-dimensional comparison/decision tables.
  - `section.tagGrid` rendering for homepage filters/tags.
  - `section.statCards` rendering for stat + detail cards.
  - `section.comparisonTable` rendering for multi-column build comparison.
  - `section.tips` rendering as highlighted checklist panel.
- Keep responsive behavior:
  - Tables use horizontal overflow wrapper on mobile.
  - Grids collapse to 1–2 columns on small screens.

## Validation Plan
1. Confirm `homepage` module payload in `src/locales/en.json` includes new module-2 structures.
2. Run local checks:
- `npm run typecheck`
- `npm run lint`
- `npm run build`
3. Start dev server and verify HTTP 200:
- `/`
- `/pt`
4. Grep checks:
- Old theme leftovers absent (`WWE 2K26`)
- Forbidden words absent (`reliability|unverified|disputed|tough`)
- FAQ still includes `Cursed Gear`
- `lucide-react` usage present in homepage component.

## Delivery
- Commit all required edits and push to `main`.
- Verify latest GitHub Actions run status with `gh`.
- Execute redeploy script for `cursedgear.wiki`.
