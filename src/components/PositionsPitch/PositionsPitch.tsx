import styles from './PositionsPitch.module.scss'

import type { PositionsPitchProps } from './types'

/**
 * A flat pitch drawn upright with the player's own goal at the bottom, and a chip for each of
 * their positions that has a place on it.
 *
 * - The main position's chip is highlighted. Every chip shows the position's short name, and none
 *   is focusable.
 * - The drawing is one image to assistive technology, named by `label`.
 *
 * @param props The chips to draw and the drawing's accessible name.
 * @returns The rendered pitch.
 */
export function PositionsPitch({ chips, label }: PositionsPitchProps) {
  return (
    <div className={styles.pitch} role="img" aria-label={label}>
      <svg className={styles.drawing} viewBox="0 0 68 105" aria-hidden="true" focusable="false">
        <rect className={styles.line} x="1" y="1" width="66" height="103" />

        <line className={styles.line} x1="1" y1="52.5" x2="67" y2="52.5" />

        <circle className={styles.line} cx="34" cy="52.5" r="9.15" />

        <circle className={styles.dot} cx="34" cy="52.5" r="0.7" />

        <rect className={styles.line} x="13.84" y="1" width="40.32" height="16.5" />

        <rect className={styles.line} x="24.84" y="1" width="18.32" height="5.5" />

        <circle className={styles.dot} cx="34" cy="12" r="0.7" />

        <rect className={styles.line} x="13.84" y="87.5" width="40.32" height="16.5" />

        <rect className={styles.line} x="24.84" y="98.5" width="18.32" height="5.5" />

        <circle className={styles.dot} cx="34" cy="93" r="0.7" />
      </svg>

      {chips.map((chip) => (
        <span
          key={chip.positionId}
          className={chip.isMain ? `${styles.chip} ${styles['chip--main']}` : styles.chip}
          style={{ left: chip.left, top: chip.top }}
        >
          {chip.shortName}
        </span>
      ))}
    </div>
  )
}
