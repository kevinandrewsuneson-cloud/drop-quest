# Drop Quest Prototype

This repository contains a simple responsive wireframe prototype for **Drop Quest**, a college student game that supports the mission of charity: water.

## Open locally

1. Clone or download this repository.
2. Open `/home/runner/work/drop-quest/drop-quest/index.html` directly in any modern browser.
3. No install/build step is required.

## MVP features

- Landing screen with title, tagline, description, **Start Game**, and **How to Play**
- How to Play screen with core objectives and controls
- Main game screen with:
  - Village name
  - 60-second timer
  - Score, water, and resource counters
  - Clean-water progress meter
  - Large water-drop action button
  - Supplies collection and build buttons
  - Status/message feedback area
- Win screen with:
  - Success message
  - Final score
  - One educational global water fact
  - Play Again button
- Lose screen with:
  - Encouraging message
  - Final score
  - Try Again button
- Vanilla JavaScript game logic for:
  - Water and score gains
  - Resource collection
  - Resource-gated construction actions
  - Button disabling when resources are insufficient
  - Win at 100% clean-water meter
  - Loss when timer reaches zero
