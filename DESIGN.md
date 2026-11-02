---
name: Mostafa Abdel Fattah Portfolio
description: An editorial portfolio for senior mobile engineering work.
colors:
  obsidian: '#0b0a09'
  raised-charcoal: '#11100e'
  ivory: '#fcfbf9'
  soft-paper: '#f7f4ee'
  ivory-border: '#efeae0'
  warm-gold: '#deb868'
  deep-gold: '#7a5a1c'
typography:
  display:
    fontFamily: 'Playfair Display, Georgia, Times New Roman, serif'
    fontSize: 'clamp(3rem, 5.2vw, 5.25rem)'
    fontWeight: 600
    lineHeight: 0.99
    letterSpacing: '-0.035em'
  body:
    fontFamily: 'Inter Variable, system-ui, -apple-system, Segoe UI, Roboto, sans-serif'
    fontSize: '1rem'
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: 'Inter Variable, system-ui, -apple-system, Segoe UI, Roboto, sans-serif'
    fontSize: '0.75rem'
    fontWeight: 600
  arabic:
    fontFamily: 'Noto Naskh Arabic, Geeza Pro, Tahoma, serif'
rounded:
  sm: '6px'
  md: '10px'
  lg: '16px'
  xl: '24px'
  pill: '999px'
spacing:
  sm: '0.25rem'
  md: '0.5rem'
  lg: '1rem'
  xl: '1.5rem'
  2xl: '2rem'
  3xl: '3rem'
  4xl: '4rem'
---

# Design System: Mostafa Abdel Fattah Portfolio

## Overview

**Creative North Star: "Obsidian & Ivory Portfolio"**

The page is editorial, warm, restrained, and quietly confident. Real engineering evidence leads: the engineer's role, grounded career metrics, and the project catalogue are easy to find, while the interface stays out of their way. Playfair Display gives the headlines character; Inter keeps navigation, detail, and long-form project content direct.

Obsidian and ivory provide the two surfaces, with brushed gold as the accent. Light is the default presentation; the theme control switches to dark and remembers an explicit choice. The workspace photo is editorial context only. It is not a portrait of Mostafa or evidence of any client project. The user's reference images guide the layout and imagery; project mockups that could be mistaken for shipped work are excluded.

**Key Characteristics:**

- Obsidian and soft ivory surfaces with warm gold accents.
- Editorial serif headlines paired with clear sans-serif detail.
- Real project descriptions, links, metrics, and Arabic content remain the proof.
- The light theme is the default; dark mode is a persistent user choice.

## Colors

Warm brushed gold sits against near-black obsidian and soft ivory. The light theme uses a deeper gold for readable text; the dark theme uses the brighter metallic gold.

### Primary

- **Warm brushed gold** (#deb868): Dark-theme emphasis, decorative orbital lines, and the theme control.
- **Deep gold** (#7a5a1c): Light-theme accent text and focus treatment for contrast on ivory.

### Neutral

- **Obsidian** (#0b0a09): Dark-theme page surface and primary text on light surfaces.
- **Raised charcoal** (#11100e): Dark-theme raised surfaces.
- **Soft ivory** (#fcfbf9): Default page surface.
- **Warm paper** (#f7f4ee): Softly sunken light-theme surface and light-theme text.
- **Ivory border** (#efeae0): Light-theme dividers and outlines.
- **Warm gray** (#b8b0a2): Muted dark-theme text.
- **Stone** (#5e584f): Muted light-theme text.

### Named Rules

**The Theme-Contrast Rule.** Use bright gold on obsidian and deep gold on ivory; do not carry the dark-theme accent unchanged into light-theme text.

## Typography

**Display Font:** Playfair Display (with Georgia, Times New Roman, serif fallbacks)  
**Body Font:** Inter Variable (with system sans-serif fallbacks)  
**Label Font:** Inter Variable  
**Arabic Font:** Noto Naskh Arabic (with Geeza Pro, Tahoma, serif fallbacks)

**Character:** The display face brings an editorial voice to headlines without making project details ornate. Inter keeps navigation, metadata, technical descriptions, and calls to action crisp.

### Hierarchy

- **Display** (600, clamp(3rem, 5.2vw, 5.25rem), 0.99 line-height): The hero statement.
- **Headline** (600, clamp(2rem, 3.6vw, 3.25rem), tight line-height): Section headings.
- **Title** (600, clamp(1.25rem, 2vw, 1.6rem), tight line-height): Project names and card headings.
- **Body** (400, 1rem, 1.6 line-height): General explanatory copy, with a 70ch default measure.
- **Label** (600, 0.75rem, 0.16em tracking, uppercase only for the availability status): Navigation metadata and compact labels.
- **Arabic** (400, inherited size and line-height): Arabic project names and content, with explicit language and RTL direction.

### Named Rules

**The Evidence-First Rule.** Use display typography to establish hierarchy; keep the supporting project facts in the readable sans-serif voice.

## Layout

The page sits in a centered, max-78rem frame. A compact sticky header precedes a two-column hero; four career facts close that section, and the project catalogue follows without a decorative image gallery. Featured work uses a two-column grid on desktop, with later catalogue and skill groups arranged in two and three columns respectively. At 48rem, the hero and project cards become single-column, the navigation scrolls horizontally, and the four facts become a two-column grid. At 26rem, calls to action and compact details tighten without hiding content.

Spacing follows a 4px base grid. Section spacing expands with viewport size; related metadata stays close to its heading, while the next section receives a larger separation.

## Elevation & Depth

Depth is layered and restrained. Most grouping comes from tonal surface changes and fine borders; the page frame alone uses the shared soft shadow. Project cards are flat at rest and respond to hover with an accent border rather than a second shadow.

### Shadow Vocabulary

- **Dark page frame:** `0 1px 2px rgb(0 0 0 / 40%), 0 12px 32px -16px rgb(0 0 0 / 70%)`.
- **Light page frame:** `0 1px 2px rgb(11 10 9 / 4%), 0 12px 28px -14px rgb(11 10 9 / 18%)`.

## Shapes

The system uses 6px, 10px, 16px, and 24px radii, with pill shapes reserved for compact skill tags. Project surfaces use a 16px radius and a one-pixel theme-aware border. The hero's orbital ellipses are crisp geometry, not a mask around the photograph.

## Components

### Buttons

- **Character:** Refined and confident; actions stay readable rather than ornamental.
- **Shape:** 10px radius, 2.9rem minimum height, and 0.7rem by 1.2rem padding.
- **Primary:** Gold gradient with the dark on-accent text color.
- **Secondary:** Transparent surface, readable text, and a stronger theme-aware border.
- **Hover / Focus:** A small upward shift and accent-border change on hover; a visible 2px focus ring with offset for keyboard users.

### Cards / Containers

- **Corner Style:** 16px for featured project cards.
- **Background:** Raised surface token for the current theme.
- **Border:** One-pixel theme-aware border; accent border on hover.
- **Internal Padding:** Responsive, from 1.25rem to 2rem.

### Navigation

The header stays sticky with a translucent surface and readable, unadorned links. Hover changes the link to the current theme's accent. On narrow screens the link row scrolls horizontally instead of wrapping into multiple rows.

### Chips

Skill tags use a pill radius, a raised surface, muted text, and a fine border. Keep them compact and informational; do not style them as controls unless they become interactive.

### Theme Control

The circular 2.75rem button names its next action for assistive technology, updates its icon and `aria-pressed` state, and persists the selected theme. A fresh visit starts in light mode.

### Imagery

Use authentic project screenshots only when they are available and approved. The local Unsplash workspace photo is a general editorial image; never associate it with a named project or present it as Mostafa's portrait.

### Named Rules

**The Real-Work Rule.** Project imagery must be genuine product evidence; generic or generated imagery must never imply that it is a shipped client interface.

## Do's and Don'ts

### Do:

- **Do** keep the verified workspace photo as editorial context, not project evidence.
- **Do** preserve project facts, destinations, career metrics, and Arabic right-to-left content.
- **Do** start in light mode and persist an explicit theme selection.
- **Do** use the theme-specific gold token for readable accents.

### Don't:

- **Don't** present generated concept mockups as shipped applications.
- **Don't** use stock photography as proof of Mostafa's identity or client work.
- **Don't** replace the user's approved reference hierarchy with unrelated visual motifs.
