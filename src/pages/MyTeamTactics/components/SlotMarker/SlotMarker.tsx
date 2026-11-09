import { faArrowUp, faBan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { PlayerPhoto } from '@/components/PlayerPhoto'
import { MISSING } from '@/constants/missing'

import styles from './SlotMarker.module.scss'

import type { SlotMarkerProps } from './types'

/**
 * One slot of the lineup as a button: the player's round photo in a ring coloured by how well they
 * suit the slot's position, with their rating and their name, or a dashed circle naming the
 * position when the slot is empty.
 *
 * - A bench slot has no fit, so its ring has no colour.
 * - A selected marker has a white ring and an inverted name.
 * - A suspended player has a greyed photo and a ban sign, hidden from assistive technology because
 *   the button's label already says the player is suspended.
 * - A player a substitution moves has a chip on the bottom-right of the photo, an arrow up for one
 *   coming on and down for one going off, hidden from assistive technology because the button's
 *   label already says it.
 * - A marker that cannot be tapped is `disabled` and faded.
 * - While the board is locked the button is `aria-disabled` rather than `disabled`, so it keeps
 *   focus; the editor refuses the tap.
 *
 * @param props The slot to draw, whether the board is locked, and what to call on a tap.
 * @returns The rendered marker.
 */
export function SlotMarker({ slot, isLocked, onTap }: SlotMarkerProps) {
  const { player } = slot

  const fitClass = slot.fit === null ? '' : styles[`fit--${slot.fit}`]

  const photoClass = player?.isSuspended ? styles['photo--suspended'] : ''

  return (
    <button
      type="button"
      className={`${styles.marker} focus-ring ${slot.isSelected ? styles.selected : ''}`}
      aria-pressed={slot.isSelected}
      aria-label={slot.ariaLabel}
      disabled={!slot.isSelectable}
      aria-disabled={isLocked}
      onClick={() => {
        onTap(slot.slotNumber)
      }}
    >
      {player === null ? (
        <span className={styles.empty}>{slot.label}</span>
      ) : (
        <>
          <span className={`${styles.disc} ${fitClass}`}>
            <span className={styles.ring}>
              <span className={`${styles.photo} ${photoClass}`}>
                <PlayerPhoto imageUrl={player.imageUrl} />
              </span>
            </span>

            <span className={`tag tag--inline ${styles.rating}`}>{player.rating ?? MISSING}</span>

            {player.isSuspended ? (
              <span className={styles.suspended} aria-hidden="true">
                <FontAwesomeIcon icon={faBan} />
              </span>
            ) : null}

            {slot.substitution === null ? null : (
              <span
                className={`${styles.substitution} ${styles[`substitution--${slot.substitution}`]}`}
                aria-hidden="true"
              >
                <FontAwesomeIcon icon={faArrowUp} />
              </span>
            )}
          </span>

          <span className={`text-overflow ${styles.name}`}>{player.markerName}</span>
        </>
      )}
    </button>
  )
}
