import type { LeagueTeamTransferBidDto } from './leagueTeamTransferBidDto'

/**
 * A club's transfer bids, placed and received, as `GET /api/league-teams/{id}/transfer-bids`
 * returns them.
 *
 * Mirrors `LeagueTeamTransferBidsDto` on the backend.
 */
export interface LeagueTeamTransferBidsDto {
  /** The bids nobody has answered yet, newest first. */
  pending: LeagueTeamTransferBidDto[]

  /** The bids whose deal is agreed or carried out, newest first. */
  completed: LeagueTeamTransferBidDto[]
}
