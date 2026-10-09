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
  const { draft, hintId, onDraftChange, onSubmit } = useLeagueSearchForm(onSearch)

  return (
    <div className={`card card-padded ${styles.container}`}>
      <form role="search" className={`d-flex g-8 ${styles.form}`} onSubmit={onSubmit}>
        <input
          type="search"
          className={`field ${styles.input}`}
          value={draft}
          onChange={onDraftChange}
          maxLength={SEARCH_TERM_MAX_LENGTH}
          placeholder="Search game worlds by name"
          aria-label="Search game worlds by name"
          aria-describedby={hintId}
        />

        <button
          type="submit"
          className={`btn focus-ring ${styles.submit}`}
          aria-label="Search game worlds"
        >
          <i className="icon-search" aria-hidden="true" />
        </button>
      </form>

      <p id={hintId} className={`text-12 ${styles.hint}`}>
        Search game worlds by name. Up to 10 are listed, newest first. Game worlds
        where you already manage a club are left out.
      </p>
    </div>
  )
}
