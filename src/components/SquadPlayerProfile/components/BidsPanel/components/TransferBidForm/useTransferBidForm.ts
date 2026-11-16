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
import { useSwapSquad } from './useSwapSquad'
import { toSwapOptions, toTransferBidErrors, toTransferBidRequest, toValueHint } from './utils'

import type { TransferBidFormProps, TransferBidFormState } from './types'

/**
 * Keeps a transfer bid form: what is typed into it, why a field is not valid, and the bid being
 * sent.
 *
 * - Errors show only once a submit was attempted, and changing a field drops its own error. The
 *   buyback value and period are checked as a pair, so changing either drops the errors of both.
 *   While the transfer fee has no error, a hint states the player's value.
 * - The two swap player fields offer the bidding club's squad, read once when the form appears.
 *   Each leaves out the player chosen in the other, and both cannot be used until the squad was
 *   read.
 * - A submit follows `useBidSubmit`: the bid is sent only once the form is valid, and a bid that
 *   went through empties the form.
 *
 * @param leagueTeamId The bidding club's league team id.
 * @param playerId The player the bid is for.
 * @param playerName The player's name, which the toasts say.
 * @param value The player's transfer value, in euros.
 * @returns The fields and the choices of the two swap players, whether a bid is being sent, and
 * the submit handler.
 */
export function useTransferBidForm(
  leagueTeamId: TransferBidFormProps['leagueTeamId'],
  playerId: TransferBidFormProps['playerId'],
  playerName: TransferBidFormProps['playerName'],
  value: TransferBidFormProps['value'],
): TransferBidFormState {
  const baseId = useId()

  const feeId = `${baseId}-fee`

  const firstSwapId = `${baseId}-swap-1`

  const secondSwapId = `${baseId}-swap-2`

  const buybackValueId = `${baseId}-buyback-value`

  const buybackPeriodId = `${baseId}-buyback-period`

  const fee = useDigitsInput(MONEY_MAX_DIGITS)

  const buybackValue = useDigitsInput(MONEY_MAX_DIGITS)

  const [firstSwap, setFirstSwap] = useState('')

  const [secondSwap, setSecondSwap] = useState('')

  const [buybackSeasons, setBuybackSeasons] = useState('')

  const squad = useSwapSquad(leagueTeamId)

  const { errors, setErrors, clearError } = useFieldErrors(NO_TRANSFER_BID_ERRORS)

  const clearBuybackErrors = () => {
    clearError('buybackValue')

    clearError('buybackPeriod')
  }

  const draft = {
    fee: fee.digits,
    firstSwap,
    secondSwap,
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

      return [
        { id: feeId, error: found.fee },
        { id: buybackValueId, error: found.buybackValue },
        { id: buybackPeriodId, error: found.buybackPeriod },
      ]
    },
    send: () => placeTransferBid(leagueTeamId, playerId, toTransferBidRequest(draft)),
    reset: () => {
      fee.clear()

      buybackValue.clear()

      setFirstSwap('')

      setSecondSwap('')

      setBuybackSeasons('')
    },
  })

  const areSwapsDisabled = squad.status !== 'ready'

  return {
    fee: toInputField(feeId, fee, toFieldMessage(errors.fee, toValueHint(value)), () => {
      clearError('fee')
    }),
    firstSwap: toSelectField(firstSwapId, firstSwap, null, setFirstSwap, areSwapsDisabled),
    firstSwapOptions: toSwapOptions(squad, secondSwap),
    secondSwap: toSelectField(secondSwapId, secondSwap, null, setSecondSwap, areSwapsDisabled),
    secondSwapOptions: toSwapOptions(squad, firstSwap),
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
