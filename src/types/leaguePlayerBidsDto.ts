import type { LeaguePlayerLoanBidDto } from './leaguePlayerLoanBidDto'
import type { LeaguePlayerTransferBidDto } from './leaguePlayerTransferBidDto'

/**
 * The pending bids for one player of a club, as
 * `GET /api/league-teams/{id}/league-players/{playerId}/bids` returns them, newest first.
 *
 * Mirrors `LeaguePlayerBidsDto` on the backend.
 */
export interface LeaguePlayerBidsDto {
  /** The pending transfer bids for the player, newest first. */
  transferBids: LeaguePlayerTransferBidDto[]

  /** The pending loan bids for the player, newest first. */
  loanBids: LeaguePlayerLoanBidDto[]
}
