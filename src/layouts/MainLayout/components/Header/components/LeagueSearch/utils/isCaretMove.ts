import { CARET_KEYS, VERTICAL_ARROW_KEYS } from '../constants'

import type { LeagueSearchKeyPress } from '../types'

/**
 * Tells whether a key press moves the caret in the input, which leaves no option active.
 *
 * - Home, End, Left and Right move it, with or without a modifier.
 * - Up and Down move it only with a modifier held (Alt, Ctrl, Meta or Shift), since a plain
 *   Up or Down walks the options instead.
 *
 * @param press The key pressed and which modifiers are held.
 * @returns `true` when the key moves the caret or extends the selection, so it is left to the
 * input.
 */
export function isCaretMove(press: LeagueSearchKeyPress): boolean {
  if (CARET_KEYS.includes(press.key)) return true

  const hasModifier = press.altKey || press.ctrlKey || press.metaKey || press.shiftKey

  return hasModifier && VERTICAL_ARROW_KEYS.includes(press.key)
}
