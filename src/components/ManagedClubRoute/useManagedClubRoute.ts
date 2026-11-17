import { generatePath } from 'react-router'

import { ROUTES } from '@/constants/routes'
import { useMyLeagueTeams } from '@/hooks/useMyLeagueTeams'
import { useSelectedClub } from '@/hooks/useSelectedClub'

import type { ManagedClubRouteState } from './types'

/**
 * Decides whether the signed-in user may see the club routes below the guard: those that only a
 * club's manager may open.
 *
 * - An address with no valid club id is allowed through, so the page itself says the club could
 *   not be found.
 * - While the user's clubs load nothing shows yet.
 * - After they failed to load, the guard cannot tell a manager from a visitor, so it reports
 *   the failure and keeps the address instead of sending the user away.
 * - A club the user runs is allowed through; any other club redirects to its Squad page.
 *
 * @returns The status, where a redirect goes, and the line a failure shows.
 */
export function useManagedClubRoute(): ManagedClubRouteState {
  const { leagueTeamId, club } = useSelectedClub()
  const { isLoading, error } = useMyLeagueTeams()

  if (leagueTeamId === null) return { status: 'allowed', redirectTo: '', error: null }

  if (isLoading) return { status: 'pending', redirectTo: '', error: null }

  if (error !== null) return { status: 'failed', redirectTo: '', error }

  if (club !== null) return { status: 'allowed', redirectTo: '', error: null }

  return {
    status: 'redirect',
    redirectTo: generatePath(ROUTES.myTeamSquad, { leagueTeamId: String(leagueTeamId) }),
    error: null,
  }
}
