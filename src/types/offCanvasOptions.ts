import type { ReactNode } from 'react'

/** What a caller supplies to open the off-canvas panel. */
export interface OffCanvasOptions {
  /** The panel's heading and the dialog's accessible name. */
  title: string

  /** What the panel shows below its heading. */
  content: ReactNode
}
