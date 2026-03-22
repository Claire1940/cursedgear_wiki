# Part 7 Homepage Module 4 Refactor Plan (Cursed Gear)

## Scope
- Project: `/root/Documents/GameProjects/cursedgear_wiki`
- Files to update:
  - `src/app/[locale]/page.tsx`
  - `src/locales/en.json`
- Requirement source:
  - `/root/Documents/GameProjects/0_meta/cursedgear_wiki/00首页信息-4.json`
- Goal:
  - Implement homepage module set #4 (Technique Unlock & Upgrades, Weapons & Cybernetics, Base Building / PMC, Extraction & Survival Loop) on top of the existing homepage architecture.

## Preconditions Check
- Branch: `main`
- Prior step commits already exist in history, including:
  - `4e82651 完成主题重构: Cursed Gear`
  - `bd5fd7f 完成主题重构: Cursed Gear`
  - `f629341 完成主题重构: Cursed Gear`
- Homepage ad components and slots are already present; this task keeps all ad code untouched.

## Constraints
- Only modify existing page component: `src/app/[locale]/page.tsx`.
- Do not remove any ad-related imports, components, or render blocks.
- Update English locale only (`src/locales/en.json`).
- Keep SEO-friendly naming as `Cursed Gear + module topic`.
- Use Lucide icons through the existing `DynamicIcon` path.
- Keep icon/text color styling tied to theme tokens (`--nav-theme`, `--nav-theme-light`, `--gold`, `border`, `card`), no new hardcoded hex values.
- Avoid restricted words in copy (`reliability`, `unverified`, `disputed`, `tough`).

## Content Mapping (00首页信息-4)
1. `Cursed Gear Technique Unlock & Upgrades`
- Flow steps:
  - Grade 4 milestone
  - collect 3 same-type shards
  - craft crystal
  - consume crystal to unlock cursed technique layer/blue bar
- Upgrade cards:
  - Potency
  - Haste
  - Efficiency
- Related system tips and cross-link intent to techniques/build/progression modules.

2. `Cursed Gear Weapons & Cybernetics`
- Two-layer equipment cards:
  - Weapons
  - Cybernetics
- Add bonus/synergy chips for user intent:
  - weapon fit by build
  - early cybernetic bonus value
  - stat interaction with Physicality/Output/survivability
- Add homepage framing tips for cross-module navigation.

3. `Cursed Gear Base Building / PMC`
- Feature cards:
  - Identity differentiator
  - Party utility
  - Build Mode control hook
- Upgrade path flow to show guide expansion direction.
- Add follow-up links intent (controls/progression/expeditions/official references).

4. `Cursed Gear Extraction & Survival Loop`
- Risk-reward flow:
  - enter expedition
  - loot selective objectives
  - extract after profit threshold
  - convert gains into progression
- Survival cards:
  - 100 Time early exit rule
  - Healers and recovery access
  - Death penalty
- Add user-facing question checklist to guide deeper page routing.

## UI/UX Adjustments in `page.tsx`
- Reuse the current data-driven section renderer.
- Keep existing blocks (`overview`, `cards`, `steps`, `tips`, `moduleFaq`) and add one optional chip block for compact “bonus chips” display.
- Ensure each new card uses a distinct icon in locale data.
- Preserve mobile-first behavior and existing spacing rhythm.

## Validation Plan
1. Content integrity
- Confirm `tools.cards` and `modules.sectionOrder` include all four Part7 modules in expected order.
- Confirm each new card in Part7 modules includes unique icon names.

2. Guard checks
- Ensure no legacy term remains:
  - `grep -i "WWE 2K26" src/locales/en.json src/app/[locale]/page.tsx`
- Ensure restricted words are absent:
  - `grep -iE "reliability|unverified|disputed|tough" src/locales/en.json`

3. Runtime and build
- Start dev server and verify URLs with curl:
  - `/`
  - `/pt`
- Run:
  - `npm run typecheck`
  - `npm run lint`
  - `npm run build`

4. Delivery automation
- Stage all changes and commit with required message.
- Push to origin (switch remote HTTPS->SSH if needed).
- Check GitHub Actions via `gh run list` and `gh run watch`.
- Run redeploy script:
  - `/root/.openclaw/skills/wiki-deploy/redeploy-wiki.sh cursedgear.wiki`
