import {
  KEEP_TYPING_MESSAGE,
  MIN_TERM_LENGTH,
  SEARCH_FAILED_MESSAGE,
  SEARCHING_MESSAGE,
  TERM_TOO_SHORT_MESSAGE,
} from '../constants'

import { isResultCut } from './isResultCut'
import { toFoundMessage } from './toFoundMessage'
import { toNoMatchMessage } from './toNoMatchMessage'

import type { LeagueSearchRead, LeagueSearchStatus } from '../types'

/**
 * Works out what the search says about itself.
 *
 * - No term: nothing.
 * - A term under the minimum: the prompt to type more.
 * - A term whose answer is still being read: the popup keeps whatever earlier answer had matches,
 *   with its footer, and says "Searching…" only when there is none. The live region says nothing
 *   while earlier matches are shown, and "Searching…" otherwise.
 * - A read that failed: the reason it carries.
 * - A read with no matches: that nothing matches the term.
 * - A read with matches: the popup adds the footer when a group lists only its best matches, and
 *   the live region says how many players and teams were found, leaving out a group with none.
 *
 * @param term The trimmed term.
 * @param read The latest finished read for the club, or `null` when there is none. It answers the
 * term only when it is current.
 * @returns The line for the popup, its footer and the sentence for the live region.
 */
export function toSearchStatus(term: string, read: LeagueSearchRead | null): LeagueSearchStatus {
  if (term === '') return { message: null, footer: null, announced: '' }

  if (term.length < MIN_TERM_LENGTH) {
    return { message: TERM_TOO_SHORT_MESSAGE, footer: null, announced: TERM_TOO_SHORT_MESSAGE }
  }

  if (read === null || !read.isCurrent) {
    const earlier = read?.result ?? null

    const hasEarlier =
      earlier !== null && (earlier.players.items.length > 0 || earlier.teams.items.length > 0)

    return {
      message: hasEarlier ? null : SEARCHING_MESSAGE,
      footer: hasEarlier && isResultCut(earlier) ? KEEP_TYPING_MESSAGE : null,
      announced: hasEarlier ? '' : SEARCHING_MESSAGE,
    }
  }

  if (read.result === null) {
    const message = read.error ?? SEARCH_FAILED_MESSAGE

    return { message, footer: null, announced: message }
  }

  const { players, teams } = read.result

  if (players.items.length === 0 && teams.items.length === 0) {
    const message = toNoMatchMessage(term)

    return { message, footer: null, announced: message }
  }

  return {
    message: null,
    footer: isResultCut(read.result) ? KEEP_TYPING_MESSAGE : null,
    announced: toFoundMessage(read.result),
  }
}
