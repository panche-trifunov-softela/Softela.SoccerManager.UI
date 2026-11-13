import type { PlayerTransferSwapPlayerDto } from './playerTransferSwapPlayerDto'

/**
 * One agreed move of a player into a club of a league, as
 * `GET /api/league-teams/{id}/league-players/{playerId}/transfers` returns it: a transfer, a swap
 * or a loan.
 *
 * Mirrors `PlayerTransferDto` on the backend.
 */
export interface PlayerTransferDto {
  /**
   * The identifier of the transfer or loan. A transfer and a loan can share an id, so it only
   * tells rows apart together with `isLoan`.
   */
  id: number

  /** Whether the move is a loan. */
  isLoan: boolean

  /** The identifier of the league team the player joined. */
  leagueTeamId: number

  /** The name of that club. */
  teamName: string

  /** The URL of that club's crest, or `null` when it has none. */
  teamLogoUrl: string | null

  /** The identifier of the season of the move. */
  seasonId: number

  /** The number of that season within its league. */
  seasonNumber: number

  /** The transfer fee or loan fee in euros; `0` when none was paid. */
  fee: number

  /** The identifier of the player the deal is about: the one sold or loaned. */
  playerId: number

  /** The name of that player. */
  playerName: string

  /** The players of the buying club who went to the selling club in the deal; empty otherwise. */
  swapPlayers: PlayerTransferSwapPlayerDto[]
}
