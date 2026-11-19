import { useEffect, useRef, useSyncExternalStore } from 'react'

import { offCanvasStore } from '@/store/offCanvas'

/**
 * Reads a page's list again when a side panel closes over it, since whatever the panel did, such
 * as answering a bid, may have changed what the list shows.
 *
 * - Any panel counts, and only a close does: a panel opening, or replacing another, reads nothing.
 *
 * @param read What reads the list again.
 * @returns Nothing.
 */
export function useReadOnPanelClose(read: () => void): void {
  const panel = useSyncExternalStore(offCanvasStore.subscribe, offCanvasStore.getSnapshot)

  const previous = useRef(panel)

  useEffect(() => {
    if (previous.current !== null && panel === null) read()

    previous.current = panel
  }, [panel, read])
}
