import {
  faCircleDown as faCircleDownRegular,
  faCircleUp as faCircleUpRegular,
} from '@fortawesome/free-regular-svg-icons'
import { faCircleDown, faCircleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from './VoteButtons.module.scss'

import type { VoteButtonsProps } from './types'

/**
 * The reader's vote on one player's current rating: a green up arrow and a red down arrow. Both
 * buttons take their state from `vote` alone, and both always take a click.
 *
 * - With no vote, both buttons are plain, with an outlined arrow.
 * - With a vote, its button is pressed, with a filled arrow on a darker button, and the other one
 *   keeps its outlined arrow.
 *
 * @param props The player, the reader's vote on them, and what to call when they vote.
 * @returns The two buttons.
 */
export function VoteButtons({ playerName, vote, onVote }: VoteButtonsProps) {
  return (
    <div className={styles.buttons}>
      <button
        type="button"
        className={`btn btn--sm btn--square accept focus-ring ${styles.button}`}
        aria-label={`Up vote ${playerName}`}
        aria-pressed={vote === 'up'}
        onClick={() => {
          onVote('up')
        }}
      >
        <FontAwesomeIcon icon={vote === 'up' ? faCircleUp : faCircleUpRegular} />
      </button>

      <button
        type="button"
        className={`btn btn--sm btn--square decline focus-ring ${styles.button}`}
        aria-label={`Down vote ${playerName}`}
        aria-pressed={vote === 'down'}
        onClick={() => {
          onVote('down')
        }}
      >
        <FontAwesomeIcon icon={vote === 'down' ? faCircleDown : faCircleDownRegular} />
      </button>
    </div>
  )
}
