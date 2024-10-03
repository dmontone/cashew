import * as S from './styles'
import { ALL_COLUMNS } from './constants'
import { useContext } from 'react'
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { DashContext } from '~/context'
import { RegistrationCard } from '../RegistrationCard'

export const Collumns = () => {
  const [{ isFetching, registrations }] = useContext(DashContext)

  return (
    <S.Container>
      {
        ALL_COLUMNS.map(({ status, title }) => (
          <S.Column key={title} $status={status} $isFetching={isFetching}>
            <S.TitleColumn>
              {title}
              <AiOutlineLoading3Quarters role='img' aria-label='loading' />
            </S.TitleColumn>
            <S.CollumContent>
              {
                registrations && registrations
                  .filter(registration => registration.status === status)
                  .map(registration => (
                    <RegistrationCard key={registration.id} {...registration} />
                  ))
              }
            </S.CollumContent>
          </S.Column>
        ))
      }
    </S.Container>
  )
}
