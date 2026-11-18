import {
  BID_TYPE_TABS_LABEL,
  LOAN_BID_TAB_ID,
  LOAN_BID_TAB_LABEL,
  TRANSFER_BID_TAB_ID,
  TRANSFER_BID_TAB_LABEL,
} from '../../constants'
import { Tabs } from '../Tabs'

import { LoanBidForm } from './components/LoanBidForm'
import { TransferBidForm } from './components/TransferBidForm'

import type { BidsPanelProps } from './types'

/**
 * The bids a club can place for a player registered at another club: a strip that switches between
 * a transfer bid form and a loan bid form.
 *
 * @param props The bidding club, the player, and the player's name, value and weekly wage.
 * @returns The rendered strip and the form of the chosen kind of bid.
 */
export function BidsPanel({ leagueTeamId, playerId, playerName, value, wage }: BidsPanelProps) {
  return (
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
              value={value}
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
            />
          ),
        },
      ]}
    />
  )
}
