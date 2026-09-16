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
      trigger={
        <>
          <span>{selected.name}</span>
          <i className="icon-chevron-down" aria-hidden="true" />
        </>
      }
      items={items}
      selectedId={selected.id}
      onSelect={select}
    />
  )
}
