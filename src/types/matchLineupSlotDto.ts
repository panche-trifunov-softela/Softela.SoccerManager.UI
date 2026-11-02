/**
 * One slot of a club's lineup for a match, filled or empty, as the lineup endpoints return it.
 *
 * Mirrors `MatchLineupSlotDto` on the backend.
 */
export interface MatchLineupSlotDto {
  /** The number of the slot, from 1 to 19: 1 to 11 are the starters and 12 to 19 the reserves. */
  slotNumber: number

  /** The identifier of the position the slot asks for, or `null` for a reserve slot. */
  positionId: number | null

  /** The name of the slot's position, or `null` for a reserve slot. */
  positionName: string | null

  /** The short name of the slot's position, for example `CB`, or `null` for a reserve slot. */
  positionShortName: string | null

  /**
   * How far across the pitch the slot sits, from 0 (the team's left touchline) to 100 (its right),
   * or `null` for a reserve slot and for a starter slot that has not been placed yet.
   */
  pitchX: number | null

  /**
   * How far up the pitch the slot sits, from 0 (the team's own goal line) to 100 (the opponent's),
   * or `null` for a reserve slot and for a starter slot that has not been placed yet.
   */
  pitchY: number | null

  /** The identifier of the player in the slot, or `null` when the slot is empty. */
  playerId: number | null

  /**
   * The identifier of the player position rating the slot uses, or `null` when the slot is empty.
   */
  playerPositionId: number | null

  /**
   * The identifier of the position of the rating the slot uses, which may differ from the position
   * the slot asks for, or `null` when the slot is empty.
   */
  playedPositionId: number | null

  /** The player's condition when the row was written, or `null` when the slot is empty. */
  conditionOnMatch: number | null

  /**
   * The quality of the used rating when the row was written, or `null` when the slot is empty.
   */
  qualityAtPositionOnMatch: number | null

  /**
   * Whether the player was suspended when the row was written, or `null` when the slot is empty.
   */
  isSuspended: boolean | null
}
