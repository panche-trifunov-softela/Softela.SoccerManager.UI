import { ClubLogo } from '@/components/ClubLogo'

import styles from './HistoryList.module.scss'

import type { HistoryListProps } from './types'

/**
 * A list of history or bid rows: each row has a title over a smaller line and optionally a second
 * one, optionally a crest at its start and optionally a value over a note at the right edge. A
 * row can also carry actions, drawn on a line of their own under its text and value, and its title
 * can open what it names.
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
            {item.hasCrest && <ClubLogo logoUrl={item.logoUrl} size="md" />}

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

              {item.detail !== null && <p className={`${styles.meta} text-12`}>{item.detail}</p>}
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
