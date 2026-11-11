import { SIDEBAR_COLLAPSED_STORAGE_KEY } from '../constants'

/**
 * Remembers on this device whether the sidebar is collapsed.
 *
 * A write that throws (storage blocked or full) is ignored, so the choice then
 * lasts only until the page reloads.
 *
 * @param isCollapsed Whether the sidebar is now collapsed.
 * @returns Nothing.
 */
export function writeCollapsed(isCollapsed: boolean): void {
  try {
    localStorage.setItem(SIDEBAR_COLLAPSED_STORAGE_KEY, String(isCollapsed))
  } catch {
    // Storage is unavailable: the choice lasts for this visit only.
  }
}
