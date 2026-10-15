/**
 * The body of `POST /api/manager-player-rating-votes`. The voting manager is the signed-in
 * caller, taken from the token, and the server stores the player's current rating with the vote,
 * so neither is part of the body.
 */
export interface CreateManagerPlayerRatingVoteRequest {
  /** The identifier of the player voted on. */
  playerId: number

  /** Whether the vote is up; `false` means down. */
  upOrDown: boolean
}
