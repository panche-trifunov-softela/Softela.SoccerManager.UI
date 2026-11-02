/**
 * Turns how far across the pitch a slot sits, in the team's own view, into how far across the
 * screen to draw it.
 *
 * The team attacks down the screen with its keeper at the top, so its left touchline is on the
 * screen's right, which is the true view from above.
 *
 * @param pitchX How far across the pitch the slot sits, from 0 (the team's left) to 100.
 * @returns How far across the screen to draw it, in percent.
 */
export function toScreenX(pitchX: number): number {
  return 100 - pitchX
}
