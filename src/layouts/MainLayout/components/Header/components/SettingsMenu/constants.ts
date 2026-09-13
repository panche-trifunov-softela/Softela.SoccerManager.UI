import { ROUTES } from '@/constants/routes'

import type { SettingsMenuItem } from './types'

/** The entries the settings menu lists, in display order. */
export const SETTINGS_MENU_ITEMS: readonly SettingsMenuItem[] = [
  { id: 'profile', label: 'Profile', path: ROUTES.profile },
  { id: 'settings', label: 'Settings', path: ROUTES.settings },
]
