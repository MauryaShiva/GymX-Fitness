# Project Analysis
The GymX project is a React fitness application currently styled for web browsers. It uses Tailwind CSS v4, Framer Motion, and local JSON databases with Fuse.js for search. We need to convert it into a mobile-first Progressive Web Application (PWA) with a native app feel on mobile, while keeping the desktop version intact.

We will focus on implementing:
- A new `BottomNav.jsx` for mobile (Home, Exercises, Workouts).
- Responsive adjustments for a sticky header.
- Full-screen search overlay on mobile.
- Updated `ExerciseCard.jsx` to look premium.
- Safe Area adjustments and better padding (`pb-safe`).
- PWA configurations via `vite-plugin-pwa`.
- Page transitions using `AnimatePresence`.

# Files To Be Modified
1. `src/App.jsx` - Add PWA install prompt, layout adjustments, page transitions with `AnimatePresence`, add `BottomNav`.
2. `src/App.css` - Add safe area utility classes and custom color variables for the design system.
3. `vite.config.js` - Configure `vite-plugin-pwa` for manifest and offline caching.
4. `index.html` - Add PWA meta tags and update title/icons.
5. `src/components/Navbar.jsx` - Make it hide on scroll on mobile or stick, hide completely when `BottomNav` is shown on mobile.
6. `src/components/ExerciseCard.jsx` - Upgrade UI to premium design (shadows, layout, hover/tap effects).
7. `src/pages/ExerciseDetails.jsx` - Update to mobile-first layout (hero image, sticky action button).
8. `src/components/SearchExercises.jsx` - Add a full-screen mobile search overlay or styling.

# Files To Be Created
1. `src/components/BottomNav.jsx` - Mobile bottom navigation tab bar.

# Reason For Each Change
- **App/CSS/Config modifications:** To support PWA requirements and safe area display for notched devices.
- **Navbar/BottomNav:** To provide native app navigation behavior (BottomNav on mobile, Navbar on desktop).
- **ExerciseCard/ExerciseDetails:** To create a premium, native app style visual hierarchy and interactions.
- **SearchExercises:** Full screen search improves mobile usability compared to small input fields.

# Mobile UX Improvements
- App-shell design with `BottomNav` and PWA installation prompt.
- Full-screen search with smooth overlay.
- Large, easy-to-tap cards and buttons.
- Safe-area spacing.

# Desktop UX Improvements
- Keep multi-column layouts and sticky Top Nav.
- Improve margins and layout containment to avoid massive cards.
