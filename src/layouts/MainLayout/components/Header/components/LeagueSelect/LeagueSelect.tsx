import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { HeaderDropdown } from '../HeaderDropdown'

import { useLeagueSelect } from './useLeagueSelect'

/**
 * Lets the user switch between the league teams they manage. Renders nothing while there is
 * none to list: the clubs are still loading, the read failed, or the user manages no club.
 *
 * @returns The rendered selector, or `null` when there is nothing to select.
 */
export function LeagueSelect() {
  const { selected, items, select } = useLeagueSelect()

  if (selected === null) return null

  return (
    <HeaderDropdown
      role="listbox"
      collapsible
      trigger={
        <>
          <span>{selected.label}</span>
          <FontAwesomeIcon icon={faChevronDown} />
        </>
      }
      items={items}
      selectedId={selected.id}
      onSelect={select}
    />
  )
}
