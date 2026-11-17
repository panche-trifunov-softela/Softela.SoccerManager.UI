import type { SwapAddField, SwapRowField } from '../../types'

/** What `SwapPlayers` is handed. */
export interface SwapPlayersProps {
  /** The swap player rows, in order. */
  rows: SwapRowField[]

  /** The button that adds a row, or `null` when no more rows can be added. */
  add: SwapAddField | null

  /** What a screen reader is told after a row was removed; empty before one was. */
  removedMessage: string
}
