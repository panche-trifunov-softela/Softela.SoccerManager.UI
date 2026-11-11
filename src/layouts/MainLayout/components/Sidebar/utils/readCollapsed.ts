import { SIDEBAR_COLLAPSED_STORAGE_KEY } from '../constants'

/**
 * Reads whether the sidebar was left collapsed on this device.
 *
 * Reading storage throws when the browser blocks it, and the sidebar then
 * simply starts open.
 *
 * @returns `true` when the sidebar was collapsed, otherwise `false`.
 */
export function readCollapsed(): boolean {
  try {
    return localStorage.getItem(SIDEBAR_COLLAPSED_STORAGE_KEY) === 'true'
  } catch {
    return false
  }
}
