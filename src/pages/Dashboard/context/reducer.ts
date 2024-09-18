import { DashReducerInterface, DashStateType } from './types'

export const initialState: DashStateType = {
  isFetched: false,
  isFetching: false,
  isError: false,
  error: undefined,
  registrations: []
}

export const DashReducer: DashReducerInterface = (state, action) => {
  switch (action.type) {
    case 'FETCH_CARDS_INIT':
      return {
        ...state,
        isFetched: false,
        isFetching: true,
        isError: false,
        error: undefined,
        registrations: []
      }

    case 'FETCH_CARDS_SUCCESS':
      return {
        ...state,
        isFetching: false,
        isError: false,
        error: undefined,
        registrations: action.payload
      }

    case 'FETCH_CARDS_ERROR':
      return {
        ...state,
        isFetching: false,
        isError: true,
        error: action.payload
      }

    default:
      return state
  }
}
