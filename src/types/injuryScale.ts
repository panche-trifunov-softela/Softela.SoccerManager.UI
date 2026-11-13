/**
 * How serious an injury is.
 *
 * Mirrors the `InjuryScale` enum on the backend, which the API sends as its
 * number:
 *
 * - `1`: Minor
 * - `2`: Moderate
 * - `3`: Serious
 */
export type InjuryScale = 1 | 2 | 3
