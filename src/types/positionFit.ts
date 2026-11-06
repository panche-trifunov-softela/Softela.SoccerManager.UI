/**
 * How well a player suits a position.
 *
 * Mirrors the `PositionFit` enum on the backend, which the API sends as its
 * number:
 *
 * - `1`: Main
 * - `2`: NaturalFit
 * - `3`: CanPlay
 * - `4`: PoorFit
 */
export type PositionFit = 1 | 2 | 3 | 4
