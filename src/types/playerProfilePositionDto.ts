/**
 * One position a player can play, with where it sits on a pitch, as the player profile reads
 * return it.
 *
 * Mirrors `PlayerProfilePositionDto` on the backend. The positions arrive ordered by quality,
 * highest first, so the main position is first.
 */
export interface PlayerProfilePositionDto {
  /** The identifier of the position. */
  positionId: number

  /** The full name of the position. */
  name: string

  /** The short name of the position, for example `CB`. */
  shortName: string

  /** Whether this is the player's main position. */
  isMain: boolean

  /**
   * Where the position sits across the pitch, from 0 (the own left touchline) to 100, or `null`
   * when no formation uses it.
   */
  pitchX: number | null

  /**
   * Where the position sits along the pitch, from 0 (the own goal line) to 100, or `null` when no
   * formation uses it.
   */
  pitchY: number | null
}
