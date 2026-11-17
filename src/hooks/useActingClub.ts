import { useEffect, useSyncExternalStore } from 'react'

import {
  leagueTeamProfiles,
  leagueTeamProfilesStore,
  PROFILE_LOADING,
} from '@/store/leagueTeamProfiles'

import { useMyLeagueTeams } from './useMyLeagueTeams'
import { useSelectedClub } from './useSelectedClub'

import type { ActingClub } from '@/types/actingClub'

/** The result while no club is known: nothing to act as, nothing visited. */
const NO_ACTING_CLUB: ActingClub = { actingClubId: null, visitedClub: null }

/**
 * Resolves the club the signed-in manager acts as on the current page, and the club they are
 * visiting when it is not theirs.
 *
 * - Whether the manager runs the address's club is decided only from their own clubs, as
 *   `useSelectedClub` does. When they run it, they act as it and visit nothing.
 * - When their clubs are read and the address's club is not among them, the club's profile is read
 *   once through the shared profile store. It is the visited club, and the manager acts as their
 *   club in the same league, if they run one there.
 * - While their clubs load, after they failed to load, while the profile is read, and when the
 *   club is unknown, nothing is resolved.
 *
 * @returns The id of the club the manager acts as, and the club they visit.
 */
export function useActingClub(): ActingClub {
  const { leagueTeamId, club } = useSelectedClub()
  const { teams, isLoading, error } = useMyLeagueTeams()

  const profiles = useSyncExternalStore(
    leagueTeamProfilesStore.subscribe,
    leagueTeamProfilesStore.getSnapshot,
  )

  const profileId = club === null && !isLoading && error === null ? leagueTeamId : null

  useEffect(() => {
    if (profileId !== null) leagueTeamProfiles.load(profileId)
  }, [profileId])

  if (club !== null) return { actingClubId: club.leagueTeamId, visitedClub: null }

  if (profileId === null) return NO_ACTING_CLUB

  const { profile } = profiles[profileId] ?? PROFILE_LOADING

  if (profile === null) return NO_ACTING_CLUB

  const ownClub = teams.find((team) => team.leagueId === profile.leagueId)

  return { actingClubId: ownClub?.leagueTeamId ?? null, visitedClub: profile }
}
