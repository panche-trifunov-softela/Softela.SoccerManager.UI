import {
  BID_TYPE_TABS_LABEL,
  LOAN_BID_TAB_ID,
  LOAN_BID_TAB_LABEL,
  TRANSFER_BID_TAB_ID,
  TRANSFER_BID_TAB_LABEL,
} from '../../constants'
import { Tabs } from '../Tabs'

import { CurrentBids } from './components/CurrentBids'
import { LoanBidForm } from './components/LoanBidForm'
import { TransferBidForm } from './components/TransferBidForm'
import { useBidsPanel } from './useBidsPanel'

import type { BidsPanelProps } from './types'

/**
 * The bids a club can place for a player registered at another club: a strip that switches between
 * a transfer bid form and a loan bid form, and under it the clubs that have a bid on the player.
 *
 * - The current bids show under either form, and are read again once a bid went through.
 *
 * @param props The bidding club, the player, and the player's name and weekly wage.
 * @returns The rendered strip and the form of the chosen kind of bid, then the current bids.
 */
export function BidsPanel({ leagueTeamId, playerId, playerName, wage }: BidsPanelProps) {
  const { currentBids, onSent } = useBidsPanel(leagueTeamId, playerId)

  return (
    <>
      <Tabs
        label={BID_TYPE_TABS_LABEL}
        variant="segmented"
        tabs={[
          {
            id: TRANSFER_BID_TAB_ID,
            label: TRANSFER_BID_TAB_LABEL,
            panel: (
              <TransferBidForm
                leagueTeamId={leagueTeamId}
                playerId={playerId}
                playerName={playerName}
                onSent={onSent}
              />
            ),
          },
          {
            id: LOAN_BID_TAB_ID,
            label: LOAN_BID_TAB_LABEL,
            panel: (
              <LoanBidForm
                leagueTeamId={leagueTeamId}
                playerId={playerId}
                playerName={playerName}
                wage={wage}
                onSent={onSent}
              />
            ),
          },
        ]}
      />

      <CurrentBids {...currentBids} />
    </>
  )
}
