import { INJURY_SCALE_LABELS } from '../constants'

import { toInjuryDates } from './toInjuryDates'

import type { PlayerInjuryDto } from '@/types/playerInjuryDto'

import type { HistoryItem } from '../../HistoryList'

/**
 * Turns one injury into a row of the history list.
 *
 * @param injury The injury as the API returns it.
 * @returns The row: the injury's name as the title, its dates under it and its scale at the right
 * edge. The row has no crest.
 */
export function toInjuryItem(injury: PlayerInjuryDto): HistoryItem {
  return {
    key: String(injury.id),
    hasCrest: false,
    title: injury.name,
    meta: toInjuryDates(injury.injuryStartDate, injury.injuryEndDate),
    detail: null,
    value: INJURY_SCALE_LABELS[injury.injuryScale],
    note: null,
  }
}
