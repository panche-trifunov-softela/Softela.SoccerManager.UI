/** The longest search the API accepts; it answers a longer one with a 400. */
export const SEARCH_TERM_MAX_LENGTH = 100

/** The lowest ratings the rating select offers, each shown as "N+". */
export const MIN_RATING_OPTIONS: readonly number[] = [90, 85, 80, 75, 70, 60]

/**
 * What a toast falls back to, and what shows under the selects, when the lists the filters offer
 * could not be read.
 */
export const FILTERS_LOAD_FAILED_MESSAGE = 'Filters could not be loaded.'
