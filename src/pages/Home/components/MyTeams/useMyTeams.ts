import { useMyLeagueTeamManagers } from '@/hooks/useMyLeagueTeamManagers'

import type { MyTeamsState } from './types'

/** The grid shows the clubs run right now, not tenures already ended. */
const CURRENT_ONLY = true

/**
 * Reads the clubs the signed-in manager currently runs.
 *
 * @returns The teams, whether they are still loading, why they failed,
 * and whether there are none to show.
 */
export function useMyTeams(): MyTeamsState {
  const { teams, isLoading, error } = useMyLeagueTeamManagers(CURRENT_ONLY)

  return {
    teams,
    isLoading,
    error,
    isEmpty: !isLoading && error === null && teams.length === 0,
  }
}
