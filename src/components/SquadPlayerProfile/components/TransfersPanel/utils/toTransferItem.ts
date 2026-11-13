import { LOAN_NOTE, SEASON_LABEL, SWAP_TEXT } from '../constants'

import { toFeeText } from './toFeeText'
import { toSwapLine } from './toSwapLine'

import type { PlayerTransferDto } from '@/types/playerTransferDto'

import type { HistoryItem } from '../../HistoryList'

/**
 * Turns one transfer, swap or loan into a row of the history list.
 *
 * @param transfer The deal as the API returns it.
 * @returns The row: the club as the title, the season under it, the fee at the right with a note
 * for a loan or a swap that came with a fee, and for a swap the line of who went where. A swap
 * with no fee shows `Swap` in the place of the fee and has no note.
 */
export function toTransferItem(transfer: PlayerTransferDto): HistoryItem {
  const hasSwap = transfer.swapPlayers.length > 0

  const isFreeSwap = hasSwap && transfer.fee === 0

  return {
    key: `${transfer.isLoan ? 'loan' : 'transfer'}-${transfer.id}`,
    hasCrest: true,
    logoUrl: transfer.teamLogoUrl,
    title: transfer.teamName,
    meta: `${SEASON_LABEL} ${transfer.seasonNumber}`,
    detail: toSwapLine(transfer),
    value: isFreeSwap ? SWAP_TEXT : toFeeText(transfer.fee),
    note: toNote(transfer.isLoan, hasSwap, isFreeSwap),
  }
}

/**
 * Picks the small line under the fee.
 *
 * @param isLoan Whether the deal is a loan.
 * @param hasSwap Whether players were swapped in the deal.
 * @param isFreeSwap Whether the deal is a swap with no fee, which `Swap` already tells at the fee.
 * @returns `Loan` for a loan, `Swap` for a swap with a fee, otherwise `null`.
 */
function toNote(isLoan: boolean, hasSwap: boolean, isFreeSwap: boolean): string | null {
  if (isLoan) return LOAN_NOTE

  if (hasSwap && !isFreeSwap) return SWAP_TEXT

  return null
}
