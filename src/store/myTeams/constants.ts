import type { MyTeamsRead } from '@/types/myTeamsRead'

/** The store holds the clubs run right now, not tenures already ended. */
export const CURRENT_ONLY = true

/**
 * What a failed read says when the API gave no reason, and the line the view keeps where the
 * clubs would be.
 */
export const MY_TEAMS_LOAD_FAILED_MESSAGE = 'Your clubs could not be loaded.'

/** What the store holds before the first read settles, and again while a failed read is retried. */
export const LOADING: MyTeamsRead = {
  teams: [],
  isLoading: true,
  error: null,
}
