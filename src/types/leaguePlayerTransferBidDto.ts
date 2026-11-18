import type { LeaguePlayerBidSwapPlayerDto } from './leaguePlayerBidSwapPlayerDto'

/**
 * One pending transfer bid for a player of the club in the route, as
 * `GET /api/league-teams/{id}/league-players/{playerId}/bids` lists it.
 *
 * Mirrors `LeaguePlayerTransferBidDto` on the backend.
 */
export interface LeaguePlayerTransferBidDto {
  /**
   * The identifier of the bid. A transfer bid and a loan bid can share an id, so it only tells
   * bids apart within one kind.
   */
  id: number

  /** The identifier of the bidding club's league team. */
  leagueTeamId: number

  /** The name of the bidding club. */
  teamName: string

  /** The URL of the bidding club's crest, or `null` when it has none. */
  teamLogoUrl: string | null

  /** The name of the bidding club's manager, or `null` when it has none. */
  managerName: string | null

  /** The number of the season the bid was placed in, within its league. */
  seasonNumber: number

  /** The fee offered, in whole euros; `0` for none. */
  transferFee: number

  /** The price at which the selling club may buy the player back, or `null` for no buyback. */
  buybackValue: number | null

  /** How many seasons the buyback stays valid, or `null` for no buyback. */
  buybackValidSeasons: number | null

  /** The players the bidding club offers in swap; empty for none. */
  swapPlayers: LeaguePlayerBidSwapPlayerDto[]

  /** When the bid was placed, as an ISO 8601 UTC timestamp. */
  createdAt: string
}
