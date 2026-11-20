/**
 * How a finished match ended for a club.
 *
 * Mirrors the `MatchOutcome` enum on the backend, which the API sends as its
 * number:
 *
 * - `1`: Win
 * - `2`: Draw
 * - `3`: Loss
 */
export type MatchOutcome = 1 | 2 | 3
