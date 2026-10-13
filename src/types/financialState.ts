/**
 * A team's overall financial standing.
 *
 * Mirrors the `FinancialState` enum on the backend, which the API sends as its
 * number:
 *
 * - `1`: VeryPoor
 * - `2`: Poor
 * - `3`: Average
 * - `4`: Rich
 * - `5`: VeryRich
 */
export type FinancialState = 1 | 2 | 3 | 4 | 5
