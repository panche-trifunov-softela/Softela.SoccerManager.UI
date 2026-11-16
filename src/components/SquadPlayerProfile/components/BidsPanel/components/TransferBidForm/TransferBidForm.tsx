import { EURO_SIGN, IN_EUROS_LABEL, OPTIONAL_PLACEHOLDER } from '../../constants'
import { BidField } from '../BidField'
import { BidForm } from '../BidForm'
import { BidSelect } from '../BidSelect'
import { UnitInput } from '../UnitInput'

import {
  BUYBACK_PERIOD_LABEL,
  BUYBACK_PERIOD_OPTIONS,
  BUYBACK_VALUE_LABEL,
  FIRST_SWAP_LABEL,
  PLACE_TRANSFER_BID_LABEL,
  SECOND_SWAP_LABEL,
  TRANSFER_FEE_LABEL,
} from './constants'
import { useTransferBidForm } from './useTransferBidForm'

import type { TransferBidFormProps } from './types'

/**
 * The form that places a transfer bid for a player: the fee offered, up to two players of the
 * bidding club offered in swap, and optionally a buyback value with the number of seasons it stays
 * valid.
 *
 * @param props The bidding club, the player, the player's name and the player's value.
 * @returns The rendered form. The transfer fee states the player's value under it.
 */
export function TransferBidForm({
  leagueTeamId,
  playerId,
  playerName,
  value,
}: TransferBidFormProps) {
  const {
    fee,
    firstSwap,
    firstSwapOptions,
    secondSwap,
    secondSwapOptions,
    buybackValue,
    buybackPeriod,
    isPending,
    onSubmit,
  } = useTransferBidForm(leagueTeamId, playerId, playerName, value)

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

      <BidField
        id={firstSwap.id}
        label={FIRST_SWAP_LABEL}
        message={firstSwap.message}
        messageId={firstSwap.messageId}
      >
        <BidSelect field={firstSwap} options={firstSwapOptions} />
      </BidField>

      <BidField
        id={secondSwap.id}
        label={SECOND_SWAP_LABEL}
        message={secondSwap.message}
        messageId={secondSwap.messageId}
      >
        <BidSelect field={secondSwap} options={secondSwapOptions} />
      </BidField>

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
