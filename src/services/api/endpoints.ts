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
} as const
