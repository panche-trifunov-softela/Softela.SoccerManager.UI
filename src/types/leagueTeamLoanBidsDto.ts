import type { LeagueTeamLoanBidDto } from './leagueTeamLoanBidDto'

/**
 * A club's loan bids, placed and received, as `GET /api/league-teams/{id}/loan-bids` returns them.
 *
 * Mirrors `LeagueTeamLoanBidsDto` on the backend.
 */
export interface LeagueTeamLoanBidsDto {
  /** The bids nobody has answered yet, newest first. */
  pending: LeagueTeamLoanBidDto[]

  /** The bids whose deal is agreed or carried out, newest first. */
  completed: LeagueTeamLoanBidDto[]
}
