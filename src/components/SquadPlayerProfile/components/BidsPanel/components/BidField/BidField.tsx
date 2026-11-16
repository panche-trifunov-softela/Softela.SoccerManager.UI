import styles from './BidField.module.scss'

import type { BidFieldProps } from './types'

/**
 * One field of a bid form, as two items of the form's grid: the label, then the control with the
 * line that goes under it.
 *
 * @param props The control's id, the label, the words that name the label's unit for screen
 * readers, the line under the control, that line's id, and the control.
 * @returns The rendered label and control cell. The unit's words are read after the label and
 * never shown.
 */
export function BidField({ id, label, unitName, message, messageId, children }: BidFieldProps) {
  return (
    <>
      <label htmlFor={id} className={`label text-10 ${styles.label}`}>
        {label}

        {unitName !== undefined && <span className="visually-hidden">{unitName}</span>}
      </label>

      <div className={`d-flex flex-column g-6 ${styles.control}`}>
        {children}

        {message !== null && (
          <p
            id={messageId ?? undefined}
            className={message.isError ? `text-12 ${styles.error}` : 'text-12'}
          >
            {message.text}
          </p>
        )}
      </div>
    </>
  )
}
