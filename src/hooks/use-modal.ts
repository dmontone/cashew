import { useContext } from 'react'
import { AppContext } from '~/context'

type OpenProps = {
  title: string,
  message: string,
  onCancel: () => void,
  onConfirm: () => void
}

export const useModal = () => {
  const [, dispatch] = useContext(AppContext)

  const open = (props: OpenProps): void => {
    dispatch({ type: 'MODAL_OPEN', payload: props })
  }

  const close = (): void => {
    dispatch({ type: 'MODAL_CLOSE' })
  }

  const disable = () => dispatch({ type: 'MODAL_DISABLE' })

  return {
    open,
    close,
    disable
  }
}