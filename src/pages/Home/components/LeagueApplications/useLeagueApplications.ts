import { useEffect, useState } from 'react'

import { getIncomingLeagueTeamManagerApplications, toErrorMessage } from '@/services/api'
import { toast } from '@/store/toast'

import { LEAGUE_APPLICATIONS_LOAD_FAILED_MESSAGE } from './constants'

import type { LeagueApplicationsRead, LeagueApplicationsState } from './types'

/**
 * Reads the applications made for clubs in the signed-in manager's leagues.
 *
 * - The applications are read once, and again each time `refresh` is called. State is written
 *   only when a read settles, so the cards stay on screen while they are read again.
 * - A failure to read says why in a toast, and the section shows a fixed line instead of cards.
 *   A read that was aborted says nothing.
 * - The applications keep the order the API returns them in, and none is filtered out here.
 *
 * @returns The applications, the fixed line for a failed read, whether the section is hidden
 * because the read is in flight or found nothing, and the function that reads the applications
 * again.
 */
export function useLeagueApplications(): LeagueApplicationsState {
  const [read, setRead] = useState<LeagueApplicationsRead | null>(null)

  const [reloads, setReloads] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    getIncomingLeagueTeamManagerApplications(controller.signal)
      .then((applications) => {
        setRead({ applications, error: null })
      })
      .catch((cause: unknown) => {
        // An abort is this effect's own cleanup, not a failure to report.
        if (controller.signal.aborted) return

        toast.error(toErrorMessage(cause, LEAGUE_APPLICATIONS_LOAD_FAILED_MESSAGE))

        setRead({ applications: [], error: LEAGUE_APPLICATIONS_LOAD_FAILED_MESSAGE })
      })

    return () => {
      controller.abort()
    }
  }, [reloads])

  const refresh = () => {
    setReloads((count) => count + 1)
  }

  const applications = read?.applications ?? []

  const error = read?.error ?? null

  const isHidden = read === null || (error === null && applications.length === 0)

  return { applications, error, isHidden, refresh }
}
