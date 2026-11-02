import { ClubLogo } from '@/components/ClubLogo'

import { NEXT_MATCH_LABEL } from './constants'

import styles from './NextMatchHeader.module.scss'

import type { NextMatchHeaderProps } from './types'

/**
 * The club's next match: the opponent's crest and name, whether it is at home or away, and when it
 * starts. The row wraps on a narrow screen.
 *
 * @param props The opponent, the venue and the kick-off, already written.
 * @returns The rendered header card.
 */
export function NextMatchHeader({
  opponentName,
  opponentLogoUrl,
  venueLabel,
  kickOff,
}: NextMatchHeaderProps) {
  return (
    <div className="card card-padded d-flex flex-wrap align-items-center g-16">
      <div className={`d-flex align-items-center g-12 ${styles.opponent}`}>
        <ClubLogo logoUrl={opponentLogoUrl} size="md" />

        <div className={styles.names}>
          <p className="label text-10">{NEXT_MATCH_LABEL}</p>

          <p className="h4 text-overflow">{opponentName}</p>
        </div>
      </div>

      <div className="d-flex flex-wrap g-12 text-12">
        <p>{venueLabel}</p>

        <p>{kickOff}</p>
      </div>
    </div>
  )
}
