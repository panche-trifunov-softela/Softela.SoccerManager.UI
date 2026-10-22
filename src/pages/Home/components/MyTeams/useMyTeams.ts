import { useEffect, useState } from 'react'

import { getMyLeagueTeamManagers, toErrorMessage } from '@/services/api'
import { toast } from '@/store/toast'

import { CURRENT_ONLY, LOADING, MY_TEAMS_LOAD_FAILED_MESSAGE } from './constants'

import type { MyTeamsRead, MyTeamsState } from './types'

/**
 * Reads the clubs the signed-in manager currently runs.
 *
 * - State is written only when the read settles, never while starting one.
 * - A failed read raises an error toast with the reason, and keeps a fixed line as the error.
 * - A read that was aborted by the effect's cleanup raises nothing.
 *
 * @returns The teams, whether they are still loading, the fixed line for a failed read,
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

        toast.error(toErrorMessage(cause, MY_TEAMS_LOAD_FAILED_MESSAGE))

        // The toast carries the reason; the page keeps only a fixed line where the clubs would be.
        setRead({
          teams: [],
          isLoading: false,
          error: MY_TEAMS_LOAD_FAILED_MESSAGE,
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
