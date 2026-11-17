import { toFieldClass } from '../../utils'

import type { BidSelectProps } from './types'

/**
 * A select for one choice of a bid form, as tall as a text field.
 *
 * @param props The field to show and the options to offer.
 * @returns The rendered select, with each option marked disabled when it cannot be chosen.
 */
export function BidSelect({ field, options }: BidSelectProps) {
  return (
    <select
      id={field.id}
      className={toFieldClass(field.isInvalid)}
      value={field.value}
      aria-invalid={field.isInvalid || undefined}
      aria-describedby={field.messageId ?? undefined}
      onChange={field.onChange}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value} disabled={option.isDisabled}>
          {option.label}
        </option>
      ))}
    </select>
  )
}
