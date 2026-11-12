import type { PlayerProfileTarget } from './playerProfileTarget'

/** What `useOpenPlayerProfile` gives a page. */
export interface PlayerProfileOpener {
  /** Opens the player's profile in the wide side panel. */
  openPlayerProfile: (target: PlayerProfileTarget) => void
}
