import { NO_MATCH_PREFIX, NO_MATCH_SUFFIX } from '../constants'

/**
 * Says that nothing matches a term.
 *
 * @param term The trimmed term.
 * @returns The sentence for the popup and the live region.
 */
export function toNoMatchMessage(term: string): string {
  return `${NO_MATCH_PREFIX}${term}${NO_MATCH_SUFFIX}`
}
