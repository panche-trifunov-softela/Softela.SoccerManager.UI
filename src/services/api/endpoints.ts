/**
 * Routes for every backend controller the frontend calls, grouped by
 * controller. Casing follows the backend exactly; each one is a path appended
 * to the configured base URL.
 */
export const API_ROUTES = {
  leagueTeamManagers: {
    /** The signed-in caller's own appointments. */
    mine: '/api/league-team-managers/mine',
  },
  leagueTeamManagerApplications: {
    /** Applies, as the signed-in caller, to manage one club; takes a `POST`. */
    create: '/api/league-team-manager-applications',

    /** The signed-in caller's own pending applications that can still be accepted. */
    mine: '/api/league-team-manager-applications/mine',
  },
  leagueTeams: {
    /**
     * Every club on one league's roster, with whether each has a current manager and whether the
     * caller has applied for it; `?leagueId=` picks the league.
     */
    available: '/api/league-teams/available',

    /** One league team's squad, ordered by line, position, rating and name. */
    players: (id: number) => `/api/league-teams/${id}/players`,

    /**
     * One league team's squad with each player's contract, morale and condition, in the same order
     * as `players`; only the club's current manager or an operator may read it.
     */
    squad: (id: number) => `/api/league-teams/${id}/squad`,
  },
  leagues: {
    /** The leagues the signed-in caller does not manage a club in; `?searchTerm=` narrows them by name. */
    list: '/api/leagues',
  },
  managerPlayerRatingVotes: {
    /** Votes, as the signed-in caller, on one player's current rating; takes a `POST`. */
    create: '/api/manager-player-rating-votes',

    /**
     * One vote, by its id; a `PUT` changes its direction and a `DELETE` withdraws it, when it is the
     * signed-in caller's own.
     */
    byId: (id: number) => `/api/manager-player-rating-votes/${id}`,
  },
  managers: {
    /** The signed-in caller's own manager profile; a `POST` creates it when it is missing. */
    me: '/api/managers/me',
  },
  players: {
    /** Searches the players; every query parameter narrows, sorts or pages the result. */
    search: '/api/players/search',
  },
  positions: {
    /** Every position, ordered by name. */
    list: '/api/positions',
  },
  teams: {
    /** Every team, ordered by name. */
    list: '/api/teams',
  },
  nationalTeams: {
    /** Every national team, ordered by name. */
    list: '/api/national-teams',
  },
} as const
