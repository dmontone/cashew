import * as S from './styles'
import { ALL_COLUMNS } from './constants'
import { useContext } from 'react'
import { DashContext } from '../../context'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
// import { RegistrationCard } from "../RegistrationCard"
// import { useContext, useEffect } from 'react'
// import { DashContext } from '../../context'

export const Collumns = () => {
  const [{ isFetching }] = useContext(DashContext)

  return (
    <S.Container>
      {
        ALL_COLUMNS.map(({ status, title }) => (
          <S.Column key={title} $status={status} $isFetching={isFetching}>
            <S.TitleColumn>
              {title}
              <AiOutlineLoading3Quarters />
            </S.TitleColumn>
          </S.Column>
        ))
      }
      {/* {ALL_COLUMNS.map((column) => {
        return (
          <S.Column status={column.status} key={column.title}>
            <>
              <S.TitleColumn status={column.status}>
                {column.title}
              </S.TitleColumn>
              <S.CollumContent>
                {registrations?.map((registration) => {
                  return (
                    <RegistrationCard
                      data={registration}
                      key={registration.id}
                    />
                  )
                })}
              </S.CollumContent>
            </>
          </S.Column>
        )
      })} */}
    </S.Container>
  )
}
