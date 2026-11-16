import { toSeasonOptions } from '@/components/SquadPlayerProfile/components/BidsPanel/utils'

import type { BidSelectOption } from '@/components/SquadPlayerProfile/components/BidsPanel/types'

import type { LoanBidErrors } from './types'

/** The label of the loan fee field. */
export const LOAN_FEE_LABEL = 'Loan fee'

/** The label of the loan length field. */
export const LOAN_LENGTH_LABEL = 'Loan length'

/** The label of the buy option field. */
export const BUY_OPTION_LABEL = 'Buy option'

/** The label of the salary field. */
export const SALARY_LABEL = 'Salary'

/** What shows under the salary: the player keeps the wage they have at their club. */
export const SALARY_HINT = 'Per week, the same at your club.'

/** The words on the submit button. */
export const PLACE_LOAN_BID_LABEL = 'Place loan bid'

/** The numbers of seasons a loan can last. */
export const LOAN_SEASONS = [1, 2] as const

/** The choices of the loan length, in order. */
export const LOAN_LENGTH_OPTIONS: BidSelectOption[] = toSeasonOptions(LOAN_SEASONS)

/** The loan length a fresh form shows: the first of the lengths on offer, as a select value. */
export const DEFAULT_LOAN_LENGTH = String(LOAN_SEASONS[0])

/** What shows under the loan fee when it is missing. */
export const LOAN_FEE_REQUIRED_MESSAGE = 'Enter the loan fee.'

/** What the toast says, after the player's name, when a loan bid went through. */
export const LOAN_BID_SENT_MESSAGE = 'Loan bid sent.'

/** What the toast says, after the player's name, when a loan bid got no answer from the API. */
export const LOAN_BID_FAILED_MESSAGE = 'The loan bid could not be sent.'

/** The errors of a form nobody has tried to submit, or whose last attempt was valid. */
export const NO_LOAN_BID_ERRORS: LoanBidErrors = {
  fee: null,
}
