import { useEffect, useState } from 'react'

import { PLAYERS_LOAD_FAILED_MESSAGE } from '@/constants/playersLoadFailed'
import { ApiError, toErrorMessage } from '@/services/api'
import { toast } from '@/store/toast'

import type { PlayerSearchQuery } from '@/types/playerSearchQuery'
import type { PlayerSearchReadState, PlayerSearchSettledRead } from '@/types/playerSearchRead'

/**
 * Reads the page of players a query asks for.
 *
 * - Every finished read is kept with the query it was made for.
 * - A read for an older query counts as loading.
 * - While loading, the previous result stays, so the table, its headings and its
 *   pager never unmount, and focus survives a sort or page change.
 * - The query is compared by identity, because every change makes a new
 *   object: it only ever changes through its page's setter, so a repeated
 *   search reads again.
 * - A failed read raises an error toast with the reason, and keeps a fixed line saying the players
 *   could not be loaded. A read that was aborted raises nothing.
 * - With a `forbiddenMessage`, a 403 keeps that sentence instead, and raises no toast.
 * - `readPage` must keep its identity while the caller lives: a module function, or a
 *   `useCallback` whose inputs remount the caller.
 *
 * @param readPage Reads one page of players for a query; it is handed a signal that aborts it.
 * @param query The search to read: its name, filters, sort and page.
 * @param forbiddenMessage The sentence a 403 keeps in place of the fixed line, if any.
 * @returns The page read, whether the read for this query is still in flight, and the line that
 * says the last finished read failed.
 */
export function usePlayerSearchRead<TResult>(
  readPage: (query: PlayerSearchQuery, signal: AbortSignal) => Promise<TResult>,
  query: PlayerSearchQuery,
  forbiddenMessage?: string,
): PlayerSearchReadState<TResult> {
  const [read, setRead] = useState<PlayerSearchSettledRead<TResult> | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    readPage(query, controller.signal)
      .then((result) => {
        setRead({ query, result, error: null })
      })
      .catch((cause: unknown) => {
        // An abort is this effect's own cleanup, not a failure to report.
        if (controller.signal.aborted) return

        if (forbiddenMessage !== undefined && cause instanceof ApiError && cause.status === 403) {
          setRead({ query, result: null, error: forbiddenMessage })

          return
        }

        toast.error(toErrorMessage(cause, PLAYERS_LOAD_FAILED_MESSAGE))

        // The table keeps a fixed line rather than the raw cause, which can be a browser's
        // "Failed to fetch"; the toast carries the reason.
        setRead({ query, result: null, error: PLAYERS_LOAD_FAILED_MESSAGE })
      })

    return () => {
      controller.abort()
    }
  }, [readPage, query, forbiddenMessage])

  return {
    result: read?.result ?? null,
    isLoading: read === null || read.query !== query,
    error: read?.error ?? null,
  }
}
