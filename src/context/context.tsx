import { createContext, Dispatch, FC, ReactNode, useReducer } from 'react'
import { DashReducer, initialState } from './reducer'
import { DashActionsInputType, DashReducerInterface, DashStateType } from './types'

type ContextType = [DashStateType, Dispatch<DashActionsInputType>]
export const DashContext = createContext<ContextType>([initialState, () => { }])

export const DashProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const reducer = useReducer<DashReducerInterface>(DashReducer, initialState)

  return (
    <DashContext.Provider value={reducer}>
      {children}
    </DashContext.Provider>
  )
}

