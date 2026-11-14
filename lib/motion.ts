/**
 * Shared scroll-reveal motion constants for sections that don't already have
 * bespoke animation (homepage services/team/clients grids, studio/estimation
 * heroes). Same stagger/duration philosophy as the validated portfolio panel
 * redesign (components/portfolio/PortfolioGrid.tsx) — short durations, small
 * staggers, gentle vertical offset — adapted for a `whileInView` grid reveal
 * instead of that panel's sequential "already open" reveal.
 */

export const FADE_UP_Y = 16;
export const FADE_UP_DURATION_S = 0.4;
export const CASCADE_STAGGER_S = 0.08;

// `margin` fires the animation slightly before the element is fully in
// view, so it doesn't feel delayed on fast scrolls.
export const VIEWPORT_ONCE = { once: true, margin: "-80px" } as const;

/** Standard initial/whileInView/transition props for a staggered grid item. */
export function fadeUpInView(index = 0) {
  return {
    initial: { opacity: 0, y: FADE_UP_Y },
    whileInView: { opacity: 1, y: 0 },
    viewport: VIEWPORT_ONCE,
    transition: { duration: FADE_UP_DURATION_S, delay: index * CASCADE_STAGGER_S, ease: "easeOut" as const },
  };
}
