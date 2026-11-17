/** What `useManagedClubRoute` resolves the address's club to. */
export type ManagedClubRouteStatus = 'pending' | 'allowed' | 'failed' | 'redirect'

/** What `useManagedClubRoute` hands the view. */
export interface ManagedClubRouteState {
  /** Whether the child routes show, wait, report a failure, or give way to another page. */
  status: ManagedClubRouteStatus

  /** Where a `redirect` goes: the Squad page of the address's club; empty for any other status. */
  redirectTo: string

  /** The fixed line a `failed` status shows in place of the child routes, or `null` otherwise. */
  error: string | null
}
