/**
 * Works out the id of a swap player row's select.
 *
 * @param baseId The id the form's ids start from.
 * @param position The row's place among the rows, counting from 1.
 * @returns The id, which follows the row's position and so changes when rows renumber.
 */
export function toSwapId(baseId: string, position: number): string {
  return `${baseId}-swap-${position}`
}
