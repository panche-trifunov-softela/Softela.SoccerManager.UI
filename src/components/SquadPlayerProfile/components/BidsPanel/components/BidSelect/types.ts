import type { BidSelectField, BidSelectOption } from '../../types'

/** What `BidSelect` is handed. */
export interface BidSelectProps {
  /** The select's id, choice, line and handler. */
  field: BidSelectField

  /** The choices, in order. */
  options: BidSelectOption[]
}
