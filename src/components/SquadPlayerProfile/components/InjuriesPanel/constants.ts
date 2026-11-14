import type { PlayerTabReadMessages } from '../../types'

/** What the injury read says while it loads and, when no better reason is known, when it fails. */
export const INJURIES_READ_MESSAGES: PlayerTabReadMessages = {
  loading: 'Loading the injury history…',
  failed: 'The injury history could not be loaded.',
}

/** What shows when the player has no injuries in the club's league. */
export const NO_INJURIES_MESSAGE = 'No injuries recorded.'
