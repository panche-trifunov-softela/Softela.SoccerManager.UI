import { PLACING_BID_LABEL } from '../../constants'

import styles from './BidForm.module.scss'

import type { BidFormProps } from './types'

/**
 * A form frame: a two-column grid that holds a form's fields, label column first, and under them
 * a submit button on the controls' left edge.
 *
 * @param props The submit button's label, whether a bid is being sent, what to call on submit, and
 * the form's fields.
 * @returns The rendered form. While a bid is being sent the button says so and ignores presses.
 */
export function BidForm({ submitLabel, isPending, onSubmit, children }: BidFormProps) {
  return (
    <form className={styles.form} noValidate onSubmit={onSubmit}>
      {children}

      <div className={`d-flex ${styles.actions}`}>
        <button type="submit" className="btn focus-ring" aria-disabled={isPending}>
          {isPending ? PLACING_BID_LABEL : submitLabel}
        </button>
      </div>
    </form>
  )
}
