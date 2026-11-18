import type { TransferStatus } from './transferStatus'

/**
 * One club with a bid on a player, as
 * `GET /api/league-teams/{id}/league-players/{playerId}/bidders` lists it. It says who bid and
 * when, never the terms.
 *
 * Mirrors `LeaguePlayerBidderDto` on the backend.
 */
export interface LeaguePlayerBidderDto {
  /**
   * The identifier of the bid, from the transfers or the loans table according to `isLoan`, so
   * `isLoan` with `id` tells bids apart.
   */
  id: number

  /** Whether the bid is a loan bid; `false` for a transfer bid. */
  isLoan: boolean

  /** Where the bid stands: pending, or accepted for a deal agreed but not completed yet. */
  status: TransferStatus

  /** The identifier of the bidding club's league team. */
  leagueTeamId: number

  /** The name of the bidding club. */
  teamName: string

  /** The URL of the bidding club's crest, or `null` when it has none. */
  teamLogoUrl: string | null

  /** The name of the bidding club's current manager, or `null` when it has none. */
  managerName: string | null

  /** The number of the season the bid was placed in, within its league. */
  seasonNumber: number

  /** When the bid was placed, as an ISO 8601 UTC timestamp. */
  createdAt: string
}
