import { FREE_TRANSFER_TEXT } from '@/constants/bidText'
import { formatEuros } from '@/utils/formatEuros'

/**
 * Writes a transfer or loan fee.
 *
 * @param fee The fee in euros; `0` when none was paid.
 * @returns `Free` for zero, otherwise the amount in euros.
 */
export function toFeeText(fee: number): string {
  if (fee === 0) return FREE_TRANSFER_TEXT

  return formatEuros(fee)
}
