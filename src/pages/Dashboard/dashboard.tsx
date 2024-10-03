import { useFetch } from '~/hooks'
import { Collumns, SearchBar } from "./components"
import * as S from "./styles"
import { DashContext } from '~/context'
import { useContext, useEffect } from 'react'

export const DashboardPage = () => {
  const { loading, data, error } = useFetch<RegistrationType[]>('http://localhost:3000/registrations')
  const [, dispatch] = useContext(DashContext)
  
  useEffect(() => {
    if (loading)
      dispatch({ type: 'FETCH_CARDS_INIT' })
    else if (data)
      dispatch({ type: 'FETCH_CARDS_SUCCESS', payload: data })
    else if (error)
      dispatch({ type: 'FETCH_CARDS_ERROR', payload: error })
  }, [loading, data, error])

  return (
    <S.Container>
      <SearchBar />
      <Collumns />
    </S.Container>
  )
}