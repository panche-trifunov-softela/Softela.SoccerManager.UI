import {
  CONCERN_LABEL,
  CONDITION_LABEL,
  MORALE_LABEL,
  STATUS_LABEL,
  SUSPENDED_NOTE,
} from './constants'

import styles from './PlayerStatus.module.scss'

import type { PlayerStatusProps } from './types'

/**
 * A player's condition and morale in a club's game world, with what worries them when something
 * does, and a note when they are suspended.
 *
 * - The morale is a pill coloured by its level, and its words always stay.
 * - The suspension is an outlined note with words, so it never rests on colour alone.
 *
 * @param props The player's state, every text already written.
 * @returns The rendered section.
 */
export function PlayerStatus({
  condition,
  morale,
  moraleLevel,
  concern,
  isSuspended,
}: PlayerStatusProps) {
  return (
    <section aria-label={STATUS_LABEL} className={`border-top ${styles.status}`}>
      <dl className={styles.facts}>
        <dt className="label h6">{CONDITION_LABEL}</dt>

        <dd className="text-12">{condition}</dd>

        <dt className="label h6">{MORALE_LABEL}</dt>

        <dd className={`text-12 text-600 level-pill level-pill--${moraleLevel} ${styles.morale}`}>
          {morale}
        </dd>

        {concern !== null && (
          <>
            <dt className="label h6">{CONCERN_LABEL}</dt>

            <dd className="text-12">{concern}</dd>
          </>
        )}
      </dl>

      {isSuspended && <p className={styles.suspended}>{SUSPENDED_NOTE}</p>}
    </section>
  )
}
