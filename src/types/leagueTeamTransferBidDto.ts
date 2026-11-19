import type { LeaguePlayerBidSwapPlayerDto } from './leaguePlayerBidSwapPlayerDto'
import type { TransferStatus } from './transferStatus'

/**
 * One transfer bid a club placed or received, as `GET /api/league-teams/{id}/transfer-bids` lists
 * it.
 *
 * Mirrors `LeagueTeamTransferBidDto` on the backend.
 */
export interface LeagueTeamTransferBidDto {
  /**
   * The identifier of the bid. A transfer bid and a loan bid can share an id, so it only tells
   * bids apart within one kind.
   */
  id: number

  /** Whether the club in the route received the bid; `false` when it placed it. */
  isReceived: boolean

  /** Where the bid stands: pending, accepted or completed; a rejected bid is never listed. */
  status: TransferStatus

  /** The identifier of the player the bid is for. */
  playerId: number

  /** The name of the player the bid is for. */
  playerName: string

  /**
   * The identifier of the other club's league team: the bidder for a received bid, the selling
   * club for a placed one.
   */
  leagueTeamId: number

  /** The name of the other club. */
  teamName: string

  /** The URL of the other club's crest, or `null` when it has none. */
  teamLogoUrl: string | null

  /** The name of the other club's manager, or `null` when it has none. */
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
