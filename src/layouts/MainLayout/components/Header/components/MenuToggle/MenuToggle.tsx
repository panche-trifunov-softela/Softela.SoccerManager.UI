import styles from './MenuToggle.module.scss'

import type { MenuToggleProps } from './types'

/**
 * Burger button that opens and closes the header menu.
 *
 * @param props The component's props.
 * @returns The rendered button.
 */
export function MenuToggle({ isOpen, controls, onToggle, ref }: MenuToggleProps) {
  return (
    <button
      ref={ref}
      type="button"
      className={isOpen ? `focus-ring ${styles.burger} ${styles.active}` : `focus-ring ${styles.burger}`}
      aria-expanded={isOpen}
      aria-controls={controls}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      onClick={onToggle}
    >
      <span className={styles.burger_line} />
      <span className={styles.burger_line} />
      <span className={styles.burger_line} />
    </button>
  )
}
