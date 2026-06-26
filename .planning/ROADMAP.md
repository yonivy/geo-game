# Roadmap: GeoGame

**Created:** 2026-06-26
**Phases:** 3
**Requirements:** 15 v1 requirements

## Phase 1: Data + Core Engine

**Goal:** Set up the project scaffold, country dataset, flag assets, question generator, timer, and scoring engine — the full data layer and game logic without UI.

**Mode:** mvp

**Success Criteria:**
1. Player starts a game and sees a 90s countdown timer counting down
2. Questions are generated with 1 correct + 3 random distractor countries
3. Correct answer increments streak; streak multiplier affects score
4. Incorrect answer resets streak to 0
5. Game ends cleanly at 0:00 with a final score
6. All ~195 country flag SVGs are bundled in the app

**Requirements:** DATA-01, DATA-02, GAME-01, GAME-04, GAME-05, GAME-06, GAME-07, GAME-08

---

## Phase 2: Game UI

**Goal:** Build the complete game interface — question rendering, answer selection, visual feedback, streak display, score screen, and screen transitions.

**Mode:** mvp

**Success Criteria:**
1. Flag image is displayed prominently with 4 answer buttons below
2. Tapping an answer shows instant correct (green) / incorrect (red) feedback
3. Next question appears automatically or after a brief animation
4. Streak counter is visible and animates on changes
5. Game over screen shows final score with share button
6. Layout is responsive — works on mobile and desktop

**Requirements:** GAME-02, GAME-03, UI-01, UI-02, UI-04, GAME-09

---

## Phase 3: PWA + Polish

**Goal:** Make the app installable and offline-capable via PWA, polish animations and transitions, final responsive QA.

**Mode:** mvp

**Success Criteria:**
1. App can be installed on device via browser install prompt
2. Game loads and plays fully offline (after initial visit)
3. Web Share API shares score screenshot or text
4. Transitions between screens are smooth and professional
5. Edge cases handled (rapid tapping, timer at 0 mid-question)
6. Final test pass on mobile Safari and Chrome

**Requirements:** UI-03, GAME-09 (share actually implemented), UI-01, UI-02

---

## Requirement Coverage

| Requirement | Phase | Status |
|-------------|-------|--------|
| GAME-01 | Phase 1 | Complete |
| GAME-02 | Phase 2 | Complete |
| GAME-03 | Phase 2 | Complete |
| GAME-04 | Phase 1 | Complete |
| GAME-05 | Phase 1 | Complete |
| GAME-06 | Phase 1 | Complete |
| GAME-07 | Phase 1 | Complete |
| GAME-08 | Phase 1 | Complete |
| GAME-09 | Phase 2/3 | Pending |
| DATA-01 | Phase 1 | Complete |
| DATA-02 | Phase 1 | Complete |
| UI-01 | Phase 2 | Complete |
| UI-02 | Phase 2 | Complete |
| UI-03 | Phase 3 | Pending |
| UI-04 | Phase 2 | Complete |

**Coverage:**
- v1 requirements: 15 total
- Mapped to phases: 15
- Unmapped: 0 ✓
