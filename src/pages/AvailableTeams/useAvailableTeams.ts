import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router'

import { ApiError, getAvailableLeagueTeams, getLeague, toErrorMessage } from '@/services/api'
import { toast } from '@/store/toast'
import { toRouteId } from '@/utils/toRouteId'

import { CLUBS_LOAD_FAILED_MESSAGE, NOT_FOUND_MESSAGE } from './constants'
import { availableTeamsMessage, toAvailableTeamRow } from './utils'

import type { AvailableTeamsRead, AvailableTeamsState } from './types'

/**
 * Reads the league the address names, and every club on its roster.
 *
 * - Both are read together, so the page shows one loading state and one failure.
 * - Each finished read is kept with the league it was made for, and a read made for another
 *   league counts as still loading. State is written only when a read settles.
 * - An address that names no valid league id reads nothing. It shows that the game world could
 *   not be found, as does a league the API answers 404 for.
 * - Any other failure to read says why in a toast, and shows a fixed sentence where the table
 *   would be. A read that was aborted says nothing.
 * - `refresh` reads the game world and its clubs again, keeping the table on screen until the new
 *   rows land. A failed reload is reported like a failed load.
 *
 * @returns The game world's name, the rows, what shows instead of the table, and the function that
 * reads the game world and its clubs again.
 */
export function useAvailableTeams(): AvailableTeamsState {
  const { leagueId: segment } = useParams()

  const leagueId = toRouteId(segment)

  const [read, setRead] = useState<AvailableTeamsRead | null>(null)

  const [reloads, setReloads] = useState(0)

  useEffect(() => {
    if (leagueId === null) return

    const controller = new AbortController()

    Promise.all([
      getLeague(leagueId, controller.signal),
      getAvailableLeagueTeams(leagueId, controller.signal),
    ])
      .then(([league, teams]) => {
        setRead({ leagueId, league, teams, error: null })
      })
      .catch((cause: unknown) => {
        // An abort is this effect's own cleanup, not a failure to report.
        if (controller.signal.aborted) return

        const isNotFound = cause instanceof ApiError && cause.status === 404

        // Not found is a state of the page, like a bad address, so it is not an event to toast.
        if (!isNotFound) toast.error(toErrorMessage(cause, CLUBS_LOAD_FAILED_MESSAGE))

        setRead({
          leagueId,
          league: null,
          teams: [],
          error: isNotFound ? NOT_FOUND_MESSAGE : CLUBS_LOAD_FAILED_MESSAGE,
        })
      })

    return () => {
      controller.abort()
    }
  }, [leagueId, reloads])

  const refresh = () => {
    setReloads((count) => count + 1)
  }

  const current = read !== null && read.leagueId === leagueId ? read : null

  const rows = useMemo(
    () => (current?.teams ?? []).map((team) => toAvailableTeamRow(team)),
    [current],
  )

  return {
    leagueName: current?.league?.name ?? null,
    rows,
    message: availableTeamsMessage(
      leagueId !== null,
      current === null,
      current?.error ?? null,
      rows.length,
    ),
    refresh,
  }
}
