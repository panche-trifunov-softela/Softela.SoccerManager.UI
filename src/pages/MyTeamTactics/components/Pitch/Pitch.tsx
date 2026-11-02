import { SlotMarker } from '../SlotMarker'

import { PITCH_LABEL, STARTERS_LIST_LABEL, UNPLACED_SLOTS_LABEL } from './constants'

import styles from './Pitch.module.scss'

import type { PitchProps } from './types'

/**
 * The starting eleven drawn on a pitch with the keeper's goal at the top.
 *
 * - A slot with coordinates is placed by them: `left` and `top` are percentages of the field
 *   inside the markings, set inline because a slot's place is data.
 * - A slot without coordinates, from a formation not placed yet, is drawn in a row under the
 *   pitch instead of at a corner.
 * - The pitch's markings are decorative and hidden from assistive technology.
 *
 * @param props The starting slots, whether the board is locked, and what to call on a tap.
 * @returns The rendered pitch.
 */
export function Pitch({ slots, isLocked, onSlotTap }: PitchProps) {
  const placed = slots.filter((slot) => slot.screenX !== null && slot.screenY !== null)

  const unplaced = slots.filter((slot) => slot.screenX === null || slot.screenY === null)

  return (
    <section aria-label={PITCH_LABEL} className="d-flex flex-column g-12">
      <div className={styles.pitch}>
        <div className={styles.markings} aria-hidden="true">
          <span className={styles.halfway} />

          <span className={styles.circle} />

          <span className={`${styles.area} ${styles.penaltyTop}`} />

          <span className={`${styles.area} ${styles.goalTop}`} />

          <span className={`${styles.area} ${styles.penaltyBottom}`} />

          <span className={`${styles.area} ${styles.goalBottom}`} />
        </div>

        <ol className={styles.field} aria-label={STARTERS_LIST_LABEL}>
          {placed.map((slot) => (
            <li
              key={slot.slotNumber}
              className={styles.spot}
              style={{ left: `${slot.screenX}%`, top: `${slot.screenY}%` }}
            >
              <SlotMarker slot={slot} isLocked={isLocked} onTap={onSlotTap} />
            </li>
          ))}
        </ol>
      </div>

      {unplaced.length > 0 ? (
        <div className="d-flex flex-column align-items-center g-8">
          <p className="label text-10">{UNPLACED_SLOTS_LABEL}</p>

          <ul className={styles.unplaced}>
            {unplaced.map((slot) => (
              <li key={slot.slotNumber}>
                <SlotMarker slot={slot} isLocked={isLocked} onTap={onSlotTap} />
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  )
}
