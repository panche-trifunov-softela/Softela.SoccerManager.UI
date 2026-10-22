import type { FinancialState } from '@/types/financialState'

/** What shows when the address names no game world, or one the API does not know. */
export const NOT_FOUND_MESSAGE = 'This game world could not be found.'

/** What shows, and is toasted when no better reason is known, when the clubs could not be read. */
export const CLUBS_LOAD_FAILED_MESSAGE = 'Clubs could not be loaded.'

/** How each financial state reads in the table. */
export const FINANCIAL_STATE_LABELS: Readonly<Record<FinancialState, string>> = {
  1: 'Very poor',
  2: 'Poor',
  3: 'Average',
  4: 'Rich',
  5: 'Very rich',
}
