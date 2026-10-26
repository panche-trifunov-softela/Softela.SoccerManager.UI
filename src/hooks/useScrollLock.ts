import { useEffect } from 'react'

import { NO_SCROLL_CLASS } from '@/constants/scrollLock'

/** How many overlays hold the scroll lock right now. */
let holders = 0

/**
 * Locks the page scroll while an overlay is open. Every overlay holds its own
 * share of one lock, so the page stays locked until the last open overlay lets
 * go. Setup and cleanup are balanced, so StrictMode's double run nets to zero.
 *
 * @param isLocked Whether this overlay is open and wants the page locked.
 * @returns Nothing.
 */
export function useScrollLock(isLocked: boolean): void {
  useEffect(() => {
    if (!isLocked) return

    holders += 1

    document.documentElement.classList.add(NO_SCROLL_CLASS)

    return () => {
      holders -= 1

      if (holders === 0) document.documentElement.classList.remove(NO_SCROLL_CLASS)
    }
  }, [isLocked])
}
