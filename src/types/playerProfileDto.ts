import type { PlayerProfilePositionDto } from './playerProfilePositionDto'

/**
 * A player as the profile panel shows them when no club is selected, as
 * `GET /api/players/{id}/profile` returns it: the player's own record, with their real-life club,
 * national team, main position and current rating.
 *
 * Mirrors `PlayerProfileDto` on the backend. The date of birth arrives as `yyyy-MM-dd`.
 */
export interface PlayerProfileDto {
  /** The identifier of the player. */
  id: number

  /** The name of the player. */
  name: string

  /** The URL of the player's photo, or `null` when they have none. */
  imageUrl: string | null

  /** The player's date of birth, as `yyyy-MM-dd`. */
  dateOfBirth: string

  /** The identifier of the player's real-life club, or `null` when the player has none. */
  teamId: number | null

  /** The name of that club, or `null` when the player has none. */
  teamName: string | null

  /** The URL of that club's crest, or `null` when it has none or the player has no club. */
  teamLogoUrl: string | null

  /** The identifier of the player's national team, or `null` when the player has none. */
  nationalTeamId: number | null

  /** The name of that national team, or `null` when the player has none. */
  nationalTeamName: string | null

  /**
   * The URL of that national team's crest, or `null` when it has none or the player has no national
   * team.
   */
  nationalTeamLogoUrl: string | null

  /** The identifier of the player's main position, or `0` when they have none. */
  positionId: number

  /** The full name of the player's main position, empty when they have none. */
  positionName: string

  /** The short name of that position, for example `CB`, empty when they have none. */
  positionShortName: string

  /** The player's current rating, or `null` when they have none. */
  rating: number | null

  /** The player's market value, in euros. */
  value: number

  /** The player's wage, in euros. */
  wage: number

  /** Every position the player can play, the main one first. */
  positions: PlayerProfilePositionDto[]
}
