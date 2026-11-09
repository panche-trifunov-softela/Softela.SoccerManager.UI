import { LAST_STARTER_SLOT } from '../constants'

import { isSameSituation } from './isSameSituation'

import type { InstructionDefinitionDto } from '@/types/instructionDefinitionDto'
import type { MatchLineupDto } from '@/types/matchLineupDto'
import type { MatchSubstitutionDto } from '@/types/matchSubstitutionDto'
import type { SubstitutionField } from '@/types/substitutionField'

import type { SituationKey, SituationWindow } from '../types'

/**
 * Works out what the club's saved substitutions leave open.
 *
 * - The window's minute is the first saved substitution's, since every saved one shares it, and
 *   `null` while none is saved, so every minute is free.
 * - Each dropdown is read from the definition whose `field` names it, not from its position. A
 *   missing definition gives an empty label and no options.
 * - Minutes outside the window are disabled while a substitution is saved. Situations never are.
 * - The next free substitution is the first situation with nothing saved at the window's minute,
 *   or at the first minute while none is saved. It is `null` when every situation is saved, or
 *   when a definition is missing.
 * - A substitution can be added when a free one exists and the lineup has a player in every
 *   starter slot.
 *
 * @param situations The club's saved substitutions, ordered by minute then situation.
 * @param definitions The minute and the situation a substitution is picked by, with their choices.
 * @param lineup The main lineup, or `null` when there is no match.
 * @returns The window's minute, both dropdowns, the next free substitution and whether one can be
 * added.
 */
export function toSituationWindow(
  situations: readonly MatchSubstitutionDto[],
  definitions: readonly InstructionDefinitionDto<SubstitutionField>[],
  lineup: MatchLineupDto | null,
): SituationWindow {
  const minuteAt = situations[0]?.minuteAt ?? null

  const minuteDefinition = definitions.find((definition) => definition.field === 'minuteAt')

  const situationDefinition = definitions.find((definition) => definition.field === 'situation')

  const minuteOptions = (minuteDefinition?.options ?? []).map(({ value, label }) => ({
    value,
    label,
    isDisabled: minuteAt !== null && value !== minuteAt,
  }))

  const situationOptions = (situationDefinition?.options ?? []).map(({ value, label }) => ({
    value,
    label,
    isDisabled: false,
  }))

  const freeMinute = minuteAt ?? minuteOptions[0]?.value ?? null

  const freeSituation =
    freeMinute === null
      ? undefined
      : situationOptions.find(
          (option) =>
            !situations.some((saved) =>
              isSameSituation(saved, { minuteAt: freeMinute, situation: option.value }),
            ),
        )

  const nextFree: SituationKey | null =
    freeMinute === null || freeSituation === undefined
      ? null
      : { minuteAt: freeMinute, situation: freeSituation.value }

  // The API creates a substitution from the main lineup, and refuses when a starter slot is empty.
  const startersFilled =
    lineup !== null &&
    lineup.slots.filter((slot) => slot.slotNumber <= LAST_STARTER_SLOT && slot.playerId !== null)
      .length === LAST_STARTER_SLOT

  return {
    minuteAt,
    minuteLabel: minuteDefinition?.label ?? '',
    minuteOptions,
    situationLabel: situationDefinition?.label ?? '',
    situationOptions,
    nextFree,
    canAdd: nextFree !== null && startersFilled,
  }
}
