import { SearchForm } from '@/components/SearchForm'

import { MIN_RATING_OPTIONS, SEARCH_TERM_MAX_LENGTH } from './constants'
import { usePlayerFilters } from './usePlayerFilters'

import styles from './PlayerFilters.module.scss'

import type { PlayerFiltersProps } from './types'

/**
 * The filter bar: a name search, and selects for position, club, nationality
 * and the lowest rating.
 *
 * @param props The search being shown, and what to call when the search or a
 * filter changes.
 * @returns The rendered filter card.
 */
export function PlayerFilters({ query, onSearch, onFilter }: PlayerFiltersProps) {
  const {
    positions,
    teams,
    nationalTeams,
    error,
    onPositionChange,
    onTeamChange,
    onNationalTeamChange,
    onMinRatingChange,
  } = usePlayerFilters(onFilter)

  return (
    <div className="card card-padded d-flex flex-column g-16">
      <SearchForm
        placeholder="Search players by name"
        buttonLabel="Search players"
        maxLength={SEARCH_TERM_MAX_LENGTH}
        onSearch={onSearch}
      />

      <div className={styles.selects}>
        <label className="d-flex flex-column g-6">
          <span className="label text-10">Position</span>

          <select className="field" value={query.positionId ?? ''} onChange={onPositionChange}>
            <option value="">All positions</option>

            {positions.map((position) => (
              <option key={position.id} value={position.id}>
                {position.name}
              </option>
            ))}
          </select>
        </label>

        <label className="d-flex flex-column g-6">
          <span className="label text-10">Club</span>

          <select className="field" value={query.teamId ?? ''} onChange={onTeamChange}>
            <option value="">All clubs</option>

            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        </label>

        <label className="d-flex flex-column g-6">
          <span className="label text-10">Nationality</span>

          <select
            className="field"
            value={query.nationalTeamId ?? ''}
            onChange={onNationalTeamChange}
          >
            <option value="">All nationalities</option>

            {nationalTeams.map((nationalTeam) => (
              <option key={nationalTeam.id} value={nationalTeam.id}>
                {nationalTeam.name}
              </option>
            ))}
          </select>
        </label>

        <label className="d-flex flex-column g-6">
          <span className="label text-10">Rating</span>

          <select className="field" value={query.minRating ?? ''} onChange={onMinRatingChange}>
            <option value="">Any rating</option>

            {MIN_RATING_OPTIONS.map((rating) => (
              <option key={rating} value={rating}>
                {`${rating}+`}
              </option>
            ))}
          </select>
        </label>
      </div>

      {error !== null && <p className="label text-10">{error}</p>}
    </div>
  )
}
