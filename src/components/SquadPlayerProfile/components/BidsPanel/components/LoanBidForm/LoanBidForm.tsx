import { EURO_SIGN, IN_EUROS_LABEL, OPTIONAL_PLACEHOLDER } from '../../constants'
import { BidField } from '../BidField'
import { BidForm } from '../BidForm'
import { BidSelect } from '../BidSelect'
import { UnitInput } from '../UnitInput'

import {
  BUY_OPTION_LABEL,
  LOAN_FEE_LABEL,
  LOAN_LENGTH_LABEL,
  LOAN_LENGTH_OPTIONS,
  PLACE_LOAN_BID_LABEL,
  SALARY_LABEL,
} from './constants'
import { useLoanBidForm } from './useLoanBidForm'

import type { LoanBidFormProps } from './types'

/**
 * The form that places a loan bid for a player: the fee offered, how long the loan lasts, an
 * optional buy option, and the player's weekly salary, which stays the same.
 *
 * @param props The bidding club, the player, the player's name, the player's weekly wage, and what
 * to do once a bid went through.
 * @returns The rendered form. The salary shows the wage in a field that cannot be edited.
 */
export function LoanBidForm({
  leagueTeamId,
  playerId,
  playerName,
  wage,
  onSent,
}: LoanBidFormProps) {
  const { fee, length, buyOption, salary, isPending, onSubmit } = useLoanBidForm(
    leagueTeamId,
    playerId,
    playerName,
    wage,
    onSent,
  )

  return (
    <BidForm submitLabel={PLACE_LOAN_BID_LABEL} isPending={isPending} onSubmit={onSubmit}>
      <BidField
        id={fee.id}
        label={LOAN_FEE_LABEL}
        unitName={IN_EUROS_LABEL}
        message={fee.message}
        messageId={fee.messageId}
      >
        <UnitInput field={fee} unit={EURO_SIGN} />
      </BidField>

      <BidField
        id={length.id}
        label={LOAN_LENGTH_LABEL}
        message={length.message}
        messageId={length.messageId}
      >
        <BidSelect field={length} options={LOAN_LENGTH_OPTIONS} />
      </BidField>

      <BidField
        id={buyOption.id}
        label={BUY_OPTION_LABEL}
        unitName={IN_EUROS_LABEL}
        message={buyOption.message}
        messageId={buyOption.messageId}
      >
        <UnitInput field={buyOption} unit={EURO_SIGN} placeholder={OPTIONAL_PLACEHOLDER} />
      </BidField>

      <BidField
        id={salary.id}
        label={SALARY_LABEL}
        unitName={IN_EUROS_LABEL}
        message={salary.message}
        messageId={salary.messageId}
      >
        <UnitInput field={salary} unit={EURO_SIGN} />
      </BidField>
    </BidForm>
  )
}
