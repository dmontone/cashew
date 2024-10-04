import { render, screen } from '@testing-library/react'
import { AppContext } from '~/context'
import { initialState } from '~/context/reducer-app'
import { Modal } from './modal'
import userEvent from '@testing-library/user-event'

describe('components/modal', () => {
  const mockDispatch = jest.fn()
  const renderWithContext = (value = initialState) => render(
    <AppContext.Provider value={[value, mockDispatch]}>
      <Modal />
    </AppContext.Provider>
  )

  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should not render if modal.isOpen is false', () => {
    renderWithContext({
      ...initialState,
      modal: {
        ...initialState.modal,
        title: 'TEST_TITLE',
        message: 'TEST_MESSAGE'
      }
    })

    const title = screen.queryByText(/TEST_TITLE/)
    const message = screen.queryByText(/TEST_MESSAGE/)

    expect(title).not.toBeInTheDocument()
    expect(message).not.toBeInTheDocument()
  })

  it('should render if modal.isOpen is true', () => {
    renderWithContext({
      ...initialState,
      modal: {
        ...initialState.modal,
        isOpen: true,
        title: 'TEST_TITLE',
        message: 'TEST_MESSAGE'
      }
    })

    const title = screen.getByText('TEST_TITLE')
    const message = screen.getByText(/TEST_MESSAGE/)

    expect(title).toBeInTheDocument()
    expect(message).toBeInTheDocument()
  })

  it('should call modal.onCancel when clicking on the backdrop', async () => {
    const mockCancel = jest.fn()
    renderWithContext({
      ...initialState,
      modal: {
        ...initialState.modal,
        isOpen: true,
        onCancel: mockCancel
      }
    })

    const backdrop = screen.getByTestId('backdrop') // Assuming that the `S.Backdrop` has `data-testid="backdrop"`
    await userEvent.click(backdrop)

    expect(mockCancel).toHaveBeenCalledTimes(1)
  })

  it('should call modal.onCancel when clicking on the cancel button', async () => {
    const mockCancel = jest.fn()
    renderWithContext({
      ...initialState,
      modal: {
        ...initialState.modal,
        isOpen: true,
        onCancel: mockCancel
      }
    })

    const cancelButton = screen.getByText('Cancelar') // Assuming that the `S.Backdrop` has `data-testid="backdrop"`
    await userEvent.click(cancelButton)

    expect(mockCancel).toHaveBeenCalledTimes(1)
  })

  it('should call modal.onConfirm when clicking on the confirm button', async () => {
    const mockConfirm = jest.fn()
    renderWithContext({
      ...initialState,
      modal: {
        ...initialState.modal,
        isOpen: true,
        onConfirm: mockConfirm
      }
    })

    const confirmButton = screen.getByText('Confirmar') // Assuming that the `S.Backdrop` has `data-testid="backdrop"`
    await userEvent.click(confirmButton)

    expect(mockConfirm).toHaveBeenCalledTimes(1)
  })

  it('should show waiting message if disabled', async () => {
    renderWithContext({
      ...initialState,
      modal: {
        ...initialState.modal,
        isOpen: true,
        isEnabled: false
      }
    })

    const confirmButton = screen.getByText('Aguarde...')
    expect(confirmButton).toBeInTheDocument()
  })
})