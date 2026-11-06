import type { PositionFit } from '@/types/positionFit'

/** Names the pitch section for assistive technology. */
export const PITCH_LABEL = 'Pitch'

/** Names the list of starting slots for assistive technology. */
export const STARTERS_LIST_LABEL = 'Starting lineup'

/** Says why some starter slots are drawn under the pitch instead of on it. */
export const UNPLACED_SLOTS_LABEL = 'Not placed on the pitch yet'

/** Names the legend for assistive technology. */
export const LEGEND_LABEL = 'What the ring colours mean'

/**
 * The fits the legend explains, best first. A main position reads the same as another natural one,
 * so the legend names only the natural one.
 */
export const LEGEND_FITS: readonly PositionFit[] = [2, 3, 4]
