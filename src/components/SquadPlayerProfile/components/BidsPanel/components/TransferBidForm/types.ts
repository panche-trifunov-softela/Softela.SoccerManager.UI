import type { SubmitEventHandler } from 'react'

import type { LeagueTeamSquadMemberDto } from '@/types/leagueTeamSquadMemberDto'

import type { BidInputField, BidSelectField, BidSelectOption } from '../../types'

/** What `TransferBidForm` is handed. */
export interface TransferBidFormProps {
  /** The bidding club: the selected club's league team id. */
  leagueTeamId: number

  /** The player the bid is for. */
  playerId: number

  /** The player's name, which the toasts say. */
  playerName: string

  /** The player's transfer value in this league, in euros. */
  value: number
}

/** What the reader has typed into the transfer bid form. */
export interface TransferBidDraft {
  /** The digits of the transfer fee; empty when none is typed. */
  fee: string

  /** The squad row id chosen as the first swap player; empty for none. */
  firstSwap: string

  /** The squad row id chosen as the second swap player; empty for none. */
  secondSwap: string

  /** The digits of the buyback value; empty when none is typed. */
  buybackValue: string

  /** The chosen number of buyback seasons; empty for no buyback. */
  buybackSeasons: string
}

/** Why each field of the transfer bid form that can be invalid is not valid. */
export interface TransferBidErrors {
  /** Why the transfer fee is not valid, or `null` when it is. */
  fee: string | null

  /** Why the buyback value is not valid, or `null` when it is. */
  buybackValue: string | null

  /** Why the buyback period is not valid, or `null` when it is. */
  buybackPeriod: string | null
}

/** How far the read of the bidding club's squad has come. */
export type SwapSquadStatus = 'loading' | 'ready' | 'failed'

/** One finished read of the bidding club's squad, kept with the club it was made for. */
export interface SwapSquadRead {
  /** The league team the read was made for. */
  leagueTeamId: number

  /** The squad read, or `null` when the read failed. */
  members: LeagueTeamSquadMemberDto[] | null
}

/** What `useSwapSquad` exposes to the form's hook. */
export interface SwapSquadState {
  /** Whether the squad is being read, was read, or could not be read. */
  status: SwapSquadStatus

  /** The squad's players in the API's order; empty until the squad was read. */
  members: LeagueTeamSquadMemberDto[]
}

/** What `useTransferBidForm` exposes to the view. */
export interface TransferBidFormState {
  /** The transfer fee field. */
  fee: BidInputField

  /** The first swap player field. */
  firstSwap: BidSelectField

  /** The choices of the first swap player, in order. */
  firstSwapOptions: BidSelectOption[]

  /** The second swap player field. */
  secondSwap: BidSelectField

  /** The choices of the second swap player, in order. */
  secondSwapOptions: BidSelectOption[]

  /** The buyback value field. */
  buybackValue: BidInputField

  /** The buyback period field. */
  buybackPeriod: BidSelectField

  /** Whether a bid is being sent. */
  isPending: boolean

  /** Validates the form and, when it is valid, sends the bid. */
  onSubmit: SubmitEventHandler<HTMLFormElement>
}
