import { HiRefresh } from "react-icons/hi"
import { useHistory } from "react-router-dom"
import { Button, IconButton, TextField } from "~/components"
import routes from "~/router/routes"
import * as S from "./styles"
import { DashContext } from '~/context'
import { useContext } from 'react'
import { handleApi } from '~/utils'

export const SearchBar = () => {
  const [, dispatch] = useContext(DashContext)
  const history = useHistory()

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser)
  }

  const reloadData = async () => {
    dispatch({ type: 'FETCH_CARDS_INIT' })
    const { data, error } = await handleApi.getAll()
    if (data) dispatch({ type: 'FETCH_CARDS_SUCCESS', payload: data })
    if (error) dispatch({ type: 'FETCH_CARDS_ERROR', payload: error })
  }

  return (
    <S.Container>
      <TextField placeholder="Digite um CPF válido" />
      <S.Actions>
        <IconButton aria-label="refetch" onClick={reloadData}>
          <HiRefresh />
        </IconButton>
        <Button onClick={() => goToNewAdmissionPage()}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  )
}
