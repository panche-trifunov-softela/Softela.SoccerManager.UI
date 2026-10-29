/**
 * How a player feels about their situation at their club.
 *
 * Mirrors the `Morale` enum on the backend, which the API sends as its
 * number:
 *
 * - `1`: VeryConcerned
 * - `2`: Concerned
 * - `3`: Normal
 * - `4`: Satisfied
 * - `5`: VerySatisfied
 */
export type Morale = 1 | 2 | 3 | 4 | 5
