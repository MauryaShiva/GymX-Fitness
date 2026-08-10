# Request for Plan Review: GymX PWA Mobile-First Transformation

## Project Analysis
GymX is a React-based fitness application using Vite, Tailwind CSS v4, Framer Motion, and local JSON data. Currently, it has a desktop-first design with a standard navbar, search bar, and exercise cards.
The goal is to transform this into a premium mobile-first Progressive Web Application (PWA) that feels like a native app on mobile devices while maintaining the existing desktop experience and preserving all core functionalities, including search, routing, and local data.

## Files To Be Modified
1. `index.html`: Update meta tags for PWA and mobile safe areas.
2. `vite.config.js`: Add and configure `vite-plugin-pwa` for manifest, service worker, and caching strategies.
3. `src/App.css`: Add custom theme variables and mobile safe area utilities required by Tailwind v4.
4. `src/App.jsx`: Integrate PWA install prompt logic, `AnimatePresence` for page transitions, adjust main container for bottom nav spacing on mobile, and handle PWA setup.
5. `src/components/Navbar.jsx`: Refactor for mobile (sticky, glassmorphism, search toggle) while preserving desktop layout.
6. `src/components/SearchExercises.jsx`: Convert into a full-screen mobile overlay triggered by an event/route when on mobile, while keeping it inline for desktop.
7. `src/components/ExerciseCard.jsx`: Upgrade design (shadows, spacing, tap animations via Framer Motion) for a premium feel.
8. `src/pages/Home.jsx`: Ensure it handles the 'open-search' event for mobile search overlay and wraps content in motion components for page transitions.
9. `src/pages/ExerciseDetails.jsx`: Upgrade layout to app-style (hero GIF, sticky buttons, improved readability).
10. `package.json`: Install `vite-plugin-pwa`.

## Files To Be Created
1. `src/components/BottomNav.jsx`: Mobile-only bottom navigation bar fixed at the bottom with active states.
2. `public/manifest.webmanifest`: (Generated via vite-plugin-pwa, but icons need to be configured/handled, we will configure vite-plugin-pwa to generate manifest).
3. `netlify.toml`: Configuration for SPA routing on Netlify.

## Reason For Each Change
- **Mobile UX Improvements:** App-like layout (BottomNav, Sticky Header, Safe Area Support, Page Transitions), App-style details (Hero GIFs, sticky buttons), Full-screen mobile search overlay, PWA installation for native feel.
- **Desktop UX Improvements:** Preserve existing navbar, ensure layout isn't constrained by mobile views, maintain multi-column layouts.
- **Preservation:** No changes to Fuse.js logic, JSON data, or YouTube integration. Modifications wrap existing components to add responsive/animated styles.

## Proposed Plan

1. **Install Dependencies & Configure Environment**
   - Install `vite-plugin-pwa` and any missing icons (if not using lucide-react everywhere).
   - Create `netlify.toml` for SPA routing.
   - Update `index.html` with viewport meta tags (viewport-fit=cover, theme-color).
   - Configure `vite.config.js` to include the PWA plugin with manifest and large file caching.
2. **Update Core Styling & Layout (App.css & App.jsx)**
   - Add Tailwind @theme variables (colors) and @utility classes (safe area padding) to `App.css`.
   - Update `App.jsx` to handle PWA install prompt (`beforeinstallprompt`), wrap `<Routes>` in `<AnimatePresence location={location}>` for page transitions, and structure layout to accommodate `Navbar` and the new `BottomNav`.
3. **Implement Mobile Navigation (BottomNav & Navbar)**
   - Create `src/components/BottomNav.jsx` with mobile-only fixed bottom positioning, blur background, and active tab highlighting.
   - Refactor `src/components/Navbar.jsx` to be sticky, glassmorphism styled, and include a search toggle button for mobile while maintaining desktop links. It should stay visible on mobile but act as a header.
4. **Implement Mobile Search Overlay (SearchExercises.jsx & Home.jsx)**
   - Refactor `SearchExercises.jsx` to render as a full-screen overlay on mobile when triggered (via router query `?search=true` or custom event) while remaining inline on desktop.
   - Update `Home.jsx` to manage the event listener that toggles the mobile search overlay state.
5. **Upgrade UI Components (ExerciseCard & ExerciseDetails)**
   - Refactor `src/components/ExerciseCard.jsx` to use Framer Motion for tap/hover animations and improve the visual design.
   - Refactor `src/pages/ExerciseDetails.jsx` to create an app-style detail screen with a large hero GIF section and sticky action buttons, ensuring all original data fields are preserved.
6. **Verify Frontend Changes**
   - Build and start the preview server. Write and run a Playwright script to verify the mobile and desktop views, animations, and PWA manifest generation.
7. **Complete pre commit steps**
   - Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.
8. **Submit Changes**
   - Commit and push changes to the repository.

Please review this plan.
