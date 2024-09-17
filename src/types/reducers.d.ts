import { Dispatch } from 'react'

type MapActionTypes<T> = {
  [K in keyof T]: { type: K; payload: T[K] }
}[keyof T]

declare type MapActions<T> = (dispatch: Dispatch<MapActionTypes<T>>) => {
  [K in keyof T]: (payload: T[K]) => void
}

declare type MapReducerActionType<T> = {
  [K in keyof T]: {
    type: K,
    payload: T[K]
  }
}[keyof T]

declare type MapReducerType<S, A> = (state: S, actions: MapReducerActionType<A>) => S