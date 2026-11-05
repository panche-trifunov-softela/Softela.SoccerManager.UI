import type { PositionFit } from '../../types'

/** Names the pitch section for assistive technology. */
export const PITCH_LABEL = 'Pitch'

/** Names the list of starting slots for assistive technology. */
export const STARTERS_LIST_LABEL = 'Starting lineup'

/** Says why some starter slots are drawn under the pitch instead of on it. */
export const UNPLACED_SLOTS_LABEL = 'Not placed on the pitch yet'

/** Names the legend for assistive technology. */
export const LEGEND_LABEL = 'What the ring colours mean'

/** The fits the legend explains, best first. */
export const LEGEND_FITS: readonly PositionFit[] = ['good', 'ok', 'poor']
