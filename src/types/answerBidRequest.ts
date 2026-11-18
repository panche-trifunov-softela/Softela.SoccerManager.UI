import type { TransferStatus } from './transferStatus'

/**
 * The body of `PUT /api/league-teams/{id}/league-players/{playerId}/transfer-bids/{bidId}` and of
 * `PUT /api/league-teams/{id}/league-players/{playerId}/loan-bids/{bidId}`. It answers one pending
 * bid on a player of the club in the route, by accepting or rejecting it.
 */
export interface AnswerBidRequest {
  /** `2` accepts the bid and `3` rejects it; the API refuses any other value. */
  status: TransferStatus
}
