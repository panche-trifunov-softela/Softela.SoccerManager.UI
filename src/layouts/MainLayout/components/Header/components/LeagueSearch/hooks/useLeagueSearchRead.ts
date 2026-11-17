import { useEffect, useState } from 'react'

import { CLUB_NOT_MANAGED_MESSAGE } from '@/constants/clubNotManaged'
import { ApiError, searchLeague, toErrorMessage } from '@/services/api'

import { MIN_TERM_LENGTH, SEARCH_DELAY_MS, SEARCH_FAILED_MESSAGE } from '../constants'

import type { LeagueSearchRead } from '../types'

/**
 * Reads the players and clubs of a club's league whose names contain a term, once typing has
 * paused.
 *
 * - A term under the minimum is never sent.
 * - The read starts after a pause. A newer term, or leaving, clears the pause and aborts a read
 *   that is still in flight, so only the latest term is ever answered.
 * - The latest finished read is kept with the club it was made for. A read made for another club
 *   is never returned; one made for an earlier term is, so the caller can keep showing it while
 *   the term is read.
 * - A kept read stops answering the moment the term changes, even to a term it was made for, and
 *   answers again only when a newer read settles. State is written only when a read settles or,
 *   while rendering, when the term changes.
 * - A caller who does not manage the club (a 403) gets the shared sentence for it. Any other
 *   failure carries the API's reason, or the fixed sentence when it gave none. Neither is
 *   toasted, since a search reads again with every term. A read that was aborted says nothing.
 *
 * @param leagueTeamId The league team id of the club the search is made for.
 * @param term The trimmed term to search for.
 * @returns The latest finished read for the club, or `null` while there is none. It answers
 * `term` only when its `isCurrent` is true.
 */
export function useLeagueSearchRead(leagueTeamId: number, term: string): LeagueSearchRead | null {
  const [settled, setSettled] = useState<LeagueSearchRead | null>(null)
  const [seenTerm, setSeenTerm] = useState(term)

  // Adjusting state while rendering avoids an effect, which oxlint's set-state-in-effect rule
  // rejects.
  if (seenTerm !== term) {
    setSeenTerm(term)

    if (settled?.isCurrent === true) setSettled({ ...settled, isCurrent: false })
  }

  useEffect(() => {
    if (term.length < MIN_TERM_LENGTH) return

    const controller = new AbortController()

    const timer = setTimeout(() => {
      searchLeague(leagueTeamId, term, controller.signal)
        .then((result) => {
          if (controller.signal.aborted) return

          setSettled({ leagueTeamId, isCurrent: true, result, error: null })
        })
        .catch((cause: unknown) => {
          // An abort is this effect's own cleanup, not a failure to report.
          if (controller.signal.aborted) return

          const error =
            cause instanceof ApiError && cause.status === 403
              ? CLUB_NOT_MANAGED_MESSAGE
              : toErrorMessage(cause, SEARCH_FAILED_MESSAGE)

          setSettled({ leagueTeamId, isCurrent: true, result: null, error })
        })
    }, SEARCH_DELAY_MS)

    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [leagueTeamId, term])

  return settled !== null && settled.leagueTeamId === leagueTeamId ? settled : null
}
