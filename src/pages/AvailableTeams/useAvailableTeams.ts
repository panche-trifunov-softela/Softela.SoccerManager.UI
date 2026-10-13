import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router'

import { ApiError, getAvailableLeagueTeams, getLeague } from '@/services/api'

import { NOT_FOUND_MESSAGE } from './constants'
import { availableTeamsMessage, toAvailableTeamRow, toLeagueId } from './utils'

import type { AvailableTeamsRead, AvailableTeamsState } from './types'

/**
 * Reads the league the address names, and every club on its roster.
 *
 * - Both are read together, so the page shows one loading state and one failure.
 * - Each finished read is kept with the league it was made for, and a read made for another
 *   league counts as still loading. State is written only when a read settles.
 * - An address that names no valid league id reads nothing. It shows that the game world could
 *   not be found, as does a league the API answers 404 for.
 *
 * @returns The game world's name, the rows, and what shows instead of the table.
 */
export function useAvailableTeams(): AvailableTeamsState {
  const { leagueId: segment } = useParams()

  const leagueId = toLeagueId(segment)

  const [read, setRead] = useState<AvailableTeamsRead | null>(null)

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
        const message = cause instanceof Error ? cause.message : 'Clubs could not be loaded.'

        setRead({
          leagueId,
          league: null,
          teams: [],
          error: isNotFound ? NOT_FOUND_MESSAGE : message,
        })
      })

    return () => {
      controller.abort()
    }
  }, [leagueId])

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
  }
}
