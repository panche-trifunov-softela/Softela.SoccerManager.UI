import type {
  BidInputField,
  BidReadOnlyField,
} from '@/components/SquadPlayerProfile/components/BidsPanel/types'

import type { UnitInputAttributes } from '../types'

/**
 * Works out what an input needs from its field.
 *
 * @param field The field, which can be edited or only shows a value.
 * @returns A read-only input with no handlers for a field that only shows a value, else the
 * field's validity and handlers.
 */
export function toInputAttributes(field: BidInputField | BidReadOnlyField): UnitInputAttributes {
  if (!('onChange' in field)) return { isReadOnly: true, isInvalid: false }

  return {
    isReadOnly: false,
    isInvalid: field.isInvalid,
    onChange: field.onChange,
    onFocus: field.onFocus,
    onBlur: field.onBlur,
  }
}
