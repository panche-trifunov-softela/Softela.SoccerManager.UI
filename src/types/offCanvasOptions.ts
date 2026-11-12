import type { ReactNode } from 'react'

import type { OffCanvasSize } from './offCanvasSize'

/** What a caller supplies to open the off-canvas panel. */
export interface OffCanvasOptions {
  /** The panel's heading and the dialog's accessible name. */
  title: string

  /** What the panel shows below its heading. */
  content: ReactNode

  /**
   * The panel's width: `wide` is the wide panel, 720px from md up and full width below md. Omitted
   * means the default 414px panel.
   */
  size?: OffCanvasSize
}
