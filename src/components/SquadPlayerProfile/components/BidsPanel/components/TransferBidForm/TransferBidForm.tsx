import { EURO_SIGN, IN_EUROS_LABEL, OPTIONAL_PLACEHOLDER } from '../../constants'
import { BidField } from '../BidField'
import { BidForm } from '../BidForm'
import { BidSelect } from '../BidSelect'
import { UnitInput } from '../UnitInput'

import { SwapPlayers } from './components/SwapPlayers'
import {
  BUYBACK_PERIOD_LABEL,
  BUYBACK_PERIOD_OPTIONS,
  BUYBACK_VALUE_LABEL,
  PLACE_TRANSFER_BID_LABEL,
  TRANSFER_FEE_LABEL,
} from './constants'
import { useTransferBidForm } from './useTransferBidForm'

import type { TransferBidFormProps } from './types'

/**
 * The form that places a transfer bid for a player: the fee offered, players of the bidding club
 * offered in swap, which the reader adds one row at a time, and optionally a buyback value with
 * the number of seasons it stays valid.
 *
 * @param props The bidding club, the player, the player's name, and what to do once a bid went
 * through.
 * @returns The rendered form. The swap player rows come after the transfer fee.
 */
export function TransferBidForm({
  leagueTeamId,
  playerId,
  playerName,
  onSent,
}: TransferBidFormProps) {
  const {
    fee,
    swapRows,
    swapAdd,
    swapRemovedMessage,
    buybackValue,
    buybackPeriod,
    isPending,
    onSubmit,
  } = useTransferBidForm(leagueTeamId, playerId, playerName, onSent)

  return (
    <BidForm submitLabel={PLACE_TRANSFER_BID_LABEL} isPending={isPending} onSubmit={onSubmit}>
      <BidField
        id={fee.id}
        label={TRANSFER_FEE_LABEL}
        unitName={IN_EUROS_LABEL}
        message={fee.message}
        messageId={fee.messageId}
      >
        <UnitInput field={fee} unit={EURO_SIGN} />
      </BidField>

      <SwapPlayers rows={swapRows} add={swapAdd} removedMessage={swapRemovedMessage} />

      <BidField
        id={buybackValue.id}
        label={BUYBACK_VALUE_LABEL}
        unitName={IN_EUROS_LABEL}
        message={buybackValue.message}
        messageId={buybackValue.messageId}
      >
        <UnitInput field={buybackValue} unit={EURO_SIGN} placeholder={OPTIONAL_PLACEHOLDER} />
      </BidField>

      <BidField
        id={buybackPeriod.id}
        label={BUYBACK_PERIOD_LABEL}
        message={buybackPeriod.message}
        messageId={buybackPeriod.messageId}
      >
        <BidSelect field={buybackPeriod} options={BUYBACK_PERIOD_OPTIONS} />
      </BidField>
    </BidForm>
  )
}
