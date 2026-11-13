import { useEffect, useState } from 'react'

import { toErrorMessage } from '@/services/api'
import { toast } from '@/store/toast'

import { CLUB_NOT_MANAGED_MESSAGE } from '../constants'
import { toFailure } from '../utils'

import type {
  PlayerTabReader,
  PlayerTabReadMessages,
  PlayerTabReadState,
  PlayerTabSettledRead,
} from '../types'

/**
 * Reads one tab's list for a player in a club's league and works out what the tab shows.
 *
 * - Each finished read is kept with the club and the player it was made for, and a read made for
 *   another pair counts as still loading. State is written only when a read settles.
 * - A caller who does not manage the club (a 403) gets a fixed sentence and no toast.
 * - Any other failure, a 404 included, says why in a toast, and the tab says the list could not be
 *   loaded. A read that was aborted says nothing.
 *
 * @param leagueTeamId The selected club's league team id.
 * @param playerId The player whose list is read.
 * @param read What reads the list.
 * @param messages The sentences for loading and for a failed read; pass a stable object.
 * @returns What was read, or the sentence to show in its place.
 */
export function usePlayerTabRead<T>(
  leagueTeamId: number,
  playerId: number,
  read: PlayerTabReader<T>,
  messages: PlayerTabReadMessages,
): PlayerTabReadState<T> {
  const [settled, setSettled] = useState<PlayerTabSettledRead<T> | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    read(leagueTeamId, playerId, controller.signal)
      .then((data) => {
        setSettled({ leagueTeamId, playerId, data, message: null })
      })
      .catch((cause: unknown) => {
        // An abort is this effect's own cleanup, not a failure to report.
        if (controller.signal.aborted) return

        if (toFailure(cause) === 'forbidden') {
          setSettled({ leagueTeamId, playerId, data: null, message: CLUB_NOT_MANAGED_MESSAGE })

          return
        }

        toast.error(toErrorMessage(cause, messages.failed))

        setSettled({ leagueTeamId, playerId, data: null, message: messages.failed })
      })

    return () => {
      controller.abort()
    }
  }, [leagueTeamId, playerId, read, messages])

  const current =
    settled !== null && settled.leagueTeamId === leagueTeamId && settled.playerId === playerId
      ? settled
      : null

  if (current === null) return { data: null, message: messages.loading }

  return { data: current.data, message: current.message }
}
