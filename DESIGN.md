---
name: Terminal portfolio
description: Interactive console portfolio for Владислав Скляренко
colors:
  ground: "#141715"
  surface: "#1b1e1c"
  chrome: "#222623"
  ink: "#e0e6de"
  muted: "#a0aaa0"
  accent: "#a6cf91"
  line: "#363e36"
  error: "#f0a698"
  light-ground: "#e7eae2"
  light-surface: "#f5f6ef"
  light-chrome: "#dfe5da"
  light-ink: "#263025"
  light-muted: "#576652"
  light-accent: "#3e6b29"
  light-line: "#b9c5b2"
  light-error: "#a33226"
typography:
  display:
    fontFamily: '"DejaVu Sans Mono", "Liberation Mono", Consolas, monospace'
    fontSize: "clamp(34px, 4.9vw, 56px)"
    fontWeight: 500
    lineHeight: 1.18
    letterSpacing: "-0.04em"
  body:
    fontFamily: '"DejaVu Sans Mono", "Liberation Mono", Consolas, monospace'
    fontSize: "15px"
    lineHeight: 1.75
  response:
    fontSize: "14px"
  command:
    fontSize: "13px"
  detail:
    fontSize: "12px"
  caption:
    fontSize: "10px"
rounded:
  terminal: "12px"
  submit: "3px"
spacing:
  screen: "30px 42px 34px"
  titlebar: "13px 24px"
  statusbar: "8px 24px"
components:
  terminal:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.terminal}"
  command-shortcut:
    textColor: "{colors.accent}"
    padding: "5px 0"
  inline-command:
    textColor: "{colors.accent}"
    padding: "0 2px"
  theme-toggle:
    textColor: "{colors.muted}"
    padding: "2px 0"
  submit-command:
    backgroundColor: "{colors.chrome}"
    textColor: "{colors.accent}"
    rounded: "{rounded.submit}"
    padding: "5px 13px"
  submit-command-hover:
    backgroundColor: "{colors.line}"
  command-input:
    textColor: "{colors.ink}"
    padding: "10px 0"
---

# Design System: Terminal portfolio

## Overview

**Creative North Star: "Interactive console portfolio"**

A terminal window is the portfolio itself. The user chose an interactive console inspired by stick.sh; system monospace typography, shell prompts and text commands organize the experience. The named reference expresses the user’s direction; this documentation describes the local implementation, not a verified reproduction of that website.

Muted green surfaces and a restrained green accent keep the text prominent. Dark and light themes share the same geometry. Content appears immediately, while command shortcuts and a keyboard input reveal further sections.

**Key Characteristics:**
- One continuous console with titlebar, text surface and statusbar.
- System monospace fonts with Cyrillic coverage and no font downloads.
- Keyboard commands and touch-accessible shortcuts expose the same content.

Source review covered `PRODUCT.md`, the previous `DESIGN.md`, `index.html`, `style.css`, `app.js` and `profile.js`. The previous brief is refreshed here against implemented CSS; no framework, mockup workflow or approval preference is inferred from unanswered questions. Syntax and DOM-harness checks passed during implementation. Browser launch and a local HTTP server were blocked by denied socket syscalls, so visual rendering, responsive appearance and browser interaction have not been verified. GitHub access failed because of DNS and SSH configuration; publication is not verified.

## Colors

The normative frontmatter mirrors the CSS custom properties. Unprefixed colors are the default dark theme; `light-` counterparts replace the same roles in the light theme.

- **Primary:** `accent` marks prompts, commands, headings, status dots, selection and keyboard focus. The light theme uses a deeper green for the same roles.
- **Neutral:** `ground` surrounds the console; `surface` is its reading area; `chrome` frames titlebar and statusbar. `ink` is primary text, `muted` carries metadata, and `line` defines borders and subdued underlines.
- **Feedback:** `error` distinguishes unrecognized commands.

## Typography

All text uses the system monospace stack in the frontmatter. The display role introduces the name; body text carries the introduction; response, command, detail and caption sizes distinguish output from shell chrome. Response paragraphs have a maximum width of 75ch. Response headings use 16px and project titles use 14px, both at weight 500.

At widths up to 720px, the name is 42px; up to 420px it is 35px. At the smaller breakpoint, response text becomes 13px, input and command labels 12px, and the introduction 13px.

## Layout

A centered workspace has a maximum width of 1104px and desktop padding of 32px 36px 20px. The console screen has a desktop minimum height of 620px. Command shortcuts wrap in a horizontal row, with English commands above smaller Russian explanations. Responses append vertically to the log; there is no card grid.

At 720px and below, workspace padding becomes 22px 16px 16px, screen padding becomes 25px 24px 28px, minimum screen height is removed, and the footer stacks. At 420px and below, workspace padding becomes 18px 10px 14px and screen padding becomes 24px 18px. Above 1500px the workspace top padding increases to 58px. The prompt input shrinks within its flex row; help output uses a two-column definition list.

## Elevation & Depth

The console is flat: layered background tones and a single-pixel border provide separation, with no ambient shadows. The input row gains a two-pixel accent underline via `box-shadow` on focus. Other interactive elements have a two-pixel accent outline with a five-pixel offset.

## Shapes

The console has softly curved corners using the terminal radius. The submit button uses the smaller submit radius. Command shortcuts, inline commands and the input remain borderless. Status indicators are six-pixel circles. The console clips its titlebar and statusbar to the outer contour.

## Components

- **Console:** shared surface with a muted titlebar, shell identity, theme toggle and compact statusbar. Color roles change together when switching themes.
- **Command navigation:** text buttons with a minimum height of 48px. A muted underline becomes accent-colored on hover; smaller muted translations remain subordinate.
- **Inline command:** underlined accent text embedded in help and introductory prose. Shared keyboard focus treatment applies.
- **Theme toggle:** compact muted text aligned to the titlebar’s right; hover changes it to primary ink. The button announces the theme it will activate, and selection persists locally.
- **Prompt input:** transparent, borderless text field with an accent caret and full-row focus underline. The submit button uses chrome at rest and line color on hover. The form is revealed when JavaScript initializes.
- **Response log:** a polite live region with text-rendered content, accent section headings, muted metadata and error-colored unknown commands. Arrival lasts 180ms with `ease-out`, translating four pixels upward while opacity goes from 0.7 to 1. Reduced-motion preference removes the animation and uses instant response scrolling. History lasts for the current page visit; output is capped at 50 entries.

## Do's and Don'ts

- Do preserve the console structure and both theme palettes.
- Do keep readable content available before interaction and in the no-JavaScript fallback.
- Do retain visible keyboard focus and reduced-motion behavior.
- Don’t replace factual portfolio text with invented metrics or availability.
- Don’t make touch navigation depend on typing commands.
- Don’t describe the simulated shell as executing arbitrary code.
