import type { OffCanvasOptions } from './offCanvasOptions'

/**
 * The open off-canvas panel, as its store holds it. Each opening carries its own
 * id so a close aimed at a panel that was since replaced can be told apart.
 */
export interface OffCanvas extends OffCanvasOptions {
  /** Monotonically increasing; a newer opening always has a larger id. */
  id: number
}
