/**
 * Writes the label of a swap player row.
 *
 * @param position The row's place among the rows, counting from 1.
 * @returns The label, such as `Swap player 2`.
 */
export function toSwapLabel(position: number): string {
  return `Swap player ${position}`
}
