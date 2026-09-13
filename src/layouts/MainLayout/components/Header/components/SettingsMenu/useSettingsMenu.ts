import { useCallback } from 'react'
import { useNavigate } from 'react-router'

import { SETTINGS_MENU_ITEMS } from './constants'

import type { SettingsMenuState } from './types'

/**
 * Navigates to the settings entry the user chooses.
 *
 * @returns The entries to show and a way to act on one.
 */
export function useSettingsMenu(): SettingsMenuState {
  const navigate = useNavigate()

  const select = useCallback(
    (id: string) => {
      const item = SETTINGS_MENU_ITEMS.find((entry) => entry.id === id)

      if (item) void navigate(item.path)
    },
    [navigate],
  )

  return { items: SETTINGS_MENU_ITEMS, select }
}
