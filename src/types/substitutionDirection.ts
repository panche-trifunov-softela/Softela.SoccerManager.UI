/**
 * How a substitution moves a player compared with the club's main lineup.
 *
 * Mirrors the `SubstitutionDirection` enum on the backend, which the API sends as its number:
 *
 * - `1`: ComingOn, a starter of the substitution who is not a main starter
 * - `2`: GoingOff, a main starter on the substitution's bench
 */
export type SubstitutionDirection = 1 | 2
