import type { PlayerSortBy } from '@/types/playerSortBy'

/** What `SortableHeader` is handed. */
export interface SortableHeaderProps {
  /** The column's heading. */
  label: string

  /** What clicking the heading sorts by. */
  sortBy: PlayerSortBy

  /** What the table is sorted by now; the heading is marked when it is this one. */
  activeSortBy: PlayerSortBy

  /** Whether the sort runs from the highest value down. */
  sortDescending: boolean

  /** Extra classes for the heading cell, such as the column's width. */
  className?: string

  /** Called with `sortBy` when the heading is clicked. */
  onSort: (sortBy: PlayerSortBy) => void
}
