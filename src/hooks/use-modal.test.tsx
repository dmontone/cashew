import { renderHook } from '@testing-library/react'
import { act, FC, ReactNode } from 'react'
import { AppContext } from '~/context'
import { AppStateType } from '~/context/types'
import { useModal } from './use-modal'

describe('hooks/useModal', () => {
  const mockDispatch = jest.fn()

  const wrapper: FC<{ children: ReactNode }> = ({ children }) => (
    <AppContext.Provider value={[{} as AppStateType, mockDispatch]}>
      {children}
    </AppContext.Provider>
  )

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should open the modal with the correct props', () => {
    const { result } = renderHook(() => useModal(), { wrapper })

    act(() => result.current.open({
      title: 'TEST_TITLE',
      message: 'TEST_MESSAGE',
      onCancel: jest.fn(),
      onConfirm: jest.fn()
    }))

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'MODAL_OPEN',
      payload: expect.objectContaining({
        title: 'TEST_TITLE',
        message: 'TEST_MESSAGE'
      })
    })
  })

  it('should close the modal with the correct props', () => {
    const { result } = renderHook(() => useModal(), { wrapper })

    act(() => result.current.close())

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'MODAL_CLOSE' })
  })

  it('should disable the modal with the correct props', () => {
    const { result } = renderHook(() => useModal(), { wrapper })

    act(() => result.current.disable())

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'MODAL_DISABLE' })
  })
})