import { FC, ReactNode } from 'react'
import { DashProvider, AppProvider } from './context'

export const Providers: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <AppProvider>
      <DashProvider>
        {children}
      </DashProvider>
    </AppProvider>
  )
}