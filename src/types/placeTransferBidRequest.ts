/**
 * The body of the proposed `POST /api/league-teams/{id}/league-players/{playerId}/transfer-bids`.
 * The bidding club is the route's club, and the selling club, the season and the Pending status
 * are set by the server, so none of them is in the body. Money is in whole euros.
 */
export interface PlaceTransferBidRequest {
  /** The fee offered for the player, in whole euros. */
  transferFee: number

  /**
   * The price at which the selling club may buy the player back, in whole euros, or `null` for no
   * buyback.
   */
  buybackValue: number | null

  /** How many seasons the buyback stays valid, from 1 to 2, or `null` for no buyback. */
  buybackValidSeasons: number | null

  /**
   * The ids of the bidding club's squad rows offered to the selling club with the bid, at most 2;
   * empty for none.
   */
  swapLeagueTeamPlayerIds: number[]
}
