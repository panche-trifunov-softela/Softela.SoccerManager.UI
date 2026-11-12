import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { CLOSE_LABEL } from './constants'
import { useOffCanvasHost } from './useOffCanvasHost'

import styles from './OffCanvasHost.module.scss'

import type { OffCanvasHostProps } from './types'

/**
 * Draws the page and, over it, the app-wide right off-canvas panel.
 *
 * @param props The page the panel opens over.
 * @returns The page, the backdrop and the panel.
 */
export function OffCanvasHost({ children }: OffCanvasHostProps) {
  const { panel, isOpen, isWide, titleId, panelRef, onClose, onKeyDown, onTransitionEnd } =
    useOffCanvasHost()

  const panelClass = [
    styles.panel,
    isWide ? styles['panel--wide'] : null,
    isOpen ? styles['panel--open'] : null,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <>
      <div inert={isOpen}>{children}</div>

      <div
        aria-hidden="true"
        className={isOpen ? `${styles.backdrop} ${styles['backdrop--open']}` : styles.backdrop}
        onClick={onClose}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        inert={!isOpen}
        className={panelClass}
        onKeyDown={onKeyDown}
        onTransitionEnd={onTransitionEnd}
      >
        {panel && (
          <>
            <div className={`d-flex align-items-center justify-content-between g-20 ${styles.header}`}>
              <h2 id={titleId} className={styles.title}>
                {panel.title}
              </h2>

              <button type="button" className="close-btn focus-ring" aria-label={CLOSE_LABEL} onClick={onClose}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>

            <div key={panel.id} className={styles.body}>
              {panel.content}
            </div>
          </>
        )}
      </div>
    </>
  )
}
