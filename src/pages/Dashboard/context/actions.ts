import { DashboardActions } from './types'

export const getDashboardActions: MapActions<DashboardActions> = (dispatch) => ({
  setAllCards: (payload: RegistrationType[]) => dispatch({ type: 'setAllCards', payload }),
  addCard: (payload: RegistrationType) => dispatch({ type: 'addCard', payload })
})