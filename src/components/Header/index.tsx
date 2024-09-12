import { ReactNode } from 'react'
import * as S from './styles'

type HeaderType = {
  children: ReactNode
}

export const Header = ({ children }: HeaderType) => <S.Header>{children}</S.Header>