import { ClubLogo } from '@/components/ClubLogo'

import styles from './HistoryList.module.scss'

import type { HistoryListProps } from './types'

/**
 * A list of a player's history: each row has a title over a smaller line and optionally a second
 * one, optionally a crest at its start and optionally a value over a note at the right edge.
 *
 * @param props The rows, every text already written.
 * @returns The rendered list.
 */
export function HistoryList({ items }: HistoryListProps) {
  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <li key={item.key} className={item.hasCrest ? styles.row : `${styles.row} ${styles.plain}`}>
          {item.hasCrest && <ClubLogo logoUrl={item.logoUrl} size="md" />}

          <div className={styles.text}>
            <p className={styles.title}>{item.title}</p>

            <p className={`${styles.meta} text-12`}>{item.meta}</p>

            {item.detail !== null && <p className={`${styles.meta} text-12`}>{item.detail}</p>}
          </div>

          <div className={styles.end}>
            {item.value !== null && <p className={styles.value}>{item.value}</p>}

            {item.note !== null && <p className={`${styles.note} text-12`}>{item.note}</p>}
          </div>
        </li>
      ))}
    </ul>
  )
}
