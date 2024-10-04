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

export interface DashReducerInterface extends Reducer<DashStateType, DashActionsInputType> { }

export type AppStateType = {
  modal: {
    isOpen: boolean,
    isEnabled: boolean,
    title: string,
    message: string,
    onCancel: () => void,
    onConfirm: () => void
  }
}

export type AppActionsInputType =
  { type: 'MODAL_OPEN', payload: { title: string, message: string, onCancel: () => void, onConfirm: () => void }}
  | { type: 'MODAL_CLOSE' }
  | { type: 'MODAL_DISABLE' }
  | { type: 'MODAL_ENABLE' }

export interface AppReducerInterface extends Reducer<AppStateType, AppActionsInputType> { }
