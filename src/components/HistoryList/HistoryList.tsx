import { ClubLogo } from '@/components/ClubLogo'
import { PlayerPhoto } from '@/components/PlayerPhoto'

import styles from './HistoryList.module.scss'

import type { HistoryListProps } from './types'

/**
 * A list of history or bid rows.
 *
 * - A row has a title over a smaller line, and optionally a second line, a crest, a player's
 *   photo, a value with a note, and actions on a line of their own. Its title can open what it
 *   names.
 * - Below md a row is stacked, each part on a line across the whole row: the crest, the photo
 *   and the title, then the smaller line, the value with its note, the second line and the
 *   actions. A part a row lacks leaves no gap.
 * - From md a row is columns: the crest and the photo, the text, and the value over the note at
 *   the end, with the actions on a line under the text and the value.
 *
 * @param props The rows, every text already written, what draws a row's actions and what a click
 * on a title opens.
 * @returns The rendered list.
 */
export function HistoryList({ items, renderActions, onTitleClick }: HistoryListProps) {
  return (
    <ul className={styles.list}>
      {items.map((item) => {
        const actions = renderActions === undefined ? null : renderActions(item.key)

        return (
          <li
            key={item.key}
            className={item.hasCrest ? styles.row : `${styles.row} ${styles.plain}`}
          >
            {item.hasCrest && (
              <div className={styles.images}>
                <ClubLogo logoUrl={item.logoUrl} size="md" />

                {item.photoUrl !== undefined && <PlayerPhoto imageUrl={item.photoUrl} />}
              </div>
            )}

            <div className={styles.text}>
              {onTitleClick === undefined ? (
                <p className={styles.title}>{item.title}</p>
              ) : (
                <button
                  type="button"
                  className={`${styles.title} ${styles.titleButton} focus-ring`}
                  aria-haspopup="dialog"
                  onClick={() => onTitleClick(item.key)}
                >
                  {item.title}
                </button>
              )}

              <p className={`${styles.meta} text-12`}>{item.meta}</p>

              {item.detail !== null && <p className={`${styles.detail} text-12`}>{item.detail}</p>}
            </div>

            <div className={styles.end}>
              {item.value !== null && <p className={styles.value}>{item.value}</p>}

              {item.note !== null && <p className={`${styles.note} text-12`}>{item.note}</p>}
            </div>

            {actions !== null && actions !== undefined && actions !== false && (
              <div className={styles.actions}>{actions}</div>
            )}
          </li>
        )
      })}
    </ul>
  )
}
