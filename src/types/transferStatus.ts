/**
 * Where a transfer or loan bid stands.
 *
 * Mirrors the `TransferStatus` enum on the backend, which the API sends as its number:
 *
 * - `1`: Pending
 * - `2`: Accepted
 * - `3`: Rejected
 */
export type TransferStatus = 1 | 2 | 3
