/**
 * Writes an amount of money in euros, shortened to thousands or millions.
 *
 * @param amount The amount, in euros.
 * @returns The amount in the reader's locale, such as `€15M` or `€450K`.
 */
export function formatEuros(amount: number): string {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'EUR',
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(amount)
}
