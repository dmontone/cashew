import { DashContext } from '~/context'
import { RegistrationCard } from './registration-card'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { handleApi } from '~/utils'
import { DashStateType } from '~/context/types'

const mockRegistration: RegistrationType = {
  admissionDate: '01/01/2000',
  email: 'TEST_EMAIL',
  employeeName: 'TEST_EMPLOYEE_NAME',
  status: 'REVIEW',
  cpf: 'TEST_CPF',
  id: 'TEST_ID',
}

jest.mock('~/utils', () => ({
  handleApi: {
    updateStatus: jest.fn(),
    deleteItem: jest.fn(),
    getAll: jest.fn(),
  },
}))
const mockGetAll = handleApi.getAll as jest.Mock
const mockUpdateStatus = handleApi.updateStatus as jest.Mock
const mockDelete = handleApi.deleteItem as jest.Mock

const mockOpen = jest.fn()
const mockClose = jest.fn()
const mockDisable = jest.fn()
jest.mock('~/hooks', () => ({
  useModal: () => ({
    open: mockOpen,
    close: mockClose,
    disable: mockDisable
  })
}))



describe('pages/dashboard/components/registration-card', () => {
  const user = userEvent.setup()
  const mockDispatch = jest.fn()
  const renderWithContext = (registration: RegistrationType = mockRegistration, value: [DashStateType, jest.Mock] = [{} as DashStateType, mockDispatch]) => render(
    <DashContext.Provider value={value}>
      <RegistrationCard {...registration} />
    </DashContext.Provider>
  )

  beforeEach(() => {
    jest.resetAllMocks()
    mockGetAll.mockResolvedValue({ data: 'TEST_DATA', error: null })
    mockUpdateStatus.mockResolvedValue({})
    mockDelete.mockResolvedValue({})
  })

  it('should render admission date, employeeName and email as properties', () => {
    renderWithContext()

    const admissionDate = screen.getByText(/01\/01\/2000/)
    const email = screen.getByText(/TEST_EMAIL/)
    const employeeName = screen.getByText(/TEST_EMPLOYEE_NAME/)

    expect(admissionDate).toBeInTheDocument()
    expect(email).toBeInTheDocument()
    expect(employeeName).toBeInTheDocument()
  })

  it('should render Approve and Reprove buttons if status is REVIEW', () => {
    renderWithContext({ ...mockRegistration, status: 'REVIEW' })

    const approveButton = screen.queryByText(/Aprovar/)
    const reproveButton = screen.queryByText(/Reprovar/)
    const reviewButton = screen.queryByText(/Revisar novamente/)

    expect(approveButton).toBeInTheDocument()
    expect(reproveButton).toBeInTheDocument()
    expect(reviewButton).not.toBeInTheDocument()
  })

  it('should render "Revisar novamente" button if status is not REVIEW', () => {
    renderWithContext({ ...mockRegistration, status: 'APROVED' })

    const approveButton = screen.queryByText(/Aprovar/)
    const reproveButton = screen.queryByText(/Reprovar/)
    const reviewButton = screen.queryByText(/Revisar novamente/)

    expect(approveButton).not.toBeInTheDocument()
    expect(reproveButton).not.toBeInTheDocument()
    expect(reviewButton).toBeInTheDocument()
  })

  it('should call modal with correct texts on aprove click', async () => {
    renderWithContext({ ...mockRegistration, status: 'REVIEW' })

    const aproveButton = screen.getByText('Aprovar')
    await user.click(aproveButton)

    expect(mockOpen).toHaveBeenCalledTimes(1)
    expect(mockOpen).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Alteração de status',
      message: 'Alterando o registro de TEST_EMPLOYEE_NAME de pronto para revisar para aprovado...',
    }))
  })

  it('should call modal with correct texts on reprove click', async () => {
    renderWithContext({ ...mockRegistration, status: 'REVIEW' })

    const reproveButton = screen.getByText('Reprovar')
    await user.click(reproveButton)

    expect(mockOpen).toHaveBeenCalledTimes(1)
    expect(mockOpen).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Alteração de status',
      message: 'Alterando o registro de TEST_EMPLOYEE_NAME de pronto para revisar para reprovado...',
    }))
  })

  it('should call modal with correct texts on review click', async () => {
    renderWithContext({ ...mockRegistration, status: 'APROVED' })

    const reviewButton = screen.getByText(/Revisar novamente/)
    await user.click(reviewButton)

    expect(mockOpen).toHaveBeenCalledTimes(1)
    expect(mockOpen).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Alteração de status',
      message:  'Alterando o registro de TEST_EMPLOYEE_NAME de aprovado para pronto para revisar...',
    }))
  })

  it('should call modal with correct texts on delete click', async () => {
    renderWithContext({ ...mockRegistration, status: 'APROVED' })

    const deleteButton = screen.getByLabelText(/delete/)
    await user.click(deleteButton)

    expect(mockOpen).toHaveBeenCalledTimes(1)
    expect(mockOpen).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Excluir registro',
      message:  'Excluindo o registro de TEST_EMPLOYEE_NAME...',
    }))
  })

  it('should call modal with correct onCancel function, calling modal close', async () => {
    renderWithContext({ ...mockRegistration, status: 'APROVED' })

    const reviewButton = screen.getByText(/Revisar novamente/)
    await user.click(reviewButton)

    const mockOpenProps = mockOpen.mock.lastCall[0]
    mockOpenProps.onCancel()

    expect(mockClose).toHaveBeenCalledTimes(1)
  })

  it('should call modal with correct onConfirm call sequence', async () => {
    mockGetAll.mockResolvedValueOnce({ data: {}, error: null })
    renderWithContext({ ...mockRegistration, status: 'APROVED' })

    const reviewButton = screen.getByText(/Revisar novamente/)
    await user.click(reviewButton)

    const mockOpenProps = mockOpen.mock.lastCall[0]
    mockOpenProps.onConfirm()

    expect(mockDisable).toHaveBeenCalledTimes(1)
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'FETCH_CARDS_INIT' })
    
    await waitFor(() => {
      expect(mockUpdateStatus).toHaveBeenCalledWith('TEST_ID', { ...mockRegistration, status: 'REVIEW' })
      expect(mockGetAll).toHaveBeenCalledTimes(1)
    })
    expect(mockClose).toHaveBeenCalledTimes(1)
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'FETCH_CARDS_SUCCESS', payload: {}})
  })

  it('should call modal with correct onConfirm call sequence at deletion', async () => {
    mockGetAll.mockResolvedValueOnce({ data: {}, error: null })
    renderWithContext({ ...mockRegistration, status: 'APROVED' })

    const deleteButton = screen.getByLabelText(/delete/)
    await user.click(deleteButton)

    const mockOpenProps = mockOpen.mock.lastCall[0]
    mockOpenProps.onConfirm()

    expect(mockDisable).toHaveBeenCalledTimes(1)
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'FETCH_CARDS_INIT' })
    
    await waitFor(() => {
      expect(mockDelete).toHaveBeenCalledWith('TEST_ID')
      expect(mockGetAll).toHaveBeenCalledTimes(1)
    })
    expect(mockClose).toHaveBeenCalledTimes(1)
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'FETCH_CARDS_SUCCESS', payload: {}})
  })

  it('should dispatch error on refetch error', async () => {
    mockGetAll.mockResolvedValueOnce({ data: null, error: 'TEST_ERROR' })
    renderWithContext({ ...mockRegistration, status: 'APROVED' })

    const deleteButton = screen.getByLabelText(/delete/)
    await user.click(deleteButton)

    const mockOpenProps = mockOpen.mock.lastCall[0]
    mockOpenProps.onConfirm()
    
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'FETCH_CARDS_ERROR', payload: 'TEST_ERROR'})
    })
  })
})