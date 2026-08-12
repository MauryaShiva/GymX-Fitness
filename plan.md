1. **PWA Setup and vite.config.js Update**
   - Install `vite-plugin-pwa`.
   - Update `vite.config.js` to include the PWA plugin with manifest details (name, short_name, icons, theme_color, background_color).
   - Configure workbox options to allow caching of larger media assets (`maximumFileSizeToCacheInBytes`).
   - Add Apple touch icon and meta tags for PWA to `index.html`.

2. **Tailwind CSS Configuration and Global Styles**
   - Update `src/App.css` to define `@theme` variables for dark theme aesthetic (`--color-background`, `--color-surface`, `--color-primary`, `--color-text-primary`, `--color-text-secondary`).
   - Add specific utility classes for safe areas (`pb-safe`, `pt-safe-top`, `mt-safe-top`).
   - Include global styles for glassmorphism, smooth scrolling, and custom scrollbars.

3. **App Architecture and State**
   - Update `src/App.jsx` to wrap `<Routes>` with `AnimatePresence` for page transitions.
   - Add PWA install prompt logic in `src/App.jsx` (intercepting `beforeinstallprompt`).
   - Add state for managing mobile search overlay visibility, and handle the custom `execute-search` and `open-search` events.
   - Adjust `Navbar` and `BottomNav` visibility logic based on viewport size. Add `BottomNav` to the layout.

4. **Bottom Navigation (Mobile)**
   - Create `src/components/BottomNav.jsx`.
   - Implement fixed bottom positioning with safe area support (`pb-safe`).
   - Add smooth animations and active tab highlighting for 'Home', 'Exercises', 'Workouts', 'Favorites', 'About' (or route placeholders).
   - Ensure it's hidden on desktop (`hidden md:flex`).

5. **Sticky Mobile Header & Navbar Update**
   - Update `src/components/Navbar.jsx`.
   - Make it sticky with a compact design and glassmorphism effect.
   - Add a search shortcut icon on mobile to trigger the `open-search` event.
   - Ensure it remains visible on mobile as a sticky header (do not hide it entirely on mobile).

6. **Full-Screen Mobile Search Overlay**
   - Update `src/components/SearchExercises.jsx`.
   - Implement a full-screen overlay for mobile when triggered.
   - Prevent input focus loss by invoking render functions directly instead of mounting them as components (`{renderSearchContent()}`).
   - Include search suggestions and recent searches.
   - Add smooth open/close animations using Framer Motion.

7. **Exercise Cards Redesign**
   - Update `src/components/ExerciseCard.jsx`.
   - Modernize the design with better spacing, typography, and premium card shadows.
   - Add smooth hover and tap animations using Framer Motion (`motion.create(Link)`).
   - Improve image presentation.

8. **Exercise Detail Screen Enhancement**
   - Update `src/pages/ExerciseDetails.jsx` and `src/components/Detail.jsx`.
   - Implement an app-style detail page with a large hero GIF section.
   - Add sticky action buttons and improve content hierarchy and spacing.
   - Ensure mobile-first readability and smooth scrolling.
   - **Crucial:** Preserve all original data fields and render sections (e.g., instructions array).

9. **Page Transitions and Touch Interactions**
   - Update individual pages (`Home.jsx`, `ExerciseDetails.jsx`, `HomeWorkouts.jsx`) to include Framer Motion wrapper for slide/fade transitions on mount/unmount.
   - Apply touch interactions (press animations, scale effects) across interactive elements (buttons, cards) using `whileTap`.

10. **Pre-commit Checks**
    - Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.
