/**
 * Writes the accessible name of the button that removes a swap player row.
 *
 * @param position The row's place among the rows, counting from 1.
 * @returns The name, such as `Remove swap player 2`.
 */
export function toRemoveSwapLabel(position: number): string {
  return `Remove swap player ${position}`
}
