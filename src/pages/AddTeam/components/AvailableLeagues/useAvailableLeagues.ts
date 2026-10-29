import { useEffect, useMemo, useState } from 'react'
import { generatePath } from 'react-router'

import { ROUTES } from '@/constants/routes'
import { getLeagues, toErrorMessage } from '@/services/api'
import { toast } from '@/store/toast'
import { formatCreatedAt } from '@/utils/formatCreatedAt'

import { GAME_WORLDS_LOAD_FAILED_MESSAGE } from './constants'

import type {
  AvailableLeagueRow,
  AvailableLeaguesProps,
  AvailableLeaguesRead,
  AvailableLeaguesState,
} from './types'

/**
 * Reads the leagues the signed-in user does not manage a club in, narrowed by
 * the search when there is one.
 *
 * Each finished read is kept with the search it was made for, and a read made
 * for an older search counts as still loading. A new search therefore shows
 * the loading state instead of the previous search's rows, while state is
 * still written only when a read settles.
 *
 * - A failed read raises an error toast with the reason, one toast per failed search, and keeps a
 *   fixed line as the error.
 * - A read that was aborted, by a newer search or by leaving the page, raises nothing.
 *
 * @param searchTerm The search to narrow by, or `null` for the newest leagues.
 * @returns The rows, whether they are still loading, the fixed line for a failed read, and
 * whether there are none to show.
 */
export function useAvailableLeagues(
  searchTerm: AvailableLeaguesProps['searchTerm'],
): AvailableLeaguesState {
  const [read, setRead] = useState<AvailableLeaguesRead | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    getLeagues(searchTerm, controller.signal)
      .then((leagues) => {
        setRead({ searchTerm, leagues, error: null })
      })
      .catch((cause: unknown) => {
        // An abort is this effect's own cleanup, not a failure to report.
        if (controller.signal.aborted) return

        toast.error(toErrorMessage(cause, GAME_WORLDS_LOAD_FAILED_MESSAGE))

        // The toast carries the reason; the page keeps only a fixed line where the rows would be.
        setRead({
          searchTerm,
          leagues: [],
          error: GAME_WORLDS_LOAD_FAILED_MESSAGE,
        })
      })

    return () => {
      controller.abort()
    }
  }, [searchTerm])

  const current = read !== null && read.searchTerm === searchTerm ? read : null

  const rows = useMemo(
    () =>
      (current?.leagues ?? []).map(
        (league): AvailableLeagueRow => ({
          id: league.id,
          name: league.name,
          path: generatePath(ROUTES.availableTeams, { leagueId: String(league.id) }),
          created: formatCreatedAt(league.createdAt),
        }),
      ),
    [current],
  )

  const isLoading = current === null
  const error = current?.error ?? null

  return { rows, isLoading, error, isEmpty: !isLoading && error === null && rows.length === 0 }
}
