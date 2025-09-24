# InternMitra (ab-ni-hua-to-ni-kruga)

InternMitra is an AI-powered internship recommendation platform built with **TypeScript + React**, designed to help students and freshers find internships that align with their skills and interests. Featuring a clean, responsive UI, it delivers personalized internship suggestions with smart matching logic.

##  Key Features

- **Smart Internship Matching** — AI-driven recommendations based on your profile, preferences, and skills.
- **TypeScript + React** — Modern, scalable, and type-safe frontend development.
- **Responsive Design** — Sleek UI that adapts seamlessly across devices.
- **Full-stack Structure** — Organized codebase includes `client`, `server`, `shared`, and serverless functions (e.g., via Netlify).
- **Deployable Setup** — Ready for smooth deployment (supports Netlify, Docker, etc.) with configured build tooling (Vite, Tailwind CSS).

##  Tech Stack

- **Frontend**: TypeScript, React, Tailwind CSS, Vite
- **Server**: Node.js (server folder) & serverless functions (`netlify/functions`)
- **Shared**: Reusable logic/components in the `shared` folder
- **Configuration**: Vite (frontend & server), Tailwind CSS, Netlify config (netlify.toml), Docker support (`.dockerignore`)
- **Package Management**: Supports both `npm` (package-lock.json) and `pnpm` (pnpm-lock.yaml)

##  Directory Structure


```
internmitra_backup
├─ .builder
│  └─ rules
│     ├─ deploy-app.mdc
│     └─ organize-ui.mdc
├─ .dockerignore
├─ .env
├─ .npmrc
├─ .pnpm-approvals
├─ .prettierrc
├─ AGENTS.md
├─ client
│  ├─ App.tsx
│  ├─ components
│  │  ├─ AnimatedSection.tsx
│  │  ├─ AnimatedText.tsx
│  │  ├─ Dashboard.tsx
│  │  ├─ ImgWithFallback.tsx
│  │  ├─ LoginModal.tsx
│  │  ├─ PageTransition.tsx
│  │  ├─ ProgressTracker.tsx
│  │  └─ ui
│  │     ├─ accordion.tsx
│  │     ├─ alert-dialog.tsx
│  │     ├─ alert.tsx
│  │     ├─ aspect-ratio.tsx
│  │     ├─ avatar.tsx
│  │     ├─ badge.tsx
│  │     ├─ breadcrumb.tsx
│  │     ├─ button.tsx
│  │     ├─ calendar.tsx
│  │     ├─ card.tsx
│  │     ├─ carousel.tsx
│  │     ├─ chart.tsx
│  │     ├─ checkbox.tsx
│  │     ├─ collapsible.tsx
│  │     ├─ command.tsx
│  │     ├─ context-menu.tsx
│  │     ├─ dialog.tsx
│  │     ├─ drawer.tsx
│  │     ├─ dropdown-menu.tsx
│  │     ├─ form.tsx
│  │     ├─ hover-card.tsx
│  │     ├─ input-otp.tsx
│  │     ├─ input.tsx
│  │     ├─ label.tsx
│  │     ├─ menubar.tsx
│  │     ├─ navigation-menu.tsx
│  │     ├─ pagination.tsx
│  │     ├─ popover.tsx
│  │     ├─ progress.tsx
│  │     ├─ radio-group.tsx
│  │     ├─ resizable.tsx
│  │     ├─ scroll-area.tsx
│  │     ├─ select.tsx
│  │     ├─ separator.tsx
│  │     ├─ sheet.tsx
│  │     ├─ sidebar.tsx
│  │     ├─ skeleton.tsx
│  │     ├─ slider.tsx
│  │     ├─ sonner.tsx
│  │     ├─ switch.tsx
│  │     ├─ table.tsx
│  │     ├─ tabs.tsx
│  │     ├─ textarea.tsx
│  │     ├─ toast.tsx
│  │     ├─ toaster.tsx
│  │     ├─ toggle-group.tsx
│  │     ├─ toggle.tsx
│  │     ├─ tooltip.tsx
│  │     └─ use-toast.ts
│  ├─ context
│  │  └─ i18n.tsx
│  ├─ global.css
│  ├─ hooks
│  │  ├─ use-mobile.tsx
│  │  └─ use-toast.ts
│  ├─ lib
│  │  ├─ utils.spec.ts
│  │  └─ utils.ts
│  ├─ main.tsx
│  ├─ pages
│  │  ├─ Applied.tsx
│  │  ├─ AppliedInternships.tsx
│  │  ├─ AppRouter.tsx
│  │  ├─ Chat.tsx
│  │  ├─ Dashboard.tsx
│  │  ├─ Index.tsx
│  │  ├─ Login.tsx
│  │  ├─ MyProfile.tsx
│  │  ├─ NotFound.tsx
│  │  ├─ Recommended.tsx
│  │  ├─ RecommendedInternships.tsx
│  │  ├─ ResumeBuilder.tsx
│  │  ├─ Saved.tsx
│  │  └─ SavedInternships.tsx
│  ├─ types
│  │  └─ global.d.ts
│  └─ vite-env.d.ts
├─ components.json
├─ index.html
├─ netlify
│  └─ functions
│     └─ api.ts
├─ netlify.toml
├─ package-lock.json
├─ package.json
├─ pnpm-lock.yaml
├─ postcss.config.js
├─ public
│  ├─ ai-matches.svg
│  ├─ create-profile.svg
│  ├─ favicon.ico
│  ├─ images
│  ├─ placeholder.svg
│  ├─ review-apply.svg
│  ├─ robots.txt
│  └─ test-route.html
├─ README.md
├─ server
│  ├─ index.ts
│  ├─ node-build.ts
│  └─ routes
│     ├─ demo.ts
│     └─ spa-fallback.ts
├─ shared
│  └─ api.ts
├─ tailwind.config.ts
├─ tsconfig.json
├─ vite.config.server.ts
└─ vite.config.ts

```
```
internmitra_backup
├─ .builder
│  └─ rules
│     ├─ deploy-app.mdc
│     └─ organize-ui.mdc
├─ .dockerignore
├─ .env
├─ .npmrc
├─ .pnpm-approvals
├─ .prettierrc
├─ AGENTS.md
├─ client
│  ├─ App.tsx
│  ├─ components
│  │  ├─ AnimatedSection.tsx
│  │  ├─ AnimatedText.tsx
│  │  ├─ Dashboard.tsx
│  │  ├─ ImgWithFallback.tsx
│  │  ├─ LoginModal.tsx
│  │  ├─ PageTransition.tsx
│  │  ├─ ProgressTracker.tsx
│  │  ├─ ProtectedRoute.tsx
│  │  └─ ui
│  │     ├─ accordion.tsx
│  │     ├─ alert-dialog.tsx
│  │     ├─ alert.tsx
│  │     ├─ aspect-ratio.tsx
│  │     ├─ avatar.tsx
│  │     ├─ badge.tsx
│  │     ├─ breadcrumb.tsx
│  │     ├─ button.tsx
│  │     ├─ calendar.tsx
│  │     ├─ card.tsx
│  │     ├─ carousel.tsx
│  │     ├─ chart.tsx
│  │     ├─ checkbox.tsx
│  │     ├─ collapsible.tsx
│  │     ├─ command.tsx
│  │     ├─ context-menu.tsx
│  │     ├─ dialog.tsx
│  │     ├─ drawer.tsx
│  │     ├─ dropdown-menu.tsx
│  │     ├─ form.tsx
│  │     ├─ hover-card.tsx
│  │     ├─ input-otp.tsx
│  │     ├─ input.tsx
│  │     ├─ label.tsx
│  │     ├─ menubar.tsx
│  │     ├─ navigation-menu.tsx
│  │     ├─ pagination.tsx
│  │     ├─ popover.tsx
│  │     ├─ progress.tsx
│  │     ├─ radio-group.tsx
│  │     ├─ resizable.tsx
│  │     ├─ scroll-area.tsx
│  │     ├─ select.tsx
│  │     ├─ separator.tsx
│  │     ├─ sheet.tsx
│  │     ├─ sidebar.tsx
│  │     ├─ skeleton.tsx
│  │     ├─ slider.tsx
│  │     ├─ sonner.tsx
│  │     ├─ switch.tsx
│  │     ├─ table.tsx
│  │     ├─ tabs.tsx
│  │     ├─ textarea.tsx
│  │     ├─ toast.tsx
│  │     ├─ toaster.tsx
│  │     ├─ toggle-group.tsx
│  │     ├─ toggle.tsx
│  │     ├─ tooltip.tsx
│  │     └─ use-toast.ts
│  ├─ context
│  │  └─ i18n.tsx
│  ├─ global.css
│  ├─ hooks
│  │  ├─ use-mobile.tsx
│  │  └─ use-toast.ts
│  ├─ lib
│  │  ├─ utils.spec.ts
│  │  └─ utils.ts
│  ├─ main.tsx
│  ├─ pages
│  │  ├─ Applied.tsx
│  │  ├─ AppliedInternships.tsx
│  │  ├─ AppRouter.tsx
│  │  ├─ Chat.tsx
│  │  ├─ Dashboard.tsx
│  │  ├─ Index.tsx
│  │  ├─ Login.tsx
│  │  ├─ MyProfile.tsx
│  │  ├─ NotFound.tsx
│  │  ├─ Recommended.tsx
│  │  ├─ RecommendedInternships.tsx
│  │  ├─ ResumeBuilder.tsx
│  │  ├─ Saved.tsx
│  │  ├─ SavedInternships.tsx
│  │  └─ Signup.tsx
│  ├─ types
│  │  └─ global.d.ts
│  └─ vite-env.d.ts
├─ components.json
├─ index.html
├─ netlify
│  └─ functions
│     └─ api.ts
├─ netlify.toml
├─ package-lock.json
├─ package.json
├─ pnpm-lock.yaml
├─ postcss.config.js
├─ public
│  ├─ favicon.ico
│  ├─ images
│  ├─ placeholder.svg
│  ├─ robots.txt
│  └─ test-route.html
├─ README.md
├─ server
│  ├─ index.ts
│  ├─ node-build.ts
│  └─ routes
│     ├─ demo.ts
│     └─ spa-fallback.ts
├─ shared
│  └─ api.ts
├─ tailwind.config.ts
├─ tsconfig.json
├─ vite.config.server.ts
└─ vite.config.ts

```