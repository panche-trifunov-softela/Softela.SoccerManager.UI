import { useCallback, useEffect, useState } from 'react'

import {
  getFormations,
  getInstructionOptions,
  getLeagueTeamNextMatch,
  getLeagueTeamSquadMembers,
  getMatchSubstitutions,
  getSubstitutionOptions,
  toErrorMessage,
} from '@/services/api'
import { toast } from '@/store/toast'

import { TACTICS_LOAD_FAILED_MESSAGE } from '../constants'

import type { MatchInstructionsDto } from '@/types/matchInstructionsDto'
import type { MatchLineupDto } from '@/types/matchLineupDto'
import type { MatchSubstitutionDto } from '@/types/matchSubstitutionDto'

import type { TacticsRead, TacticsReadState } from '../types'

/**
 * Reads what the tactics page shows for the club the address names: its next match with the
 * lineup and its saved substitutions, its squad, the formations on offer, the instructions on
 * offer and the minutes and situations a substitution is picked by.
 *
 * - The five reads run together and are kept as one, with the club they were made for. A read
 *   made for another club counts as still loading. State is written only when a read settles.
 * - The saved substitutions are read right after the next match, with the match's id; a club with
 *   no match has none, and no request is made for them.
 * - An address that names no valid id reads nothing.
 * - A failure to read, a refusal for a caller who does not manage the club included, says why in a
 *   toast and is kept as a fixed sentence. A read that was aborted says nothing.
 * - `reload` reads again and keeps the old read on screen until the new one lands. Each read is
 *   tagged with the reload count it was started for, so `isReloading` holds while the shown read
 *   is older than the latest reload asked for.
 * - `replaceLineup` swaps in a lineup the API returned, only while the shown read is still the
 *   club and the match that lineup belongs to.
 * - `replaceInstructions` does the same for the match's instructions.
 * - `replaceSituations` swaps in the match's saved substitutions the API returned, only while the
 *   shown read is still the club and the match named.
 *
 * @param leagueTeamId The league team the address names, or `null` when it names none.
 * @returns The read for that club, whether it is loading or being read again, and the actions.
 */
export function useTacticsRead(leagueTeamId: number | null): TacticsReadState {
  const [stored, setStored] = useState<TacticsRead | null>(null)

  const [reloads, setReloads] = useState(0)

  useEffect(() => {
    if (leagueTeamId === null) return

    const controller = new AbortController()

    Promise.all([
      getLeagueTeamNextMatch(leagueTeamId, controller.signal).then(async (nextMatch) => {
        if (nextMatch === null) return { nextMatch, situations: [] }

        const situations = await getMatchSubstitutions(
          nextMatch.matchId,
          leagueTeamId,
          controller.signal,
        )

        return { nextMatch, situations }
      }),
      getLeagueTeamSquadMembers(leagueTeamId, controller.signal),
      getFormations(controller.signal),
      getInstructionOptions(controller.signal),
      getSubstitutionOptions(controller.signal),
    ])
      .then(
        ([
          { nextMatch, situations },
          squad,
          formations,
          instructionDefinitions,
          substitutionDefinitions,
        ]) => {
          setStored({
            leagueTeamId,
            nextMatch,
            squad,
            formations,
            instructionDefinitions,
            substitutionDefinitions,
            situations,
            error: null,
            reloadCount: reloads,
          })
        },
      )
      .catch((cause: unknown) => {
        // An abort is this effect's own cleanup, not a failure to report.
        if (controller.signal.aborted) return

        toast.error(toErrorMessage(cause, TACTICS_LOAD_FAILED_MESSAGE))

        setStored({
          leagueTeamId,
          nextMatch: null,
          squad: [],
          formations: [],
          instructionDefinitions: [],
          substitutionDefinitions: [],
          situations: [],
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

  const replaceInstructions = useCallback((instructions: MatchInstructionsDto) => {
    setStored((current) => {
      const nextMatch = current?.nextMatch ?? null

      if (current === null || nextMatch === null) return current

      // A response that lands after the user moved to another club or match is not theirs to show.
      if (
        current.leagueTeamId !== instructions.leagueTeamId ||
        nextMatch.matchId !== instructions.matchId
      ) {
        return current
      }

      return { ...current, nextMatch: { ...nextMatch, instructions } }
    })
  }, [])

  const replaceSituations = useCallback(
    (namedMatchId: number, namedLeagueTeamId: number, situations: MatchSubstitutionDto[]) => {
      setStored((current) => {
        const nextMatch = current?.nextMatch ?? null

        if (current === null || nextMatch === null) return current

        // A response that lands after the user moved to another club or match is not theirs to
        // show. The ids come from the caller, since an empty list carries none.
        if (current.leagueTeamId !== namedLeagueTeamId || nextMatch.matchId !== namedMatchId) {
          return current
        }

        return { ...current, situations }
      })
    },
    [],
  )

  const read = stored !== null && stored.leagueTeamId === leagueTeamId ? stored : null

  return {
    read,
    isLoading: leagueTeamId !== null && read === null,
    isReloading: read !== null && read.reloadCount < reloads,
    reload,
    replaceLineup,
    replaceInstructions,
    replaceSituations,
  }
}
