import { Reducer } from 'react'

export type DashStateType = {
  isFetching: boolean
  isFetched: boolean
  isError: boolean
  error?: unknown
  registrations: RegistrationType[]
}

export type DashActionsInputType =
  { type: 'FETCH_CARDS_INIT' }
  | { type: 'FETCH_CARDS_SUCCESS', payload: RegistrationType[] }
  | { type: 'FETCH_CARDS_ERROR', payload: unknown }

export type DashActionsType = {}

export interface DashReducerInterface extends Reducer<DashStateType, DashActionsInputType> {}
