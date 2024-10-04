import { AppReducerInterface, AppStateType } from './types'

export const initialState: AppStateType = {
  modal: {
    isOpen: false,
    isEnabled: true,
    title: '',
    message: '',
    onCancel: () => { },
    onConfirm: () => { }
  }
}

export const AppReducer: AppReducerInterface = (state, action) => {
  switch (action.type) {
    case 'MODAL_OPEN':
      return {
        ...state,
        modal: {
          ...state.modal,
          isOpen: true,
          ...action.payload
        }
      }

    case 'MODAL_CLOSE':
      return {
        ...state,
        modal: initialState.modal
      }

    case 'MODAL_DISABLE':
      return {
        ...state,
        modal: {
          ...state.modal,
          isEnabled: false
        }
      }

    case 'MODAL_ENABLE':
      return {
        ...state,
        modal: {
          ...state.modal,
          isEnabled: true
        }
      }

    default:
      return state
  }
}
