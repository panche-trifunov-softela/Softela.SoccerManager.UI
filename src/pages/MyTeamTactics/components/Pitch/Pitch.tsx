import { POSITION_FIT_LABELS } from '../../constants'
import { SlotMarker } from '../SlotMarker'

import { PitchDrawing } from './components/PitchDrawing'
import {
  LEGEND_FITS,
  LEGEND_LABEL,
  PITCH_LABEL,
  STARTERS_LIST_LABEL,
  UNPLACED_SLOTS_LABEL,
} from './constants'

import styles from './Pitch.module.scss'

import type { PitchProps } from './types'

/**
 * The starting eleven drawn on a pitch in perspective, with the keeper's goal at the far end.
 *
 * - A slot with coordinates is placed by them: `left` and `top` are percentages of the board and
 *   `width` is the room the slot's marker may take, set inline because a slot's place is data.
 * - A slot without coordinates, from a formation not placed yet, is drawn in a row under the
 *   pitch instead of at a corner.
 * - A legend under the pitch names the three ring colours.
 * - The pitch's drawing is decorative and hidden from assistive technology.
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
        <PitchDrawing />

        <ol className={styles.field} aria-label={STARTERS_LIST_LABEL}>
          {placed.map((slot) => (
            <li
              key={slot.slotNumber}
              className={`${styles.spot} ${slot.isSelected ? styles['spot--selected'] : ''}`}
              style={{
                left: `${slot.screenX}%`,
                top: `${slot.screenY}%`,
                width: `${slot.room}%`,
              }}
            >
              <SlotMarker slot={slot} isLocked={isLocked} onTap={onSlotTap} />
            </li>
          ))}
        </ol>
      </div>

      <ul className={styles.legend_list} aria-label={LEGEND_LABEL}>
        {LEGEND_FITS.map((fit) => (
          <li key={fit} className="legend">
            <span
              className={`legend_color ${styles.dot} ${styles[`dot--${fit}`]}`}
              aria-hidden="true"
            />

            {POSITION_FIT_LABELS[fit]}
          </li>
        ))}
      </ul>

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
