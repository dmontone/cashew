import { FC, ReactNode, createContext, useReducer } from 'react'
import { getDashboardActions } from './actions'

export const DashboardContext = createContext({})

export const DashboardProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(() => {}, undefined)

  return (
    <DashboardContext.Provider value={[state, getDashboardActions(dispatch)]}>
      {children}
    </DashboardContext.Provider>
  )
}