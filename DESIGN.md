---
name: Fish-style terminal portfolio
description: Centered interactive portfolio console for Владислав Скляренко
colors:
  ground: "#0a101b"
  surface: "#121a27"
  chrome: "#1a2535"
  ink: "#d6e3ef"
  muted: "#98abc2"
  accent: "#edbf78"
  cyan: "#83c9df"
  valid: "#a9d2c3"
  error: "#f39393"
  light-ground: "#dae3ed"
  light-surface: "#f3f7fb"
  light-chrome: "#e5edf5"
  light-ink: "#24374c"
  light-muted: "#536d87"
  light-accent: "#855711"
  light-cyan: "#176783"
  light-valid: "#316656"
  light-error: "#ad3030"
typography:
  body:
    fontFamily: '"DejaVu Sans Mono", "Liberation Mono", Consolas, monospace'
    fontSize: "14px"
    lineHeight: 1.45
  titlebar:
    fontSize: "12px"
  ascii-name:
    fontSize: "18px"
    lineHeight: 1.1
rounded:
  terminal: "14px"
  terminal-mobile: "10px"
spacing:
  body: "40px"
  terminal-body: "28px 32px 32px"
  titlebar: "14px 20px"
components:
  terminal:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.terminal}"
    width: "min(1240px, 100%)"
    height: "min(820px, calc(100dvh - 80px))"
  titlebar:
    backgroundColor: "{colors.chrome}"
    textColor: "{colors.muted}"
    padding: "{spacing.titlebar}"
  inline-command:
    textColor: "{colors.accent}"
    padding: "0"
  command-input:
    textColor: "{colors.ink}"
    padding: "0"
  text-link:
    textColor: "{colors.cyan}"
  submit-command:
    textColor: "{colors.accent}"
    padding: "0 7px"
---

# Design System: Fish-style terminal portfolio

## Overview

**Creative North Star: "Fish-style portfolio console"**

A large centered console presents a fish-style portfolio on a navy canvas. Ice text, amber commands and a cyan path distinguish reading content from shell controls. The titlebar anchors the window; its body scrolls independently. Only the welcome response appears at startup.

The welcome pairs an ASCII name with a detailed generated pixel image at `assets/avatar-portrait-v3.png`. The image opens at full size and replaces the former ASCII hood portrait. Fish behavior is emulated in browser JavaScript for static GitHub Pages hosting; it is not a server shell. No framework or workflow preference is inferred.

**Key Characteristics:**
- Centered console with titlebar and internally scrolling output.
- Fish-style prompt, syntax colors and UNIX-style command parsing without automatic hints.
- Pixel image beside welcome text; below it on mobile.

Source review covers current `index.html`, `style.css` and `app.js`. This replaces all earlier framed-green and fullscreen briefs. Source review found no serious issues; JavaScript syntax and the DOM harness passed for the new behavior. Browser rendering remains unverified because browser and local server socket operations are unavailable. Publication is unverified after GitHub DNS and SSH configuration failures.

## Colors

Frontmatter mirrors the nine CSS roles in dark and light themes (`light-` prefix). `ground` is the canvas, `surface` the reading body and `chrome` the titlebar. `ink` carries content; `muted` carries metadata. Amber `accent` marks commands, headings, caret and prompt sign. `cyan` marks path, links, selection and focus. `valid` marks recognized commands and user/host; `error` marks unknown commands.

## Typography

Use the system monospace stack throughout. Reading text is 14px with 1.45 leading, becoming 16px at 1800px, 13px at 720px and 12px at 360px. At 1100px welcome paragraphs are 13px. Response headings retain body size and normal weight; paragraphs cap at 90ch. The titlebar is 12px, with an 11px owner label.

The ASCII name preserves whitespace and uses 18px with 1.1 leading for glyph geometry. It becomes 21px at 1800px, 16px at 1100px and 13px at 360px. This compact leading is artwork-specific. The former ASCII portrait is absent from markup; remaining portrait CSS is unused.

## Layout

The body centers the console with 40px padding. Console width and height follow the frontmatter, with a 400px minimum height. Its flex layout keeps the titlebar fixed above an independently scrolling body with stable scrollbar gutter. Entries have 18px bottom spacing. The welcome uses a flexible text column and auto-width image column, a 32px gap and 450px minimum height. The image is 300px wide; help uses a 14ch command column plus descriptions.

At 1800px welcome minimum height becomes 510px and image width 350px. At 1100px outer padding becomes 24px, console height is viewport minus 48px, body padding is 24px, welcome gap is 24px and image width is 240px. At 720px outer padding is 12px, height is viewport minus 24px, minimum height is 280px, body padding is 20px 16px and corners use the mobile radius. Welcome stacks with a 190px image below the text; owner label hides. The prompt label wraps above its editor and submit button. At 360px body padding is 16px 12px.

## Elevation & Depth

Tonal chrome and surface sit above the canvas with `0 28px 80px #00000066` shadow. Buttons and links use a two-pixel cyan keyboard-focus outline with three-pixel offset. Keyboard input focus underlines its label in cyan. The transparent pixel portrait appears immediately with welcome output, without reveal animation. The asset is preloaded and requests synchronous decoding. New commands scroll the console body to its bottom without an entrance animation.

## Shapes

The console has rounded desktop/mobile corners from the frontmatter and clips its contents. Three nine-pixel titlebar dots use muted, amber and cyan fills. Text buttons and input remain transparent and borderless with square input corners. The pixel image preserves its aspect ratio with pixelated rendering.

## Components

- **Titlebar:** dots, `fish — ~/portfolio` identity and right-aligned owner; owner hides on mobile.
- **Welcome image:** `assets/avatar-portrait-v3.png` linked to its full-size asset in a new tab, with descriptive alt text. It isolates the author in a dark jacket with a crossbody bag on a transparent background, with no other people or scenery.
- **Prompt editor:** `visitor@sklyarvlad ~/portfolio>` with an amber caret. Recognized input turns valid green; unknown input turns error red. No ghost suggestions, acceptance bindings, completion menus or instructional hints. Tab/Ctrl+I silently completes a unique match; arrows navigate history. Names are case-sensitive; words support quotes, escapes and comments. Unknown commands use `fish: Unknown command: name`.
- **Command actions and links:** zero-padding amber command buttons underline on hover; cyan dashed links turn amber on hover. The mobile submit target is at least 28 × 32px.
- **Output:** polite live log capped at 50 entries. Only `welcome` runs at boot; `help` is available only when explicitly invoked. History lasts for the page visit; theme selection persists locally. No-JavaScript portfolio text remains available.

## Do's and Don'ts

- Do preserve the current navy, ice and amber roles in both themes.
- Do keep the console free of unsolicited suggestions and instructions.
- Do retain accessible image text, keyboard focus and reduced-motion support.
- Don’t restore the previous fullscreen layout or ASCII hood portrait.
- Don’t apply ASCII name leading to reading text.
- Don’t describe the emulated shell as executing arbitrary server commands.

## Avatar fidelity and immediate output
`assets/avatar-portrait-v3.png` is a fresh extraction from the original user photograph, not from earlier stylized generations. Only the author in a dark jacket with a crossbody bag remains, with alpha transparency. The browser draws the loaded image at 224 logical pixels wide on canvas, with CSS pixelated scaling; the image remains a fallback when canvas is unavailable. No reveal or entrance animation. Cached images draw synchronously; first load uses the preloaded image. The linked full-resolution asset is the unpixelated cutout.

## Current wordmark and portrait source
The user requested `sklyarvlad` rather than `Sklyar`, with solid lettering. The seven-row wordmark uses filled block glyphs, accessible label sklyarvlad, responsive font sizes and no outline strokes. On-screen host and titlebar owner also read sklyarvlad; actual GitHub URLs retain sklyar-vlad. The current cutout is based on IMG_20240908_103314_763.jpg (front-facing dark-jacket portrait), 1024×1536 PNG with alpha; browser pixelation and immediate command output remain unchanged.
