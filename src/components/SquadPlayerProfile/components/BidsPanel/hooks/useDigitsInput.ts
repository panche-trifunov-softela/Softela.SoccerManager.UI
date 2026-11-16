import { useState } from 'react'

import { toDigits, toGroupedDigits } from '../utils'

import type { DigitsInputState } from '../types'

/**
 * Keeps the text of one numeric input.
 *
 * - Only the digits typed are kept, with no leading zeros, and no more of them than `maxDigits`.
 * - The digits show grouped with the reader's locale while the input is not focused, and raw
 *   while it is, so editing never fights the separators.
 *
 * @param maxDigits The most digits the input takes.
 * @returns The digits, what the input shows, its handlers, and what empties it.
 */
export function useDigitsInput(maxDigits: number): DigitsInputState {
  const [digits, setDigits] = useState('')

  const [isFocused, setIsFocused] = useState(false)

  const onChange: DigitsInputState['onChange'] = (event) => {
    setDigits(toDigits(event.target.value, maxDigits))
  }

  const onFocus = () => {
    setIsFocused(true)
  }

  const onBlur = () => {
    setIsFocused(false)
  }

  const clear = () => {
    setDigits('')
  }

  return {
    digits,
    value: isFocused ? digits : toGroupedDigits(digits),
    onChange,
    onFocus,
    onBlur,
    clear,
  }
}
