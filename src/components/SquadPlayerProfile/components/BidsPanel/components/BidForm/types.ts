import type { ReactNode, SubmitEventHandler } from 'react'

/** What `BidForm` is handed. */
export interface BidFormProps {
  /** The words on the submit button. */
  submitLabel: string

  /** Whether a bid is being sent, which makes the button say so and ignore presses. */
  isPending: boolean

  /** Called when the form is submitted. */
  onSubmit: SubmitEventHandler<HTMLFormElement>

  /** The form's fields, each a label and its control as two grid items. */
  children: ReactNode
}
