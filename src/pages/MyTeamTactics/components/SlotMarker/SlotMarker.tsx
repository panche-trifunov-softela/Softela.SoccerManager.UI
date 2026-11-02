import { faBan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { PlayerPhoto } from '@/components/PlayerPhoto'
import { MISSING } from '@/constants/missing'

import styles from './SlotMarker.module.scss'

import type { SlotMarkerProps } from './types'

/**
 * One slot of the lineup as a button: the player's photo with their rating, and their name under
 * it, or a dashed circle naming the position when the slot is empty.
 *
 * - A selected slot has a ring round its photo or circle.
 * - A suspended player carries a red badge with a ban sign on the photo's corner, hidden from
 *   assistive technology because the button's label already says the player is suspended.
 * - While the board is locked the button is `aria-disabled` rather than `disabled`, so it keeps
 *   focus; the editor refuses the tap.
 *
 * @param props The slot to draw, whether the board is locked, and what to call on a tap.
 * @returns The rendered marker.
 */
export function SlotMarker({ slot, isLocked, onTap }: SlotMarkerProps) {
  const { player } = slot

  return (
    <button
      type="button"
      className={`${styles.marker} focus-ring ${slot.isSelected ? styles.selected : ''}`}
      aria-pressed={slot.isSelected}
      aria-label={slot.ariaLabel}
      aria-disabled={isLocked}
      onClick={() => {
        onTap(slot.slotNumber)
      }}
    >
      {player === null ? (
        <span className={styles.empty}>{slot.label}</span>
      ) : (
        <>
          <span className={styles.photo}>
            <PlayerPhoto imageUrl={player.imageUrl} />

            <span className={`tag tag--accent tag--inline ${styles.rating}`}>
              {player.rating ?? MISSING}
            </span>

            {player.isSuspended ? (
              <span className={styles.suspended} aria-hidden="true">
                <FontAwesomeIcon icon={faBan} />
              </span>
            ) : null}
          </span>

          <span className={`text-overflow ${styles.name}`}>{player.markerName}</span>
        </>
      )}
    </button>
  )
}
