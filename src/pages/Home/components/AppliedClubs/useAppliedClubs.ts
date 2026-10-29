import { useEffect, useState } from 'react'

import { getMyLeagueTeamManagerApplications, toErrorMessage } from '@/services/api'
import { toast } from '@/store/toast'

import { APPLIED_CLUBS_LOAD_FAILED_MESSAGE } from './constants'

import type { AppliedClubsRead, AppliedClubsState } from './types'

/**
 * Reads the pending applications of the signed-in manager.
 *
 * - The read is made once, and state is written only when it settles.
 * - A failure to read says why in a toast, and the section shows a fixed line instead of cards.
 *   A read that was aborted says nothing.
 * - The applications keep the order the API returns them in, and none is filtered out here.
 *
 * @returns The applications, the fixed line for a failed read, and whether the section is hidden
 * because the read is in flight or found nothing.
 */
export function useAppliedClubs(): AppliedClubsState {
  const [read, setRead] = useState<AppliedClubsRead | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    getMyLeagueTeamManagerApplications(controller.signal)
      .then((applications) => {
        setRead({ applications, error: null })
      })
      .catch((cause: unknown) => {
        // An abort is this effect's own cleanup, not a failure to report.
        if (controller.signal.aborted) return

        toast.error(toErrorMessage(cause, APPLIED_CLUBS_LOAD_FAILED_MESSAGE))

        setRead({ applications: [], error: APPLIED_CLUBS_LOAD_FAILED_MESSAGE })
      })

    return () => {
      controller.abort()
    }
  }, [])

  const applications = read?.applications ?? []

  const error = read?.error ?? null

  const isHidden = read === null || (error === null && applications.length === 0)

  return { applications, error, isHidden }
}
