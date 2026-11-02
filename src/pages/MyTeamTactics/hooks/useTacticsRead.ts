import { useCallback, useEffect, useState } from 'react'

import {
  getFormations,
  getLeagueTeamNextMatch,
  getLeagueTeamSquadMembers,
  toErrorMessage,
} from '@/services/api'
import { toast } from '@/store/toast'

import { TACTICS_LOAD_FAILED_MESSAGE } from '../constants'

import type { MatchLineupDto } from '@/types/matchLineupDto'

import type { TacticsRead, TacticsReadState } from '../types'

/**
 * Reads what the tactics page shows for the club the address names: its next match with the
 * lineup, its squad and the formations on offer.
 *
 * - The three reads run together and are kept as one, with the club they were made for. A read
 *   made for another club counts as still loading. State is written only when a read settles.
 * - An address that names no valid id reads nothing.
 * - A failure to read, a refusal for a caller who does not manage the club included, says why in a
 *   toast and is kept as a fixed sentence. A read that was aborted says nothing.
 * - `reload` reads again and keeps the old read on screen until the new one lands. Each read is
 *   tagged with the reload count it was started for, so `isReloading` holds while the shown read
 *   is older than the latest reload asked for.
 * - `replaceLineup` swaps in a lineup the API returned, only while the shown read is still the
 *   club and the match that lineup belongs to.
 *
 * @param leagueTeamId The league team the address names, or `null` when it names none.
 * @returns The read for that club, whether it is loading or being read again, and the two actions.
 */
export function useTacticsRead(leagueTeamId: number | null): TacticsReadState {
  const [stored, setStored] = useState<TacticsRead | null>(null)

  const [reloads, setReloads] = useState(0)

  useEffect(() => {
    if (leagueTeamId === null) return

    const controller = new AbortController()

    Promise.all([
      getLeagueTeamNextMatch(leagueTeamId, controller.signal),
      getLeagueTeamSquadMembers(leagueTeamId, controller.signal),
      getFormations(controller.signal),
    ])
      .then(([nextMatch, squad, formations]) => {
        setStored({
          leagueTeamId,
          nextMatch,
          squad,
          formations,
          error: null,
          reloadCount: reloads,
        })
      })
      .catch((cause: unknown) => {
        // An abort is this effect's own cleanup, not a failure to report.
        if (controller.signal.aborted) return

        toast.error(toErrorMessage(cause, TACTICS_LOAD_FAILED_MESSAGE))

        setStored({
          leagueTeamId,
          nextMatch: null,
          squad: [],
          formations: [],
          error: TACTICS_LOAD_FAILED_MESSAGE,
          reloadCount: reloads,
        })
      })

    return () => {
      controller.abort()
    }
  }, [leagueTeamId, reloads])

  const reload = useCallback(() => {
    setReloads((count) => count + 1)
  }, [])

  const replaceLineup = useCallback((lineup: MatchLineupDto) => {
    setStored((current) => {
      const nextMatch = current?.nextMatch ?? null

      if (current === null || nextMatch === null) return current

      // A response that lands after the user moved to another club or match is not theirs to show.
      if (current.leagueTeamId !== lineup.leagueTeamId || nextMatch.matchId !== lineup.matchId) {
        return current
      }

      return { ...current, nextMatch: { ...nextMatch, lineup } }
    })
  }, [])

  const read = stored !== null && stored.leagueTeamId === leagueTeamId ? stored : null

  return {
    read,
    isLoading: leagueTeamId !== null && read === null,
    isReloading: read !== null && read.reloadCount < reloads,
    reload,
    replaceLineup,
  }
}
