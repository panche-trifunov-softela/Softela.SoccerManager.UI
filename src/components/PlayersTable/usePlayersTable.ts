import { pagerSummary, tableMessage } from './utils'

import type { PlayerRow, PlayersTableProps, PlayersTableState } from './types'

/**
 * Works out what the table and its pager show from the page it is handed.
 *
 * - The pager reflects the page asked for at once.
 * - While a read is in flight the rows are the previous read's, and no failure line shows for it.
 *
 * @param props The query, the rows, the last finished read, whether one is in flight, the failure
 * line, and what to call on a page change.
 * @returns What the body says in place of rows, the sort, and the pager's state.
 */
export function usePlayersTable<TRow extends PlayerRow>({
  query,
  rows,
  result,
  isLoading,
  error,
  onPageChange,
}: PlayersTableProps<TRow>): PlayersTableState {
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
    message: tableMessage(rows.length, totalCount, isLoading, isLoading ? null : error),
    sortBy: query.sortBy ?? 'rating',
    sortDescending: query.sortDescending ?? true,
    summary: result === null ? '' : pagerSummary(page, totalPages, totalCount),
    canGoBack,
    canGoForward,
    goToPrevious,
    goToNext,
  }
}
