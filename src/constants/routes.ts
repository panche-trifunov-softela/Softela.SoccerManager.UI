/**
 * Every URL path the application routes to. Nothing else spells a path as a
 * string literal, so a renamed route is a single edit here.
 */
export const ROUTES = {
  /** The landing page. */
  home: '/',

  /** The signed-in user's profile. */
  profile: '/profile',

  /** Application settings. */
  settings: '/settings',

  /** The news feed of one team the signed-in user manages, in one league. */
  myTeamNewsFeed: '/leagues/:leagueId/teams/:teamId/news',

  /** Adding a team for the signed-in user to manage. */
  addTeam: '/add-team',
} as const

/** A path the router knows about — one of the values of `ROUTES`. */
export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES]
