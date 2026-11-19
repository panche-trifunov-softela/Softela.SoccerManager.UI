import type { BidKind } from '@/types/bidKind'

/**
 * Names one bid so it can be told from every other in the panel. A transfer bid and a loan bid can
 * share an id, so the key carries the kind.
 *
 * @param kind Which kind of bid it is.
 * @param id The bid's id.
 * @returns The key, such as `transfer-6` or `loan-6`.
 */
export function toBidKey(kind: BidKind, id: number): string {
  return `${kind}-${id}`
}
