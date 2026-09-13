import { HeaderDropdown } from '../HeaderDropdown'

import { useGameworldSelect } from './useGameworldSelect'

/**
 * Lets the user switch which gameworld the app plays in.
 *
 * @returns The rendered selector.
 */
export function GameworldSelect() {
  const { selected, items, select } = useGameworldSelect()

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
