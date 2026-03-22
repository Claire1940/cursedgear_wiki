# Part 6 Homepage Module 3 Refactor Plan (Cursed Gear)

## Scope
- Project: `/root/Documents/GameProjects/cursedgear_wiki`
- Files to update:
  - `src/app/[locale]/page.tsx`
  - `src/locales/en.json`
- Requirement source:
  - `/root/Documents/GameProjects/0_meta/cursedgear_wiki/00首页信息-3.json`
- Goal:
  - Implement homepage module set #3 (Grade Progression, Expeditions Guide, Controls & Combat Mechanics, Heian Rating & Skill Tree) on the existing homepage architecture.

## Preconditions Check
- Current branch: `main`
- Latest history includes prior completed step commit:
  - `4e82651 完成主题重构: Cursed Gear`
  - `5850190 完成主题重构: Cursed Gear`
- Homepage keeps ad-related components in place; this refactor extends content structures only.

## Constraints
- Only modify existing homepage component file (`src/app/[locale]/page.tsx`), do not create a new page file.
- Preserve all ad components and existing ad slots.
- Update English locale only (`src/locales/en.json`).
- Keep module naming in `Cursed Gear + xxx` SEO format.
- Use `lucide-react` icon system via existing `DynamicIcon`.
- Keep icon/text color tokens aligned with theme variables (`--nav-theme`, `--nav-theme-light`, `--gold`), no new hardcoded color constants.
- Avoid restricted wording in copy (`reliability`, `unverified`, `disputed`, `tough`).

## Content Mapping (00首页信息-3)
1. `Cursed Gear Grade Progression`
- Keep step flow.
- Add milestone cards:
  - Grade 4
  - Grade Exams
  - 500+ Time Runs
- Add module FAQ:
  - cursed technique unlock timing
  - fastest early progression loop

2. `Cursed Gear Expeditions Guide`
- Replace generic expedition cards with object-focused cards:
  - Caches
  - Veils
  - Generators / Encryptions
  - Evac Points
- Add overview bullets for party size, beginner objective, and tier risk.
- Add homepage route flow as `steps`.

3. `Cursed Gear Controls & Combat Mechanics`
- Add keybind table as `infoTable` (Action/Key).
- Add advanced mechanics cards:
  - Curse Dodge
  - Parry
  - Cursed Energy Timing
  - Sprint Attack
- Add combat warning tips section.

4. `Cursed Gear Heian Rating & Skill Tree`
- Add HR use table as `infoTable` (Use/Cost / note).
- Add strategy cards:
  - Early Value
  - Reroll Opportunity Cost
  - Homepage CTA
- Add user-intent tips list.

## UI/UX Adjustments in `page.tsx`
- Reuse existing dynamic section renderer and data contracts already used in prior parts:
  - `cards`, `overview`, `steps`, `moduleFaq`, `infoTable`, `tips`.
- Extend cards renderer to support optional per-card icon (`card.icon`) using `DynamicIcon`.
- Keep responsive behavior:
  - mobile-first stacked grids
  - table horizontal overflow wrapper retained

## Validation Plan
1. Data checks
- Confirm `modules.sectionOrder` still includes module 9-12 keys in order.
- Confirm each new Part6 card has unique `icon` values in locale content.

2. Local runtime checks
- `npm run typecheck`
- `npm run lint`
- `npm run build`
- Start dev server and verify:
  - `curl -I http://localhost:${DEV_PORT}/`
  - `curl -I http://localhost:${DEV_PORT}/pt`

3. Guard checks
- `grep "homepage\\." src/locales/en.json | wc -l` (trend check)
- `grep "Cursed Gear" src/locales/en.json | wc -l` (SEO naming presence)
- `grep -iE "reliability|unverified|disputed|tough" src/locales/en.json` should return no matches.

## Delivery
- Stage all updated files.
- Commit with requested message template.
- Push current branch to origin.
- Check GitHub Actions with `gh`.
- Execute redeploy script:
  - `/root/.openclaw/skills/wiki-deploy/redeploy-wiki.sh cursedgear.wiki`
