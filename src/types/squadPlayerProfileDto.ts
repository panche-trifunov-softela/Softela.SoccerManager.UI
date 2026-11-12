import type { PlayerProfilePositionDto } from './playerProfilePositionDto'

/**
 * A player as the profile panel shows them when a club is selected, as
 * `GET /api/league-teams/{id}/game-world/players/{playerId}` returns it: the player's registration
 * in that club's game world, which is the club's own or, failing that, one at another club of the
 * same league.
 *
 * Mirrors `SquadPlayerProfileDto` on the backend. The date of birth arrives as `yyyy-MM-dd`.
 */
export interface SquadPlayerProfileDto {
  /** The identifier of the registration. */
  id: number

  /** The identifier of the player. */
  playerId: number

  /** The identifier of the league team the player is registered at: the selected club or a rival. */
  leagueTeamId: number

  /** The name of that club. */
  teamName: string

  /** The URL of that club's crest, or `null` when it has none. */
  teamLogoUrl: string | null

  /** The name of the player. */
  name: string

  /** The URL of the player's photo, or `null` when they have none. */
  imageUrl: string | null

  /** The player's date of birth, as `yyyy-MM-dd`. */
  dateOfBirth: string

  /** The player's shirt number at that club, from 1 to 99. */
  squadNumber: number

  /** The identifier of the player's main position, or `0` when they have none. */
  positionId: number

  /** The full name of the player's main position, empty when they have none. */
  positionName: string

  /** The short name of that position, for example `CB`, empty when they have none. */
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

  /** The player's contract wage at that club, in euros per week. */
  wage: number

  /** How many seasons are left on the player's contract. */
  contractLength: number

  /** How the player feels about their situation at the club, as a number from 1 to 5. */
  morale: number

  /** That morale in words, for example `Very satisfied`. */
  moraleLabel: string

  /**
   * What worries the player, as a number: 1 playing time, 2 squad number, 3 contract length, 4 wage,
   * 5 transfer listed; or `null` when nothing does.
   */
  moraleConcern: number | null

  /** That concern in words, for example `Playing time`, or `null` when nothing worries the player. */
  moraleConcernLabel: string | null

  /** The player's condition, from 1 to 100. */
  condition: number

  /** Whether the player is suspended in the domestic competition. */
  isSuspended: boolean

  /** Every position the player can play, the main one first. */
  positions: PlayerProfilePositionDto[]
}
