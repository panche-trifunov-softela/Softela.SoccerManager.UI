import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { DISMISS_LABEL, TOAST_ICONS, TOAST_LABELS } from './constants'
import { useToastHost } from './useToastHost'

import styles from './ToastHost.module.scss'

/**
 * Shows the app-wide toast, one at a time, in the corner of the page.
 *
 * Both live regions stay in the page from the first render and are empty
 * while nothing shows, because a screen reader announces text added to a
 * region that already exists and often skips one that arrives with its text.
 *
 * @returns The toast container with its two live regions.
 */
export function ToastHost() {
  const { toast, toastRef, onPointerEnter, onPointerLeave, onFocus, onBlur, onKeyDown, onDismiss } =
    useToastHost()

  const element = toast ? (
    <div
      key={toast.id}
      ref={toastRef}
      className={`${styles.toast} ${styles[`toast--${toast.kind}`]}`}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
    >
      <FontAwesomeIcon icon={TOAST_ICONS[toast.kind]} className={styles.icon} />

      <p className={styles.message}>
        <span className="visually-hidden">{TOAST_LABELS[toast.kind]} </span>
        {toast.message}
      </p>

      <button
        type="button"
        className={`btn btn--outlined btn--square focus-ring ${styles.dismiss}`}
        aria-label={DISMISS_LABEL}
        onClick={onDismiss}
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </div>
  ) : null

  return (
    <div className={styles.container}>
      <div role="status">{toast?.kind === 'success' ? element : null}</div>

      <div role="alert">{toast?.kind === 'error' ? element : null}</div>
    </div>
  )
}
