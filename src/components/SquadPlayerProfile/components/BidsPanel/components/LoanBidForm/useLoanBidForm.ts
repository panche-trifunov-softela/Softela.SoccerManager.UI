import { useId, useState } from 'react'

import { placeLoanBid } from '@/services/api'

import { MONEY_MAX_DIGITS } from '../../constants'
import { useBidSubmit } from '../../hooks/useBidSubmit'
import { useDigitsInput } from '../../hooks/useDigitsInput'
import { useFieldErrors } from '../../hooks/useFieldErrors'
import {
  toFieldMessage,
  toGroupedDigits,
  toInputField,
  toReadOnlyField,
  toSelectField,
} from '../../utils'

import {
  DEFAULT_LOAN_LENGTH,
  LOAN_BID_FAILED_MESSAGE,
  LOAN_BID_SENT_MESSAGE,
  NO_LOAN_BID_ERRORS,
  SALARY_HINT,
} from './constants'
import { toLoanBidErrors, toLoanBidRequest } from './utils'

import type { LoanBidFormProps, LoanBidFormState } from './types'

/**
 * Keeps a loan bid form: what is typed into it, why a field is not valid, and the bid being sent.
 *
 * - Errors show only once a submit was attempted, and changing a field drops its own error.
 * - The salary is the player's wage at their club, shown as it is and never edited: the player
 *   keeps the same salary at the bidding club.
 * - A submit follows `useBidSubmit`: the bid is sent only once the form is valid, and a bid that
 *   went through empties the form and then runs `onSent`.
 *
 * @param leagueTeamId The bidding club's league team id.
 * @param playerId The player the bid is for.
 * @param playerName The player's name, which the toasts say.
 * @param wage The player's contract wage, in euros per week.
 * @param onSent What to do once a bid went through and the form was emptied.
 * @returns The four fields, whether a bid is being sent, and the submit handler.
 */
export function useLoanBidForm(
  leagueTeamId: LoanBidFormProps['leagueTeamId'],
  playerId: LoanBidFormProps['playerId'],
  playerName: LoanBidFormProps['playerName'],
  wage: LoanBidFormProps['wage'],
  onSent: LoanBidFormProps['onSent'],
): LoanBidFormState {
  const baseId = useId()

  const feeId = `${baseId}-fee`

  const lengthId = `${baseId}-length`

  const buyOptionId = `${baseId}-buy-option`

  const salaryId = `${baseId}-salary`

  const fee = useDigitsInput(MONEY_MAX_DIGITS)

  const buyOption = useDigitsInput(MONEY_MAX_DIGITS)

  const [seasons, setSeasons] = useState(DEFAULT_LOAN_LENGTH)

  const { errors, setErrors, clearError } = useFieldErrors(NO_LOAN_BID_ERRORS)

  const draft = { fee: fee.digits, seasons, buyOption: buyOption.digits }

  const { isPending, onSubmit } = useBidSubmit({
    playerName,
    sentMessage: LOAN_BID_SENT_MESSAGE,
    failedMessage: LOAN_BID_FAILED_MESSAGE,
    validate: () => {
      const found = toLoanBidErrors(draft)

      setErrors(found)

      return [{ id: feeId, error: found.fee }]
    },
    send: () => placeLoanBid(leagueTeamId, playerId, toLoanBidRequest(draft)),
    reset: () => {
      fee.clear()

      buyOption.clear()

      setSeasons(DEFAULT_LOAN_LENGTH)
    },
    onSent,
  })

  return {
    fee: toInputField(feeId, fee, toFieldMessage(errors.fee, null), () => {
      clearError('fee')
    }),
    length: toSelectField(lengthId, seasons, null, setSeasons),
    buyOption: toInputField(buyOptionId, buyOption, null),
    salary: toReadOnlyField(
      salaryId,
      toGroupedDigits(String(wage)),
      toFieldMessage(null, SALARY_HINT),
    ),
    isPending,
    onSubmit,
  }
}
