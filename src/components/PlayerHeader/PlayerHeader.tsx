import { ClubLogo } from '@/components/ClubLogo'
import { NationalityLogo } from '@/components/NationalityLogo'
import { PlayerPhoto } from '@/components/PlayerPhoto'
import { MISSING } from '@/constants/missing'

import {
  BIRTH_LABEL,
  CONTRACT_LABEL,
  NATIONALITY_LABEL,
  POSITION_LABEL,
  RATING_LABEL,
  SQUAD_NUMBER_LABEL,
  VALUE_LABEL,
  WAGE_LABEL,
} from './constants'

import styles from './PlayerHeader.module.scss'

import type { PlayerHeaderProps } from './types'

/**
 * The top of a player's profile: their photo, their club's crest and name, and then their
 * nationality, date of birth with age, main position, rating, value and wage, with the contract and
 * the squad number when they are given.
 *
 * The player's name is not repeated: it is the panel's title.
 *
 * @param props The player's header, every text already written.
 * @returns The rendered header.
 */
export function PlayerHeader({
  imageUrl,
  clubName,
  clubLogoUrl,
  nationality,
  nationalityLogoUrl,
  birth,
  position,
  rating,
  value,
  wage,
  contract,
  squadNumber,
}: PlayerHeaderProps) {
  return (
    <div className="d-flex flex-column g-16">
      <div className="d-flex align-items-center g-16">
        <PlayerPhoto imageUrl={imageUrl} size="lg" />

        {clubName !== null && (
          <div className={`d-flex align-items-center g-12 ${styles.club}`}>
            <ClubLogo logoUrl={clubLogoUrl} size="md" />

            <p className="h4 text-overflow">{clubName}</p>
          </div>
        )}
      </div>

      <dl className={styles.facts}>
        {nationality !== null && (
          <>
            <dt className="label h6">{NATIONALITY_LABEL}</dt>

            <dd className={styles.nationality}>
              <NationalityLogo name={nationality} logoUrl={nationalityLogoUrl} />

              <span className="text-12">{nationality}</span>
            </dd>
          </>
        )}

        <dt className="label h6">{BIRTH_LABEL}</dt>

        <dd className="text-12">{birth}</dd>

        <dt className="label h6">{POSITION_LABEL}</dt>

        <dd className="text-12">{position}</dd>

        <dt className="label h6">{RATING_LABEL}</dt>

        <dd className="text-12">
          {rating === null ? MISSING : <span className="tag tag--accent tag--inline">{rating}</span>}
        </dd>

        <dt className="label h6">{VALUE_LABEL}</dt>

        <dd className="text-12">{value}</dd>

        <dt className="label h6">{WAGE_LABEL}</dt>

        <dd className="text-12">{wage}</dd>

        {contract !== null && (
          <>
            <dt className="label h6">{CONTRACT_LABEL}</dt>

            <dd className="text-12">{contract}</dd>
          </>
        )}

        {squadNumber !== null && (
          <>
            <dt className="label h6">{SQUAD_NUMBER_LABEL}</dt>

            <dd className="text-12">{squadNumber}</dd>
          </>
        )}
      </dl>
    </div>
  )
}
