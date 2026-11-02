import { SlotMarker } from '../SlotMarker'

import { BENCH_TITLE } from './constants'

import styles from './Bench.module.scss'

import type { BenchProps } from './types'

/**
 * The reserve slots under the pitch: a titled grid of markers, laid out by breakpoint.
 *
 * - Below md: four to a row.
 * - From md up to lg: all eight in one row.
 * - From lg: four to a row again.
 *
 * @param props The reserve slots, whether the board is locked, and what to call on a tap.
 * @returns The rendered bench.
 */
export function Bench({ slots, isLocked, onSlotTap }: BenchProps) {
  return (
    <section aria-label={BENCH_TITLE} className="card card-padded d-flex flex-column g-16">
      <h2 className="label h6">{BENCH_TITLE}</h2>

      <ul className={styles.slots}>
        {slots.map((slot) => (
          <li key={slot.slotNumber}>
            <SlotMarker slot={slot} isLocked={isLocked} onTap={onSlotTap} />
          </li>
        ))}
      </ul>
    </section>
  )
}
