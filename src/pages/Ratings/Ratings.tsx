import { PlayerFilters } from './components/PlayerFilters'
import { PlayersTable } from './components/PlayersTable'
import { useRatings } from './useRatings'

/**
 * The players and their ratings, searched, filtered, sorted and paged by the
 * API.
 *
 * @returns The rendered page.
 */
export function Ratings() {
  const { query, search, filter, sort, goToPage } = useRatings()

  return (
    <div className="d-flex flex-column g-20">
      <h1 className="h3">Ratings</h1>

      <PlayerFilters query={query} onSearch={search} onFilter={filter} />

      <PlayersTable query={query} onSort={sort} onPageChange={goToPage} />
    </div>
  )
}
