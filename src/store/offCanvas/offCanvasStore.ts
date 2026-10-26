import { createStore } from '@/store/createStore'

import type { OffCanvas } from '@/types/offCanvas'
import type { OffCanvasOptions } from '@/types/offCanvasOptions'
import type { ReadableStore } from '@/types/readableStore'

/** The panel that is open, or `null` when there is none. */
const store = createStore<OffCanvas | null>(null)

/** The id the next panel receives; it only ever grows. */
let nextId = 1

/**
 * The panel's subscription surface, shaped for `useSyncExternalStore`.
 */
export const offCanvasStore: ReadableStore<OffCanvas | null> = store

/**
 * The calls that open and close the off-canvas panel. They are plain functions
 * that read no React state. Only one panel is open at a time: a new one
 * replaces the one before it.
 */
export const offCanvas = {
  /**
   * Opens a panel, replacing any panel already open. The replacement gets a new
   * id, so its content mounts afresh.
   *
   * @param options The panel's title and content.
   * @returns The id of the panel that was opened.
   */
  open(options: OffCanvasOptions): number {
    const id = nextId++

    store.set({ id, ...options })

    return id
  },

  /**
   * Closes the open panel. With an id, it closes only the panel with that id, so
   * a caller holding the id of a panel that was since replaced cannot close the
   * newer one.
   *
   * @param id The id of the panel to close; omit it to close whichever is open.
   * @returns Nothing.
   */
  close(id?: number): void {
    const current = store.getSnapshot()

    if (current === null || (id !== undefined && current.id !== id)) return

    store.set(null)
  },
}
