/**
 * Writes how long a player's contract has to run.
 *
 * @param seasonsLeft The seasons left on the contract.
 * @returns The count and the unit, such as `1 season left` or `3 seasons left`.
 */
export function toContractText(seasonsLeft: number): string {
  return `${seasonsLeft} ${seasonsLeft === 1 ? 'season' : 'seasons'} left`
}
