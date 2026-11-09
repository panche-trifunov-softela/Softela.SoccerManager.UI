import { SITUATION_LABEL_SEPARATOR } from '../constants'

import type { SituationKey, SituationWindow } from '../types'

/**
 * Names a substitution by the API's labels for its minute and its situation, joined by
 * `SITUATION_LABEL_SEPARATOR`: a substitution at minute 60 for a losing score reads `60 · Losing`.
 *
 * A value with no option shows as its number.
 *
 * @param key The substitution to name.
 * @param situationWindow The minutes and situations on offer, with the labels the API gives them.
 * @returns The substitution's name.
 */
export function toSituationLabel(key: SituationKey, situationWindow: SituationWindow): string {
  const minute = situationWindow.minuteOptions.find((option) => option.value === key.minuteAt)

  const situation = situationWindow.situationOptions.find(
    (option) => option.value === key.situation,
  )

  return [
    minute?.label ?? String(key.minuteAt),
    situation?.label ?? String(key.situation),
  ].join(SITUATION_LABEL_SEPARATOR)
}
