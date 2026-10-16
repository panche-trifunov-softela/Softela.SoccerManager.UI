import { faGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
      trigger={<FontAwesomeIcon icon={faGear} />}
      ariaLabel="Settings"
      items={items}
      onSelect={select}
    />
  )
}
