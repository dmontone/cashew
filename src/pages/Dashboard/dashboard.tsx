import { Collumns, SearchBar } from "./components"
import * as S from "./styles"
import { DashContext } from '~/context'
import { useContext, useEffect } from 'react'
import { handleApi } from '~/utils'

export const DashboardPage = () => {
  const [, dispatch] = useContext(DashContext)

  useEffect(() => {
    (async () => {
      dispatch({ type: 'FETCH_CARDS_INIT' })
      const { data, error } = await handleApi.getAll()
      if (data) dispatch({ type: 'FETCH_CARDS_SUCCESS', payload: data })
      if (error) dispatch({ type: 'FETCH_CARDS_ERROR', payload: error })
    })()
  }, [])

  return (
    <S.Container>
      <SearchBar />
      <Collumns />
    </S.Container>
  )
}