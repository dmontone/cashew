import { FC, useContext } from 'react'
import * as S from './styles'
import { AppContext } from '~/context'

export const Modal: FC = () => {
  const [{ modal }] = useContext(AppContext)

  if (!modal.isOpen)
    return <></>

  return (
    <S.Wrapper>
      <S.Backdrop data-testid='backdrop' onClick={() => modal.onCancel()} />
      <S.Content>
        <S.Header>
          <S.Title>{modal.title}</S.Title>
        </S.Header>
        <S.Body>
          {modal.message}
        </S.Body>
        <S.Footer>
          <S.Action
            color='#666'
            onClick={() => modal.isEnabled && modal.onCancel()}
            disabled={!modal.isEnabled}
          >
            Cancelar
          </S.Action>

          <S.Action
            bgcolor='#64a98c'
            color='white'
            onClick={() => modal.isEnabled && modal.onConfirm()}
            disabled={!modal.isEnabled}
          >
            {modal.isEnabled ? 'Confirmar' : 'Aguarde...'}
          </S.Action>
        </S.Footer>
      </S.Content>
    </S.Wrapper>
  )
}