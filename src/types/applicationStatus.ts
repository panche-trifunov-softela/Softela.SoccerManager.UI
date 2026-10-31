/**
 * Where a manager's application to manage a club stands.
 *
 * Mirrors the `ApplicationStatus` enum on the backend, which the API sends as its
 * number:
 *
 * - `1`: Pending
 * - `2`: Accepted
 * - `3`: Rejected
 */
export type ApplicationStatus = 1 | 2 | 3
