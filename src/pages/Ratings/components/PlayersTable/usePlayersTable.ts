import { useEffect, useMemo, useState } from 'react'

import { searchPlayers, toErrorMessage } from '@/services/api'
import { toast } from '@/store/toast'

import { PLAYERS_LOAD_FAILED_MESSAGE } from './constants'
import { pagerSummary, tableMessage, toPlayerRow } from './utils'

import type { PlayersRead, PlayersTableProps, PlayersTableState } from './types'

/**
 * Reads the page of players the query asks for, and works out what the table
 * and its pager show.
 *
 * - Every finished read is kept with the query it was made for.
 * - A read for an older query counts as loading.
 * - While loading, the previous rows stay, so the table, its headings and its
 *   pager never unmount, and focus survives a sort or page change.
 * - The query is compared by identity, because every change makes a new
 *   object: it only ever changes through `useRatings`' setter, so a repeated
 *   search reads again.
 * - The pager reflects the page asked for at once.
 * - A failed read raises an error toast with the reason, and the table keeps a fixed line saying
 *   the players could not be loaded. A read that was aborted raises nothing.
 *
 * @param query The search to read: its name, filters, sort and page.
 * @param onPageChange Called with the page the reader asked for.
 * @returns The rows, whether they are still loading, what the body says in
 * place of rows, the sort, and the pager's state.
 */
export function usePlayersTable(
  query: PlayersTableProps['query'],
  onPageChange: PlayersTableProps['onPageChange'],
): PlayersTableState {
  const [read, setRead] = useState<PlayersRead | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    searchPlayers(query, controller.signal)
      .then((result) => {
        setRead({ query, result, error: null })
      })
      .catch((cause: unknown) => {
        // An abort is this effect's own cleanup, not a failure to report.
        if (controller.signal.aborted) return

        toast.error(toErrorMessage(cause, PLAYERS_LOAD_FAILED_MESSAGE))

        // The table keeps a fixed line rather than the raw cause, which can be a browser's
        // "Failed to fetch"; the toast carries the reason.
        setRead({ query, result: null, error: PLAYERS_LOAD_FAILED_MESSAGE })
      })

    return () => {
      controller.abort()
    }
  }, [query])

  const isLoading = read === null || read.query !== query

  const result = read?.result ?? null

  const rows = useMemo(() => {
    const today = new Date()

    return (result?.items ?? []).map((item) => toPlayerRow(item, today))
  }, [result])

  const page = query.page ?? 1
  const totalCount = result?.totalCount ?? 0
  const totalPages = Math.max(1, Math.ceil(totalCount / (result?.pageSize ?? query.pageSize ?? 1)))

  const canGoBack = page > 1
  const canGoForward = result !== null && page < totalPages

  const goToPrevious = () => {
    if (canGoBack) onPageChange(page - 1)
  }

  const goToNext = () => {
    if (canGoForward) onPageChange(page + 1)
  }

  return {
    rows,
    isLoading,
    message: tableMessage(
      rows.length,
      totalCount,
      isLoading,
      isLoading ? null : (read?.error ?? null),
    ),
    sortBy: query.sortBy ?? 'rating',
    sortDescending: query.sortDescending ?? true,
    summary: result === null ? '' : pagerSummary(page, totalPages, totalCount),
    canGoBack,
    canGoForward,
    goToPrevious,
    goToNext,
  }
}
