/**
 * Works out which option an arrow key moves to.
 *
 * @param index The index of the active option in the one flat order, or -1 when none is.
 * @param count How many options there are, over every group.
 * @param step 1 for ArrowDown, -1 for ArrowUp.
 * @returns The index to move to, wrapping at both ends: from no option, down goes to the first
 * and up to the last; -1 when there are no options.
 */
export function toNextOptionIndex(index: number, count: number, step: 1 | -1): number {
  if (count === 0) return -1

  if (index < 0) return step === 1 ? 0 : count - 1

  return (index + step + count) % count
}
