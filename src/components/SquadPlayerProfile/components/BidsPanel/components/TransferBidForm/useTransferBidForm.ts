import { useId, useState } from 'react'

import { placeTransferBid } from '@/services/api'

import { MONEY_MAX_DIGITS } from '../../constants'
import { useBidSubmit } from '../../hooks/useBidSubmit'
import { useDigitsInput } from '../../hooks/useDigitsInput'
import { useFieldErrors } from '../../hooks/useFieldErrors'
import { toFieldMessage, toInputField, toSelectField } from '../../utils'

import {
  NO_TRANSFER_BID_ERRORS,
  TRANSFER_BID_FAILED_MESSAGE,
  TRANSFER_BID_SENT_MESSAGE,
} from './constants'
import { useSwapRows } from './useSwapRows'
import { toTransferBidErrors, toTransferBidRequest, toValueHint } from './utils'

import type { TransferBidFormProps, TransferBidFormState } from './types'

/**
 * Keeps a transfer bid form: what is typed into it, why a field is not valid, and the bid being
 * sent.
 *
 * - Errors show only once a submit was attempted, and changing a field drops its own error. The
 *   buyback value and period are checked as a pair, so changing either drops the errors of both.
 *   While the transfer fee has no error, a hint states the player's value.
 * - The swap player rows come from `useSwapRows`: added one at a time, each offering the bidding
 *   club's squad, read once when the form appears. A row with no player chosen is not valid, and is
 *   checked between the transfer fee and the buyback.
 * - A submit follows `useBidSubmit`: the bid is sent only once the form is valid, and a bid that
 *   went through empties the form and removes the swap player rows.
 *
 * @param leagueTeamId The bidding club's league team id.
 * @param playerId The player the bid is for.
 * @param playerName The player's name, which the toasts say.
 * @param value The player's transfer value, in euros.
 * @returns The fields, the swap player rows with their add button and removal message, whether a
 * bid is being sent, and the submit handler.
 */
export function useTransferBidForm(
  leagueTeamId: TransferBidFormProps['leagueTeamId'],
  playerId: TransferBidFormProps['playerId'],
  playerName: TransferBidFormProps['playerName'],
  value: TransferBidFormProps['value'],
): TransferBidFormState {
  const baseId = useId()

  const feeId = `${baseId}-fee`

  const buybackValueId = `${baseId}-buyback-value`

  const buybackPeriodId = `${baseId}-buyback-period`

  const fee = useDigitsInput(MONEY_MAX_DIGITS)

  const buybackValue = useDigitsInput(MONEY_MAX_DIGITS)

  const [buybackSeasons, setBuybackSeasons] = useState('')

  const swaps = useSwapRows(leagueTeamId, baseId)

  const { errors, setErrors, clearError } = useFieldErrors(NO_TRANSFER_BID_ERRORS)

  const clearBuybackErrors = () => {
    clearError('buybackValue')

    clearError('buybackPeriod')
  }

  const draft = {
    fee: fee.digits,
    swaps: swaps.playerIds,
    buybackValue: buybackValue.digits,
    buybackSeasons,
  }

  const { isPending, onSubmit } = useBidSubmit({
    playerName,
    sentMessage: TRANSFER_BID_SENT_MESSAGE,
    failedMessage: TRANSFER_BID_FAILED_MESSAGE,
    validate: () => {
      const found = toTransferBidErrors(draft)

      setErrors(found)

      const swapErrors = swaps.validate()

      return [
        { id: feeId, error: found.fee },
        ...swapErrors,
        { id: buybackValueId, error: found.buybackValue },
        { id: buybackPeriodId, error: found.buybackPeriod },
      ]
    },
    send: () => placeTransferBid(leagueTeamId, playerId, toTransferBidRequest(draft)),
    reset: () => {
      fee.clear()

      buybackValue.clear()

      swaps.reset()

      setBuybackSeasons('')
    },
  })

  return {
    fee: toInputField(feeId, fee, toFieldMessage(errors.fee, toValueHint(value)), () => {
      clearError('fee')
    }),
    swapRows: swaps.rows,
    swapAdd: swaps.add,
    swapRemovedMessage: swaps.removedMessage,
    buybackValue: toInputField(
      buybackValueId,
      buybackValue,
      toFieldMessage(errors.buybackValue, null),
      clearBuybackErrors,
    ),
    buybackPeriod: toSelectField(
      buybackPeriodId,
      buybackSeasons,
      toFieldMessage(errors.buybackPeriod, null),
      (next) => {
        setBuybackSeasons(next)

        clearBuybackErrors()
      },
    ),
    isPending,
    onSubmit,
  }
}
