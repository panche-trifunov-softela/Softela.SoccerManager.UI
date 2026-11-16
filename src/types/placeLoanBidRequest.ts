/**
 * The body of the proposed `POST /api/league-teams/{id}/league-players/{playerId}/loan-bids`. The
 * bidding club is the route's club, and the selling club, the season and the Pending status are
 * set by the server, so none of them is in the body. Money is in whole euros. The player keeps
 * the same salary at the bidding club, so the body carries none and the server records the
 * bidding club covering all of it.
 */
export interface PlaceLoanBidRequest {
  /** The fee offered for the loan, in whole euros. */
  loanFee: number

  /** How many seasons the loan lasts. */
  seasonsLength: number

  /**
   * The price at which the bidding club may buy the player at the end of the loan, in whole
   * euros, or `null` for no option.
   */
  buyOptionValue: number | null
}
