import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from './SortableHeader.module.scss'

import type { SortableHeaderProps } from './types'

/**
 * A column heading that sorts the table: clicking it sorts by the column, and
 * the sorted column shows which way it runs.
 *
 * @param props The heading, what it sorts by, the sort now in force, and what
 * to call on a click.
 * @returns The rendered heading cell.
 */
export function SortableHeader({
  label,
  sortBy,
  activeSortBy,
  sortDescending,
  className,
  onSort,
}: SortableHeaderProps) {
  const active = sortBy === activeSortBy

  const ariaSort = active ? (sortDescending ? 'descending' : 'ascending') : undefined

  const arrow = sortDescending ? faChevronDown : faChevronUp

  return (
    <th
      scope="col"
      className={className === undefined ? 'label h6' : `label h6 ${className}`}
      aria-sort={ariaSort}
    >
      <button
        type="button"
        className={`focus-ring ${styles.button}`}
        onClick={() => {
          onSort(sortBy)
        }}
      >
        {label}

        {active && <FontAwesomeIcon icon={arrow} />}
      </button>
    </th>
  )
}
