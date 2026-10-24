import { useMyLeagueTeams } from '@/hooks/useMyLeagueTeams'

import type { MyTeamsState } from './types'

/**
 * Reads the clubs the signed-in manager currently runs, from the shared my-teams store.
 *
 * @returns The teams, whether they are still loading, the fixed line for a failed read, and
 * whether there are none to show.
 */
export function useMyTeams(): MyTeamsState {
  const { teams, isLoading, error } = useMyLeagueTeams()

  return {
    teams,
    isLoading,
    error,
    isEmpty: !isLoading && error === null && teams.length === 0,
  }
}
