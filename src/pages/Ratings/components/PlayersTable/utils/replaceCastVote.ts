import type { CastVote, CastVotes } from '../types'

/**
 * Swaps one player's change for another, but only while the change a request started from is
 * still that player's latest. A change made since stays.
 *
 * @param votes The changes this visit made, by player id.
 * @param playerId The player whose change is swapped.
 * @param expected The change the request started from.
 * @param next The change to hold instead, or `undefined` to drop the player's change.
 * @returns The changes with the swap made, or `votes` itself when the player's change moved on.
 */
export function replaceCastVote(
  votes: CastVotes,
  playerId: number,
  expected: CastVote,
  next: CastVote | undefined,
): CastVotes {
  if (votes[playerId] !== expected) return votes

  if (next !== undefined) return { ...votes, [playerId]: next }

  const rest = { ...votes }

  delete rest[playerId]

  return rest
}
