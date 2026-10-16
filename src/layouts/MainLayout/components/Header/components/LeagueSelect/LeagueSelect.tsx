import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { HeaderDropdown } from '../HeaderDropdown'

import { useLeagueSelect } from './useLeagueSelect'

/**
 * Lets the user switch which league the app plays in.
 *
 * @returns The rendered selector.
 */
export function LeagueSelect() {
  const { selected, items, select } = useLeagueSelect()

  return (
    <HeaderDropdown
      role="listbox"
      collapsible
      trigger={
        <>
          <span>{selected.name}</span>
          <FontAwesomeIcon icon={faChevronDown} />
        </>
      }
      items={items}
      selectedId={selected.id}
      onSelect={select}
    />
  )
}
