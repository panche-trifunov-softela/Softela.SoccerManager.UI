import type { InjuryScale } from './injuryScale'

/**
 * One injury of a player, as
 * `GET /api/league-teams/{id}/league-players/{playerId}/injuries` returns it.
 *
 * Mirrors `PlayerInjuryDto` on the backend. Both dates are ISO date-times in UTC.
 */
export interface PlayerInjuryDto {
  /** The identifier of the injury. */
  id: number

  /** What the injury was, as shown to the user. */
  name: string

  /** When the injury began, as an ISO date-time in UTC. */
  injuryStartDate: string

  /** When the player is, or was, fit again, as an ISO date-time in UTC. */
  injuryEndDate: string

  /** How serious the injury is. */
  injuryScale: InjuryScale
}
