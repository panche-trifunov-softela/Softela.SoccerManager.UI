/**
 * One player the bidding club offers in swap with a transfer bid, as the `swapPlayers` of a
 * `LeaguePlayerTransferBidDto` lists them.
 *
 * Mirrors `LeaguePlayerBidSwapPlayerDto` on the backend.
 */
export interface LeaguePlayerBidSwapPlayerDto {
  /** The identifier of the player. */
  playerId: number

  /** The name of the player. */
  name: string

  /** The short name of the player's main position, such as `CB`. */
  positionShortName: string

  /** The player's current rating, or `null` when none is recorded. */
  rating: number | null
}
