import { getMyLeagueTeamManagers, toErrorMessage } from '@/services/api'
import { toast } from '@/store/toast'

import { CURRENT_ONLY, LOADING, MY_TEAMS_LOAD_FAILED_MESSAGE } from './constants'

import type { MyTeamsRead } from '@/types/myTeamsRead'

/** The latest read of the caller's clubs. It is replaced, never mutated, whenever it changes. */
let current: MyTeamsRead = LOADING

/** Whether a read is in flight or has already succeeded, so `load` has nothing to start. */
let isStarted = false

/** Everything to call when the read changes. */
const listeners = new Set<() => void>()

/**
 * Tells every subscriber the read changed.
 *
 * @returns Nothing.
 */
function emit(): void {
  listeners.forEach((listener) => listener())
}

/**
 * Makes a new read the current one.
 *
 * @param read The read to hold.
 * @returns Nothing.
 */
function settle(read: MyTeamsRead): void {
  current = read

  emit()
}

/**
 * The my-teams subscription surface, shaped for `useSyncExternalStore`.
 */
export const myTeamsStore = {
  /**
   * Registers a listener to call whenever the read changes.
   *
   * @param listener The function to call on a change.
   * @returns A function that removes the listener again.
   */
  subscribe(listener: () => void) {
    listeners.add(listener)

    return () => {
      listeners.delete(listener)
    }
  },

  /**
   * Reads the current read. The stored object itself is returned, never a copy, so repeated
   * reads between changes are identical.
   *
   * @returns The latest read of the caller's clubs.
   */
  getSnapshot() {
    return current
  },
}

/**
 * The call that fills the store. It is a plain function that reads no React state.
 */
export const myTeams = {
  /**
   * Starts reading the clubs the signed-in manager currently runs, once per page load.
   *
   * - Does nothing while a read is in flight or after one has succeeded, so every caller shares
   *   one request.
   * - A failed read raises an error toast with the reason and keeps the fixed line as the error;
   *   the next call retries it.
   *
   * @returns Nothing.
   */
  load(): void {
    if (isStarted) return

    isStarted = true

    // A retry after a failed read shows the loading state again, not the stale error line.
    if (current !== LOADING) settle(LOADING)

    void getMyLeagueTeamManagers(CURRENT_ONLY).then(
      (teams) => {
        settle({ teams, isLoading: false, error: null })
      },
      (cause: unknown) => {
        isStarted = false

        toast.error(toErrorMessage(cause, MY_TEAMS_LOAD_FAILED_MESSAGE))

        // The toast carries the reason; the read keeps only the fixed line in place of the clubs.
        settle({ teams: [], isLoading: false, error: MY_TEAMS_LOAD_FAILED_MESSAGE })
      },
    )
  },
}
