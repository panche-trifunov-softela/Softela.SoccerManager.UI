import { RATING_HISTORY_PLACEHOLDER } from './constants'

/**
 * The player's rating history. It has no history to show yet, so it says so.
 *
 * @returns The rendered placeholder sentence.
 */
export function RatingHistoryPanel() {
  return <p className="label">{RATING_HISTORY_PLACEHOLDER}</p>
}
