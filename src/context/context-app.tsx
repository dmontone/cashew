import { createContext, Dispatch, FC, ReactNode, useReducer } from 'react'
import { AppReducer, initialState } from './reducer-app'
import { AppActionsInputType, AppReducerInterface, AppStateType } from './types'

type ContextType = [AppStateType, Dispatch<AppActionsInputType>]
export const AppContext = createContext<ContextType>([initialState, () => { }])

export const AppProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const reducer = useReducer<AppReducerInterface>(AppReducer, initialState)

  return (
    <AppContext.Provider value={reducer}>
      {children}
    </AppContext.Provider>
  )
}

