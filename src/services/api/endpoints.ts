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
  leagueTeams: {
    /**
     * Every club on one league's roster, with whether each has a current manager; `?leagueId=`
     * picks the league.
     */
    available: '/api/league-teams/available',
  },
  leagues: {
    /** The leagues the signed-in caller does not manage a club in; `?searchTerm=` narrows them by name. */
    list: '/api/leagues',
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
