import type { BidInputField, BidReadOnlyField } from '../../types'

/** What `UnitInput` is handed. */
export interface UnitInputProps {
  /** The input's id, text and line; its handlers too when it can be edited. */
  field: BidInputField | BidReadOnlyField

  /** The unit drawn inside the field at its start, such as `€`. */
  unit: string

  /** What the input shows while it is empty, if anything. */
  placeholder?: string
}

/** What an input needs, whether its field can be edited or not. */
export interface UnitInputAttributes {
  /** Whether the input shows a value that cannot be edited. */
  isReadOnly: boolean

  /** Whether the input is not valid; never for one that cannot be edited. */
  isInvalid: boolean

  /** Keeps the digits in step with the input; `undefined` for one that cannot be edited. */
  onChange?: BidInputField['onChange']

  /** Shows the digits ungrouped; `undefined` for one that cannot be edited. */
  onFocus?: BidInputField['onFocus']

  /** Shows the digits grouped; `undefined` for one that cannot be edited. */
  onBlur?: BidInputField['onBlur']
}
