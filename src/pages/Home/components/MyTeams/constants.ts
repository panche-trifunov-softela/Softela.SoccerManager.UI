import type { MyTeamsRead } from './types'

/** The grid shows the clubs run right now, not tenures already ended. */
export const CURRENT_ONLY = true

/** What the hook holds before the first read settles. */
export const LOADING: MyTeamsRead = {
  teams: [],
  isLoading: true,
  error: null,
}
