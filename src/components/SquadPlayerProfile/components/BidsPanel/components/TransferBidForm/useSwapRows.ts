import { useState } from 'react'
import { flushSync } from 'react-dom'

import { toFieldMessage, toMessageId, toSelectField } from '../../utils'

import { SWAP_REQUIRED_MESSAGE } from './constants'
import { useSwapSquad } from './useSwapSquad'
import {
  toRemoveSwapLabel,
  toSwapAddState,
  toSwapId,
  toSwapLabel,
  toSwapOptions,
  toSwapRemovedMessage,
} from './utils'

import type { BidFieldError } from '../../types'

import type { SwapRow, SwapRowsState } from './types'

/**
 * Keeps the swap player rows of a transfer bid form: how many there are, the player chosen in each
 * and why a row is not valid.
 *
 * - There are no rows at first. The add button adds one at a time, up to the most the squad and
 *   the API allow, and only once the bidding club's squad was read.
 * - Pressing the add button when it cannot add does nothing, because `aria-disabled` stops the
 *   mouse but not the keyboard.
 * - A row's error lives with the row, so removing a row removes its error, and the rows below it
 *   renumber with their choices and errors intact.
 * - Choosing a player drops that row's error. Each row offers the squad without the players the
 *   other rows chose.
 * - An added row takes the focus. A removed row sends the focus to the add button, which is always
 *   on screen by then, and says which row went.
 *
 * @param leagueTeamId The bidding club's league team id, whose squad the rows offer.
 * @param baseId The id the form's ids start from.
 * @returns The rows, the add button, what to say after a removal, the players chosen, and what
 * checks and empties the rows.
 */
export function useSwapRows(leagueTeamId: number, baseId: string): SwapRowsState {
  const squad = useSwapSquad(leagueTeamId)

  const [rows, setRows] = useState<SwapRow[]>([])

  const [removedMessage, setRemovedMessage] = useState('')

  const addId = `${baseId}-add-swap`

  const addState = toSwapAddState(squad, rows.length)

  // The row is on screen before the focus moves, so its select exists to take it.
  const add = () => {
    if (addState?.canAdd !== true) return

    flushSync(() => {
      setRows((current) => [...current, { playerId: '', error: null }])

      setRemovedMessage('')
    })

    document.getElementById(toSwapId(baseId, rows.length + 1))?.focus()
  }

  // A removal always leaves room for another row, so the add button is on screen to take the focus.
  const remove = (index: number) => {
    flushSync(() => {
      setRows((current) => current.filter((_, position) => position !== index))

      setRemovedMessage(toSwapRemovedMessage(index + 1))
    })

    document.getElementById(addId)?.focus()
  }

  const choose = (index: number, playerId: string) => {
    setRows((current) =>
      current.map((row, position) => (position === index ? { playerId, error: null } : row)),
    )
  }

  const validate = (): BidFieldError[] => {
    const found = rows.map((row) => ({
      ...row,
      error: row.playerId === '' ? SWAP_REQUIRED_MESSAGE : null,
    }))

    setRows(found)

    return found.map((row, index) => ({ id: toSwapId(baseId, index + 1), error: row.error }))
  }

  const reset = () => {
    setRows([])

    setRemovedMessage('')
  }

  return {
    rows: rows.map((row, index) => {
      const position = index + 1

      const otherChoices = rows
        .filter((_, other) => other !== index)
        .map((other) => other.playerId)

      return {
        label: toSwapLabel(position),
        field: toSelectField(
          toSwapId(baseId, position),
          row.playerId,
          toFieldMessage(row.error, null),
          (playerId) => {
            choose(index, playerId)
          },
        ),
        options: toSwapOptions(squad, otherChoices),
        removeLabel: toRemoveSwapLabel(position),
        onRemove: () => {
          remove(index)
        },
      }
    }),
    add:
      addState === null
        ? null
        : {
            ...addState,
            id: addId,
            hintId: addState.hint === null ? null : toMessageId(addId),
            onAdd: add,
          },
    removedMessage,
    playerIds: rows.map((row) => row.playerId),
    validate,
    reset,
  }
}
