import { SearchForm } from '@/components/SearchForm'

import { SEARCH_TERM_MAX_LENGTH } from './constants'
import { useLeagueSearchForm } from './useLeagueSearchForm'

import styles from './LeagueSearchForm.module.scss'

import type { LeagueSearchFormProps } from './types'

/**
 * The league search: a name to look for, and a hint on what the list holds.
 *
 * @param props What to call when a search is submitted.
 * @returns The rendered search card.
 */
export function LeagueSearchForm({ onSearch }: LeagueSearchFormProps) {
  const { hintId } = useLeagueSearchForm()

  return (
    <div className={`card card-padded ${styles.container}`}>
      <SearchForm
        className={styles.form}
        placeholder="Search game worlds by name"
        buttonLabel="Search game worlds"
        maxLength={SEARCH_TERM_MAX_LENGTH}
        describedBy={hintId}
        onSearch={onSearch}
      />

      <p id={hintId} className={`text-12 ${styles.hint}`}>
        Search game worlds by name. Up to 10 are listed, newest first. Game worlds
        where you already manage a club are left out.
      </p>
    </div>
  )
}
