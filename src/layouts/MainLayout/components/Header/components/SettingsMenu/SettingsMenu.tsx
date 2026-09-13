import { HeaderDropdown } from '../HeaderDropdown'

import { useSettingsMenu } from './useSettingsMenu'

/**
 * Menu of settings-related actions for the signed-in user.
 *
 * @returns The rendered menu.
 */
export function SettingsMenu() {
  const { items, select } = useSettingsMenu()

  return (
    <HeaderDropdown
      role="menu"
      trigger={<i className="icon-gear-regular" aria-hidden="true" />}
      ariaLabel="Settings"
      items={items}
      onSelect={select}
    />
  )
}
