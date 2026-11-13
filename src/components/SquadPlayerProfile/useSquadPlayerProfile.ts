import { useEffect, useState } from 'react'

import { toSquadPlayerHeader } from '@/components/PlayerHeader'
import { toPositionsPitch } from '@/components/PositionsPitch'
import { getLeaguePlayerProfile, toErrorMessage } from '@/services/api'
import { toast } from '@/store/toast'

import {
  CLUB_NOT_MANAGED_MESSAGE,
  PROFILE_LOAD_FAILED_MESSAGE,
  PROFILE_LOADING_MESSAGE,
} from './constants'
import { toFailure, toPlayerStatus } from './utils'

import type { SquadPlayerProfileRead, SquadPlayerProfileState } from './types'

/**
 * Reads one player as a club's league has them and works out what the panel shows.
 *
 * - Each finished read is kept with the club and the player it was made for, and a read made for
 *   another pair counts as still loading. State is written only when a read settles.
 * - A player with no registration in the club's league (a 404) says so through `isNotFound`, with
 *   no toast, so the panel can show the player's own profile instead.
 * - A caller who does not manage the club (a 403) gets a fixed sentence and no toast.
 * - Any other failure says why in a toast, and the panel says the player could not be loaded. A
 *   read that was aborted says nothing.
 *
 * @param leagueTeamId The selected club's league team id.
 * @param playerId The player whose profile is read.
 * @returns The props of the header, the pitch and the status section, or the sentence to show in
 * their place.
 */
export function useSquadPlayerProfile(
  leagueTeamId: number,
  playerId: number,
): SquadPlayerProfileState {
  const [read, setRead] = useState<SquadPlayerProfileRead | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    getLeaguePlayerProfile(leagueTeamId, playerId, controller.signal)
      .then((profile) => {
        setRead({ leagueTeamId, playerId, profile, failure: null })
      })
      .catch((cause: unknown) => {
        // An abort is this effect's own cleanup, not a failure to report.
        if (controller.signal.aborted) return

        const failure = toFailure(cause)

        if (failure === 'failed') {
          toast.error(toErrorMessage(cause, PROFILE_LOAD_FAILED_MESSAGE))
        }

        setRead({ leagueTeamId, playerId, profile: null, failure })
      })

    return () => {
      controller.abort()
    }
  }, [leagueTeamId, playerId])

  const current =
    read !== null && read.leagueTeamId === leagueTeamId && read.playerId === playerId ? read : null

  const none = { header: null, pitch: null, status: null, isNotFound: false }

  if (current === null) return { ...none, message: PROFILE_LOADING_MESSAGE }

  if (current.profile === null) {
    return {
      ...none,
      isNotFound: current.failure === 'not-found',
      message: current.failure === 'forbidden' ? CLUB_NOT_MANAGED_MESSAGE : PROFILE_LOAD_FAILED_MESSAGE,
    }
  }

  return {
    header: toSquadPlayerHeader(current.profile, new Date()),
    pitch: toPositionsPitch(current.profile.positions),
    status: toPlayerStatus(current.profile),
    isNotFound: false,
    message: null,
  }
}
