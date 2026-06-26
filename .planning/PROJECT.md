# GeoGame

## What This Is

A timed flag-quiz PWA where you identify countries by their flag (and later, country outlines). See a flag, pick 1 of 4 answers. Right answers build a streak multiplier; wrong answers reset it. 90 seconds to get the highest score possible.

## Core Value

The game must feel fast, fair, and polished — tap from one question to the next with zero friction, and the streak mechanic makes every correct answer matter.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [x] **GAME-01**: Player sees 90s countdown timer on game start
- [ ] **GAME-02**: Player is shown a flag image with 4 country-name options
- [ ] **GAME-03**: Player taps/clicks an answer with instant correct/incorrect feedback
- [x] **GAME-04**: Correct answer increments streak counter; streak acts as score multiplier
- [x] **GAME-05**: Incorrect answer resets streak to 0
- [x] **GAME-06**: Game progresses to next question regardless of correctness
- [x] **GAME-07**: Game ends when timer reaches 0
- [x] **GAME-08**: Final score displayed on end screen
- [ ] **GAME-09**: Player can share score via native Web Share API
- [x] **DATA-01**: ~195 UN country flags bundled as SVG assets
- [x] **DATA-02**: Country metadata (name, flag path) in a local data file
- [ ] **UI-01**: Clean, professional design — polished controls, smooth transitions
- [ ] **UI-02**: Mobile-first responsive layout
- [ ] **UI-03**: PWA manifest + service worker for installability and offline play

### Out of Scope

- Country outline mode — deferred to v2
- Leaderboards / online multiplayer — deferred to v2
- Sound effects — deferred to v2
- Native Java/Kotlin implementation — web-only

## Context

Built as a personal project by a solo developer. No budget for paid hosting or services. Willing to bundle all flag assets in the initial install. Flag SVGs sourced from the `flag-icons` npm package.

## Constraints

- **Tech stack**: Web-only — React + Vite + PWA. No backend, no database, no cloud services.
- **Cost**: Zero recurring costs. Free-tier hosting (Netlify, Vercel, GitHub Pages).
- **Publishing**: PWA first; Play Store via Capacitor/PWABuilder only if desired later.
- **Performance**: Offline-capable. All game data and assets bundled.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| React + Vite + PWA stack | Familiar web tech, free hosting, instant updates, no build pipeline fees | — Pending |
| Sequential phase execution | Small scope, no parallel dependencies between phases | — Pending |
| Flag SVGs from `flag-icons` npm package | Free, comprehensive (~195 countries), well-maintained open source | — Pending |
| No country outlines in v1 | Outline SVGs don't exist as a packaged set; deferred to avoid sourcing complexity | — Pending |
| Web Share API for score sharing | Native share dialog on mobile, no backend needed | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-06-26 after project initialization*
