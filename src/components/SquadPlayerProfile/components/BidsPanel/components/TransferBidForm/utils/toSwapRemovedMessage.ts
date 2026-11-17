/**
 * Writes what a screen reader is told after a swap player row was removed.
 *
 * @param position The removed row's place among the rows when it was removed, counting from 1.
 * @returns The message; for the second row, `Swap player 2 removed.`
 */
export function toSwapRemovedMessage(position: number): string {
  return `Swap player ${position} removed.`
}
