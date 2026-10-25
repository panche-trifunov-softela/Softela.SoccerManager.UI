/**
 * The body of `PUT /api/manager-player-rating-votes/{id}`. It changes the direction of one of the
 * signed-in caller's votes.
 */
export interface UpdateManagerPlayerRatingVoteRequest {
  /** The identifier of the vote to update. */
  id: number

  /** Whether the vote is up; `false` means down. */
  upOrDown: boolean
}
