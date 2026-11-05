import {
  PITCH_BOTTOM_MARGIN,
  PITCH_FAR_WIDTH_RATIO,
  PITCH_SIDE_MARGIN,
  PITCH_TOP_MARGIN,
} from '../constants'

import { toScreenX } from './toScreenX'

import type { ScreenPoint } from '../types'

/**
 * Turns a point on the pitch into a point on the board, drawn in perspective with the team's own
 * goal line at the far end.
 *
 * Flow:
 *
 * 1. The depth down the pitch gives the scale at that depth: the far goal line is drawn at
 *    `PITCH_FAR_WIDTH_RATIO` of the near one's width.
 * 2. The scale narrows the point towards the middle, and sets how far down it sits. Depth is not
 *    linear, so straight lines on the pitch stay straight on the board.
 * 3. The margins fit the result into the board.
 *
 * @param pitchX How far across the pitch the point sits, from 0 (the team's left) to 100. Values
 * outside 0 to 100 give the grass beyond the lines.
 * @param pitchY How far up the pitch the point sits, from 0 (the team's own goal line) to 100.
 * Values outside 0 to 100 give the grass beyond the lines.
 * @returns Where to draw the point, in percent of the board.
 */
export function toScreenPoint(pitchX: number, pitchY: number): ScreenPoint {
  const across = toScreenX(pitchX) / 100

  const depth = pitchY / 100

  const scale = 1 / (1 + (1 / PITCH_FAR_WIDTH_RATIO - 1) * (1 - depth))

  const x = 0.5 + (across - 0.5) * scale

  const y = (scale - PITCH_FAR_WIDTH_RATIO) / (1 - PITCH_FAR_WIDTH_RATIO)

  return {
    x: (PITCH_SIDE_MARGIN + x * (1 - 2 * PITCH_SIDE_MARGIN)) * 100,
    y: (PITCH_TOP_MARGIN + y * (1 - PITCH_TOP_MARGIN - PITCH_BOTTOM_MARGIN)) * 100,
  }
}
