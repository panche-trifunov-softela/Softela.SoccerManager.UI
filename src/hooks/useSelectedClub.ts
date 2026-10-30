import { useParams } from 'react-router'

import { toRouteId } from '@/utils/toRouteId'

import { useMyLeagueTeams } from './useMyLeagueTeams'

import type { SelectedClub } from '@/types/selectedClub'

/**
 * Resolves the club the address selects: the `:leagueTeamId` segment, when it is one of the clubs
 * the signed-in manager currently runs in the shared my-teams store.
 *
 * - An address with no valid id selects nothing.
 * - While the manager's clubs load, or after they failed to load, no club is selected, so a page
 *   never claims a club it cannot confirm. `isPending` tells the first case apart.
 *
 * @returns The id in the address, the manager's club with that id, and whether that is still
 * being decided.
 */
export function useSelectedClub(): SelectedClub {
  const { leagueTeamId: segment } = useParams()

  const leagueTeamId = toRouteId(segment)

  const { teams, isLoading, error } = useMyLeagueTeams()

  if (leagueTeamId === null || isLoading || error !== null) {
    return { leagueTeamId, club: null, isPending: leagueTeamId !== null && isLoading }
  }

  const club = teams.find((team) => team.leagueTeamId === leagueTeamId) ?? null

  return { leagueTeamId, club, isPending: false }
}
