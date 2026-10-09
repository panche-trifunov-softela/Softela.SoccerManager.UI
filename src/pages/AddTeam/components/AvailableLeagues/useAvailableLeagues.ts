import { useEffect, useMemo, useState } from 'react'

import { getLeagues } from '@/services/api'

import { formatCreatedAt } from './utils'

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
 * @param searchTerm The search to narrow by, or `null` for the newest leagues.
 * @returns The rows, whether they are still loading, why they failed, and
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

        setRead({
          searchTerm,
          leagues: [],
          error: cause instanceof Error ? cause.message : 'Game worlds could not be loaded.',
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
          created: formatCreatedAt(league.createdAt),
        }),
      ),
    [current],
  )

  const isLoading = current === null
  const error = current?.error ?? null

  return { rows, isLoading, error, isEmpty: !isLoading && error === null && rows.length === 0 }
}
