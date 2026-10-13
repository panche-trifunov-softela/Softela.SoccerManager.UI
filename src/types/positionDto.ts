import type { PositionArea } from './positionArea'
import type { PositionSide } from './positionSide'

/**
 * A position as the API returns it.
 *
 * Mirrors `PositionDto` on the backend. The two timestamps arrive as UTC ISO
 * strings.
 */
export interface PositionDto {
  /** The identifier of the position. */
  id: number

  /** The name of the position. */
  name: string

  /** The area of the pitch the position occupies. */
  area: PositionArea

  /** The side of the pitch the position occupies. */
  side: PositionSide

  /** When the position was created, as a UTC ISO string. */
  createdAt: string

  /** When it was last modified, as a UTC ISO string. */
  modifiedAt: string
}
