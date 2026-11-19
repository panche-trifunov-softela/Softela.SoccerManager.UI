import { ClubBids } from '@/components/ClubBids'

/**
 * The loan bids of one team the signed-in user manages, placed and received: the pending ones
 * first, then the completed ones.
 *
 * @returns The rendered page.
 */
export function MyTeamMarketLoanBids() {
  return <ClubBids kind="loan" />
}
