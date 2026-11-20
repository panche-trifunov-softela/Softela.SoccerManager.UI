import type { VoteDirection } from '../components/VoteButtons'

/**
 * Reads the API's up-or-down flag as a vote direction.
 *
 * @param upOrDown `true` for up and `false` for down. Anything else, including a field the API
 * does not send yet, is no vote.
 * @returns The direction, or `null` when there is no vote.
 */
export function toVoteDirection(upOrDown: boolean | null | undefined): VoteDirection | null {
  if (upOrDown === true) return 'up'

  if (upOrDown === false) return 'down'

  return null
}
