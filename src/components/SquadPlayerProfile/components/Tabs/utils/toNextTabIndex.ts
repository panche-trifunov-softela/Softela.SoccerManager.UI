/**
 * Works out which tab a key moves to.
 *
 * @param key The key pressed, as `KeyboardEvent.key` spells it.
 * @param index The index of the tab the key was pressed on.
 * @param count How many tabs there are.
 * @returns The index of the tab to move to: the next one for ArrowRight and the previous one for
 * ArrowLeft, both wrapping, the first for Home and the last for End; `null` for any other key.
 */
export function toNextTabIndex(key: string, index: number, count: number): number | null {
  if (key === 'ArrowRight') return (index + 1) % count

  if (key === 'ArrowLeft') return (index - 1 + count) % count

  if (key === 'Home') return 0

  if (key === 'End') return count - 1

  return null
}
