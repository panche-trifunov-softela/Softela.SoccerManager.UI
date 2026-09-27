import { useEffect, useState } from 'react'

import { getMyLeagueTeamManagers } from '@/services/api'

import type { MyLeagueTeamManagerDto } from '@/types/myLeagueTeamManagerDto'

/** What `useMyLeagueTeamManagers` exposes to its caller. */
export interface MyLeagueTeamManagersState {
  /** The teams read, empty until the first read resolves. */
  teams: readonly MyLeagueTeamManagerDto[]

  /** Whether a read is in flight. */
  isLoading: boolean

  /** Why the read failed, or `null` when it did not. */
  error: string | null
}

/** What the caller sees before the first read resolves. */
const LOADING: MyLeagueTeamManagersState = {
  teams: [],
  isLoading: true,
  error: null,
}

/**
 * Reads the signed-in manager's teams from the API.
 *
 * This lives in the shared hooks root rather than beside its component
 * because `api-import-boundary` forbids anything under `src/pages`,
 * `src/components` or `src/layouts` from importing the API layer — a
 * component reaches it through a hook that sits outside those folders.
 *
 * State is written only when a read settles, never while starting one, so a
 * change of `currentOnly` leaves the previous list on screen until the new
 * read lands rather than blanking it.
 *
 * @param currentOnly Whether to narrow the result to current teams.
 * @returns The teams, whether a read is in flight, and any failure.
 */
export function useMyLeagueTeamManagers(currentOnly: boolean): MyLeagueTeamManagersState {
  const [state, setState] = useState<MyLeagueTeamManagersState>(LOADING)

  useEffect(() => {
    const controller = new AbortController()

    getMyLeagueTeamManagers(currentOnly, controller.signal)
      .then((teams) => {
        setState({ teams, isLoading: false, error: null })
      })
      .catch((cause: unknown) => {
        // An abort is this effect's own cleanup, not a failure to report.
        if (controller.signal.aborted) return

        setState({
          teams: [],
          isLoading: false,
          error: cause instanceof Error ? cause.message : 'Your clubs could not be loaded.',
        })
      })

    return () => {
      controller.abort()
    }
  }, [currentOnly])

  return state
}
