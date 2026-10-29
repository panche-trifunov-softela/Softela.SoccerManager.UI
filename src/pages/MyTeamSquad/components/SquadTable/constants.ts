import type { Morale } from '@/types/morale'

/** How each morale reads in the table. */
export const MORALE_LABELS: Readonly<Record<Morale, string>> = {
  1: 'Very concerned',
  2: 'Concerned',
  3: 'Normal',
  4: 'Satisfied',
  5: 'Very satisfied',
}
