import type { ReactNode } from 'react'

import type { BidFieldMessage } from '../../types'

/** What `BidField` is handed. */
export interface BidFieldProps {
  /** The id of the control the label names. */
  id: string

  /** The words on the label. */
  label: string

  /**
   * The words that follow the label for screen readers and never show, naming the unit the
   * control's number is in, or `undefined` for a control with no unit.
   */
  unitName?: string

  /** The line under the control, or `null` when there is none. */
  message: BidFieldMessage | null

  /** The id of that line, or `null` when there is none. */
  messageId: string | null

  /** The control. */
  children: ReactNode
}
