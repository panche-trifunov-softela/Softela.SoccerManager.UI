import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from './VoteButtons.module.scss'

import type { VoteButtonsProps } from './types'

/**
 * The reader's vote on one player's current rating: a green up arrow and a red down arrow. Both
 * buttons take their state from `vote` alone.
 *
 * - With no vote, both buttons are plain and take a click.
 * - With a vote, its button is pressed and drawn with a thick border, and the other one is
 *   disabled.
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
        aria-disabled={vote === 'down'}
        onClick={() => {
          onVote('up')
        }}
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </button>

      <button
        type="button"
        className={`btn btn--sm btn--square decline focus-ring ${styles.button}`}
        aria-label={`Down vote ${playerName}`}
        aria-pressed={vote === 'down'}
        aria-disabled={vote === 'up'}
        onClick={() => {
          onVote('down')
        }}
      >
        <FontAwesomeIcon icon={faArrowDown} />
      </button>
    </div>
  )
}
