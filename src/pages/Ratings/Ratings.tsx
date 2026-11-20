import { PlayerFilters } from '@/components/PlayerFilters'
import { PlayersTable } from '@/components/PlayersTable'

import { VoteButtons } from './components/VoteButtons'
import { useRatings } from './useRatings'

import styles from './Ratings.module.scss'

/**
 * The players and their ratings, searched, filtered, sorted and paged by the
 * API, with buttons that vote on each rating.
 *
 * @returns The rendered page.
 */
export function Ratings() {
  const { query, search, filter, table, voteButtonsFor } = useRatings()

  return (
    <div className="d-flex flex-column g-20">
      <h1 className="h3">Ratings</h1>

      <PlayerFilters query={query} onSearch={search} onFilter={filter} />

      <PlayersTable
        {...table}
        actions={{
          label: 'Vote',
          className: styles.vote,
          render: (row) => <VoteButtons {...voteButtonsFor(row)} />,
        }}
      />
    </div>
  )
}
