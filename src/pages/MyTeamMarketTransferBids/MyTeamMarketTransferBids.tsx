import { ClubBids } from '@/components/ClubBids'

/**
 * The transfer bids of one team the signed-in user manages, placed and received: the pending ones
 * first, then the completed ones.
 *
 * @returns The rendered page.
 */
export function MyTeamMarketTransferBids() {
  return <ClubBids kind="transfer" />
}
