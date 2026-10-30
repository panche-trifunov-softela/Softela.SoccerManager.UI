import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { HeaderDropdown } from '../HeaderDropdown'

import { TRIGGER_LABEL } from './constants'
import { useLeagueSelect } from './useLeagueSelect'

/**
 * The club switcher: lists the league teams the user manages, highlights the one the URL names
 * and opens another club's squad page when one is picked. Its trigger always reads "Teams".
 * Renders nothing while there is no club to list: the clubs are still loading, the read failed,
 * or the user manages none.
 *
 * @returns The rendered switcher, or `null` when there is nothing to choose from.
 */
export function LeagueSelect() {
  const { selected, items, select } = useLeagueSelect()

  if (items.length === 0) return null

  return (
    <HeaderDropdown
      role="listbox"
      collapsible
      trigger={
        <>
          <span>{TRIGGER_LABEL}</span>
          <FontAwesomeIcon icon={faChevronDown} />
        </>
      }
      items={items}
      selectedId={selected?.id}
      onSelect={select}
    />
  )
}
