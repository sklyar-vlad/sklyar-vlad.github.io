# Product

<!-- impeccable:product-schema 1 -->

## Platform
web

## Stack
Implemented static HTML/CSS/JavaScript as the working assumption; optional framework preference was offered and remains unanswered. GitHub Pages is the confirmed deployment target.

## Product Purpose
Personal portfolio for Владислав Скляренко, presented as an interactive console inspired by https://stick.sh/.

## Users
Assumption: recruiters and engineers reviewing the author's projects and experience.

## Capabilities and Constraints
Static hosting; keyboard shell and touch-accessible command shortcuts. No backend or executing arbitrary code. Deployment account access has not been provided.

## Brand Commitments
User explicitly chose a terminal portfolio and supplied stick.sh as a reference. Latest direction: a large centered console rather than fullscreen, fish as the shell experience, and a new palette selected by the agent. Preserve terminal typography and interaction. User supplied a personal photograph and requested a detailed pixel rendering as the avatar. The user identified himself as the central person in the blue hoodie. Isolate only him with transparent background and preserve detailed pixel treatment. Display the portrait immediately together with welcome output, without a reveal animation.

## Evidence on Hand
User-provided GitHub: https://github.com/sklyar-vlad
User-provided CV, read locally: /home/sklyarvlad/Documents/vlad/SklyarenkoVladislavCV.pdf
Use factual CV descriptions. Do not publish the original PDF or phone by default. No invented metrics or clients.

## Hosting and shell boundary
GitHub Pages static deployment; fish-style prompt, syntax feedback and inline history suggestions are implemented in browser JavaScript, not a server process or full fish interpreter.

## Latest interaction requirements
User requested UNIX-style command syntax and errors, case sensitivity and no unsolicited suggestions or instructional hints. Explicit help remains available. Implement quoting, escapes and comments without executing arbitrary code; report unsupported operators explicitly.
