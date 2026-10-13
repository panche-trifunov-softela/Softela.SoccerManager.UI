/**
 * The area of the pitch a position occupies.
 *
 * Mirrors the `PositionArea` enum on the backend, which the API sends as its
 * number:
 *
 * - `1`: Attack
 * - `2`: Midfield
 * - `3`: Defence
 * - `4`: Goalkeeper
 */
export type PositionArea = 1 | 2 | 3 | 4
