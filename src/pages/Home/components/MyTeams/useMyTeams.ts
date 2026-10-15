import { useEffect, useState } from 'react'

import { getMyLeagueTeamManagers } from '@/services/api'

import { CURRENT_ONLY, LOADING } from './constants'

import type { MyTeamsRead, MyTeamsState } from './types'

/**
 * Reads the clubs the signed-in manager currently runs.
 *
 * State is written only when the read settles, never while starting one.
 *
 * @returns The teams, whether they are still loading, why they failed,
 * and whether there are none to show.
 */
export function useMyTeams(): MyTeamsState {
  const [read, setRead] = useState<MyTeamsRead>(LOADING)

  useEffect(() => {
    const controller = new AbortController()

    getMyLeagueTeamManagers(CURRENT_ONLY, controller.signal)
      .then((teams) => {
        setRead({ teams, isLoading: false, error: null })
      })
      .catch((cause: unknown) => {
        // An abort is this effect's own cleanup, not a failure to report.
        if (controller.signal.aborted) return

        setRead({
          teams: [],
          isLoading: false,
          error: cause instanceof Error ? cause.message : 'Your clubs could not be loaded.',
        })
      })

    return () => {
      controller.abort()
    }
  }, [])

  const { teams, isLoading, error } = read

  return {
    teams,
    isLoading,
    error,
    isEmpty: !isLoading && error === null && teams.length === 0,
  }
}
