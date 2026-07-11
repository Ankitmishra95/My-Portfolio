# Ankit Kumar — Cinematic Portfolio Hero

A fullscreen, sticky video hero built for Next.js App Router. Foreground
talking-head video + a blurred ambient duplicate + a plain-Three.js bokeh
particle layer + GSAP entrance choreography, wrapped in a dark, warm-ember /
signal-blue cinematic palette.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Structure

```
app/
  layout.tsx          Fonts (Fraunces / Space Grotesk / JetBrains Mono) + metadata
  globals.css          Design tokens (colors, easing) and base reset
  page.tsx              Composes the hero + every resume section, in order
components/hero/
  VideoIntro.tsx         Hero: video layers, GSAP timeline, controls, scroll indicator
  VideoIntro.module.css  All hero styling — gradients, glass controls, type scale
  CinematicLayer.tsx     Plain Three.js bokeh/particle field (no react-three-fiber)
components/sections/
  SectionHeading.tsx      Shared eyebrow + title pattern reused by every section below
  About.tsx                Professional Summary, expanded
  Skills.tsx                Technical Skills, grouped by category
  Projects.tsx               Both resume projects (moved out of page.tsx for reuse)
  Education.tsx               LNCTS B.Tech, CGPA
  Certifications.tsx           OCI, and both Cisco certs
  Achievements.tsx              LeetCode 100+ callout
  Contact.tsx                   Footer: email, phone, LinkedIn, GitHub, location
public/videos/
  hero.mp4               The uploaded talking-head clip, used for both video layers
```

Every section after the hero shares the same eyebrow/title heading component,
alternates between `--void` and `--void-soft` backgrounds for gentle rhythm
down the page, and reuses the same type scale and hairline-divider language
established in the hero — so the resume content reads as one continuous
cinematic piece rather than a bolted-on CV.


## Design tokens

| Token           | Value      | Role                                   |
|-----------------|------------|-----------------------------------------|
| `--void`        | `#08090c`  | Base background, film black             |
| `--ember`       | `#ff8a3d`  | Warm practical light / accent           |
| `--ember-deep`  | `#d9591a`  | Depth shadows on warm accents           |
| `--signal-blue` | `#4fb3ff`  | Cool monitor glow, secondary accent     |
| `--mist`        | `#ece8e0`  | Primary text, warm-tinted white         |
| `--ash`         | `#8b8d94`  | Secondary text                          |

Typography pairs a display serif (**Fraunces**, for the emotional weight of
the name) with a technical grotesk (**Space Grotesk**, body copy) and a mono
face (**JetBrains Mono**, labels/eyebrows/captions) — the serif carries the
cinematic mood, the mono carries the engineering register.

## Notable implementation details

- **Autoplay policy**: the foreground video starts muted (browsers block
  unmuted autoplay); the "Tap for sound" badge invites the visitor to unmute,
  and auto-hides after ~4s or on first interaction with the mute button.
- **Sticky hero**: `.hero` is `100svh` tall with an inner `position: sticky`
  layer so the section pins while the next section (`#work`) scrolls over it.
- **Three.js layer**: raw `three` (no `@react-three/fiber`), a runtime-
  generated canvas sprite (no external image asset) for the soft glow dots,
  additive blending, per-particle sine-wave drift, pointer-driven camera
  parallax, `ResizeObserver` + visibility-based pause, full `dispose()` of
  geometry/material/texture/renderer on unmount.
- **Scroll indicator** is a 5-bar waveform pulse rather than a generic line —
  a small nod to the Whisper/audio-processing work described in the next
  section, and it doubles as the animated "pulse" the brief asked for.
- **Reduced motion**: `globals.css` collapses animation/transition durations
  under `prefers-reduced-motion: reduce`.

## Swapping in a different video

Replace `public/videos/hero.mp4` and, if needed, update the `videoSrc` prop
passed to `<VideoIntro />` in `app/page.tsx`.
