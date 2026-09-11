/**
 * Every URL path the application routes to. Nothing else spells a path as a
 * string literal, so a renamed route is a single edit here.
 */
export const ROUTES = {
  /** The landing page. */
  home: '/',
} as const

/** A path the router knows about — one of the values of `ROUTES`. */
export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES]
