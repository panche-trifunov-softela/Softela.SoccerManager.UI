import styles from './VoteButtons.module.scss'

import type { VoteButtonsProps } from './types'

/**
 * The reader's vote on one player's current rating: a green up arrow and a red down arrow.
 * Once the reader has voted, their vote stays at full strength while the other button dims.
 * While the vote is being sent, and once the reader has voted, neither button takes a click.
 *
 * @param props The player, the reader's vote on them, and what to call when they vote.
 * @returns The two buttons.
 */
export function VoteButtons({ playerName, vote, isLocked, onVote }: VoteButtonsProps) {
  return (
    <div className={styles.buttons}>
      <button
        type="button"
        className={`btn btn--sm btn--square accept focus-ring ${styles.button}`}
        aria-label={`Up vote ${playerName}`}
        aria-pressed={vote === 'up'}
        aria-disabled={isLocked}
        onClick={() => {
          onVote('up')
        }}
      >
        <i className="icon-arrow-up" aria-hidden="true" />
      </button>

      <button
        type="button"
        className={`btn btn--sm btn--square decline focus-ring ${styles.button}`}
        aria-label={`Down vote ${playerName}`}
        aria-pressed={vote === 'down'}
        aria-disabled={isLocked}
        onClick={() => {
          onVote('down')
        }}
      >
        <i className="icon-arrow-down" aria-hidden="true" />
      </button>
    </div>
  )
}
