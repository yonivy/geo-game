# Requirements: GeoGame

**Defined:** 2026-06-26
**Core Value:** The game must feel fast, fair, and polished — tap from one question to the next with zero friction, and the streak mechanic makes every correct answer matter.

## v1 Requirements

### Gameplay

- [ ] **GAME-01**: Player sees 90s countdown timer on game start
- [ ] **GAME-02**: Player is shown a flag image with 4 country-name options
- [ ] **GAME-03**: Player taps an answer with instant correct/incorrect feedback
- [ ] **GAME-04**: Correct answer increments streak counter; streak acts as score multiplier
- [ ] **GAME-05**: Incorrect answer resets streak to 0
- [ ] **GAME-06**: Game progresses to next question regardless of correctness
- [ ] **GAME-07**: Game ends when timer reaches 0
- [ ] **GAME-08**: Final score displayed on end screen
- [ ] **GAME-09**: Player can share score via native Web Share API

### Data

- [ ] **DATA-01**: ~195 UN country flags bundled as SVG assets via `flag-icons` npm package
- [ ] **DATA-02**: Country metadata (name, flag path) in a local data file for the question engine

### UI/UX

- [ ] **UI-01**: Clean, professional design — polished controls, smooth transitions
- [ ] **UI-02**: Mobile-first responsive layout, works on desktop too
- [ ] **UI-03**: PWA manifest + service worker for installability and offline play
- [ ] **UI-04**: Animated streak indicator during gameplay

## v2 Requirements

### Gameplay

- **GAME-10**: Country outline game mode using silhouette images
- **GAME-11**: Leaderboards and score persistence across sessions

### Data

- **DATA-03**: Country outline images (~195) added to asset bundle

### UI/UX

- **UI-05**: Sound effects for correct/incorrect/timer-end events

## Out of Scope

| Feature | Reason |
|---------|--------|
| Country outline mode | Outline SVGs don't exist as a packaged set; deferred to v2 |
| Leaderboards / multiplayer | Requires backend infrastructure; deferred to v2 |
| Sound effects | Deferred to v2 |
| Native Java/Kotlin app | Web-only by design; PWA wraps for Play Store if needed later |
| Typed answers | Multiple choice only — typing introduces unfair latency for some players |

## Traceability

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
| GAME-09 | Phase 2/3 | Complete |
| DATA-01 | Phase 1 | Complete |
| DATA-02 | Phase 1 | Complete |
| UI-01 | Phase 2 | Complete |
| UI-02 | Phase 2 | Complete |
| UI-03 | Phase 3 | Complete |
| UI-04 | Phase 2 | Complete |

**Coverage:**
- v1 requirements: 15 total
- Mapped to phases: 15
- Unmapped: 0 ✓

---
*Requirements defined: 2026-06-26*
*Last updated: 2026-06-26 after initial definition*
