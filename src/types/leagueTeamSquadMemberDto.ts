import type { Morale } from './morale'

/**
 * A player in a club's squad, as `GET /api/league-teams/{id}/squad` returns it to the club's
 * manager: the squad entry's contract, morale and condition in that game world, with the
 * player's current rating, main position and national team.
 *
 * The date of birth arrives as `yyyy-MM-dd`.
 */
export interface LeagueTeamSquadMemberDto {
  /** The identifier of the squad entry, one per row of the squad. */
  id: number

  /** The identifier of the player. */
  playerId: number

  /** The name of the player. */
  name: string

  /** The URL of the player's photo, or `null` when they have none. */
  imageUrl: string | null

  /** The player's date of birth, as `yyyy-MM-dd`. */
  dateOfBirth: string

  /** The player's shirt number in this squad, from 1 to 99. */
  squadNumber: number

  /** The identifier of the player's main position. */
  positionId: number

  /** The full name of the player's main position. */
  positionName: string

  /** The short name of that position, for example `CB`. */
  positionShortName: string

  /** The identifier of the player's national team, or `null` when the player has none. */
  nationalTeamId: number | null

  /** The name of that national team, or `null` when the player has none. */
  nationalTeamName: string | null

  /**
   * The URL of that national team's crest, or `null` when it has none or the player has no national
   * team.
   */
  nationalTeamLogoUrl: string | null

  /** The player's current rating, or `null` when they have none. */
  rating: number | null

  /** The player's transfer value in this game world, in euros. */
  value: number

  /** The player's contract wage at this club, in euros per week. */
  wage: number

  /** How the player feels about their situation at the club. */
  morale: Morale

  /** The player's condition, from 1 to 100. */
  condition: number
}
