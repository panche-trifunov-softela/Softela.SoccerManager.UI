/**
 * A player in a club's squad, as `GET /api/league-teams/{id}/players` returns it, with their
 * current rating and main position.
 */
export interface LeagueTeamSquadPlayerDto {
  /** The identifier of the player. */
  id: number

  /** The name of the player. */
  name: string

  /** The player's current rating, or `null` when they have none. */
  rating: number | null

  /** The URL of the player's photo, or `null` when they have none. */
  imageUrl: string | null

  /** The identifier of the player's main position, or `null` when they have none. */
  positionId: number | null

  /** The full name of the player's main position, or `null` when they have none. */
  positionName: string | null
}
