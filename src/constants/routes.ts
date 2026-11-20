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

  /** The news feed of one team the signed-in user manages, in one league; managers only. */
  myTeamNewsFeed: '/league-teams/:leagueTeamId/news',

  /**
   * The squad of one club, in one league: its manager's, or that of a manager of another club in
   * the same league.
   */
  myTeamSquad: '/league-teams/:leagueTeamId/squad',

  /**
   * The schedule of one club, in one league: every match of its League's latest season. Every
   * signed-in user may open it.
   */
  myTeamSchedule: '/league-teams/:leagueTeamId/schedule',

  /** The tactics of one team the signed-in user manages, in one league; managers only. */
  myTeamTactics: '/league-teams/:leagueTeamId/tactics',

  /** The transfer bids of one team the signed-in user manages, in one league; managers only. */
  myTeamMarketTransferBids: '/league-teams/:leagueTeamId/market/transfer-bids',

  /** The loan bids of one team the signed-in user manages, in one league; managers only. */
  myTeamMarketLoanBids: '/league-teams/:leagueTeamId/market/loan-bids',

  /** The shortlist of one team the signed-in user manages, in one league; managers only. */
  myTeamMarketShortlist: '/league-teams/:leagueTeamId/market/shortlist',

  /** The player search of one team the signed-in user manages, in one league; managers only. */
  myTeamMarketSearch: '/league-teams/:leagueTeamId/market/search',

  /** Adding a team for the signed-in user to manage. */
  addTeam: '/add-team',

  /** The clubs of one league: the second step of adding a team. */
  availableTeams: '/add-team/:leagueId',

  /** The ratings page. */
  ratings: '/ratings',
} as const

/** A path the router knows about — one of the values of `ROUTES`. */
export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES]
