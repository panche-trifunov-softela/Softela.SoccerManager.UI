/**
 * One player of a search result, with the team, national team and position
 * names for display.
 *
 * Mirrors an item of `GET /api/players/search`. The date of birth arrives as
 * `yyyy-MM-dd`.
 */
export interface PlayerSearchItemDto {
  /** The identifier of the player. */
  id: number

  /** The name of the player. */
  name: string

  /** The player's date of birth, as `yyyy-MM-dd`. */
  dateOfBirth: string

  /** The player's rating. */
  rating: number

  /** The player's market value. */
  value: number

  /** The player's wage. */
  wage: number

  /** The player's image, or `null` when there is none. */
  imageUrl: string | null

  /** The identifier of the player's team, or `null` when the player has none. */
  teamId: number | null

  /** The name of that team, or `null` when the player has none. */
  teamName: string | null

  /** The identifier of the player's national team, or `null` when the player has none. */
  nationalTeamId: number | null

  /** The name of that national team, or `null` when the player has none. */
  nationalTeamName: string | null

  /** The identifier of the player's main position, or `null` when the player has none. */
  positionId: number | null

  /** The name of that position, or `null` when the player has none. */
  positionName: string | null
}
