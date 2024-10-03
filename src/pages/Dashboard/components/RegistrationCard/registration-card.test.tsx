import { DashContext } from '~/context'
import { RegistrationCard } from './registration-card'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { handleApi } from '~/utils'
import { act } from 'react'

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
const mockDelete = handleApi.updateStatus as jest.Mock


describe('pages/dashboard/components/registration-card', () => {
  const user = userEvent.setup()
  const renderWithContext = (registration: RegistrationType = mockRegistration, value: any = []) => render(
    <DashContext.Provider value={value}>
      <RegistrationCard {...registration} />
    </DashContext.Provider>
  )

  beforeEach(() => {
    jest.resetAllMocks()
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

  it('should dispatch, updateStatus and getAll correctly on approve action', async () => {
    const mockDispatch = jest.fn()
    mockUpdateStatus.mockResolvedValue({})
    mockGetAll.mockResolvedValue({ data: 'TEST_DATA', error: null })
    renderWithContext({ ...mockRegistration, status: 'REVIEW' }, [{}, mockDispatch])

    const approveButton = screen.getByText('Aprovar')
    
    await user.click(approveButton)

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'FETCH_CARDS_INIT' })
    expect(handleApi.updateStatus).toHaveBeenCalledWith('TEST_ID', { ...mockRegistration, status: 'APROVED' })
    expect(handleApi.getAll).toHaveBeenCalled()

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'FETCH_CARDS_SUCCESS', payload: 'TEST_DATA' })
    })
  })

  it('should dispatch, updateStatus and getAll correctly on reprove action', async () => {
    const mockDispatch = jest.fn()
    mockUpdateStatus.mockResolvedValue({})
    mockGetAll.mockResolvedValue({ data: 'TEST_DATA', error: null })
    renderWithContext({ ...mockRegistration, status: 'REVIEW' }, [{}, mockDispatch])

    const reproveButton = screen.getByText('Reprovar')
    
    await user.click(reproveButton)

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'FETCH_CARDS_INIT' })
    expect(handleApi.updateStatus).toHaveBeenCalledWith('TEST_ID', { ...mockRegistration, status: 'REPROVED' })
    expect(handleApi.getAll).toHaveBeenCalled()

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'FETCH_CARDS_SUCCESS', payload: 'TEST_DATA' })
    })
  })

  it('should dispatch, updateStatus and getAll correctly on review action', async () => {
    const mockDispatch = jest.fn()
    mockUpdateStatus.mockResolvedValue({})
    mockGetAll.mockResolvedValue({ data: 'TEST_DATA', error: null })
    renderWithContext({ ...mockRegistration, status: 'APROVED' }, [{}, mockDispatch])

    const reviewButton = screen.getByText(/Revisar novamente/)
    
    await user.click(reviewButton)

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'FETCH_CARDS_INIT' })
    expect(handleApi.updateStatus).toHaveBeenCalledWith('TEST_ID', { ...mockRegistration, status: 'REVIEW' })
    expect(handleApi.getAll).toHaveBeenCalled()

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'FETCH_CARDS_SUCCESS', payload: 'TEST_DATA' })
    })
  })

  it('should dispatch, delete and getAll correctly on delete action', async () => {
    const mockDispatch = jest.fn()
    mockDelete.mockResolvedValue({})
    mockGetAll.mockResolvedValue({ data: 'TEST_DATA', error: null })
    renderWithContext({ ...mockRegistration, status: 'APROVED' }, [{}, mockDispatch])

    const deleteButton = screen.getByLabelText('delete')
    
    await user.click(deleteButton)

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'FETCH_CARDS_INIT' })
    expect(handleApi.deleteItem).toHaveBeenCalledWith('TEST_ID')
    expect(handleApi.getAll).toHaveBeenCalled()

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'FETCH_CARDS_SUCCESS', payload: 'TEST_DATA' })
    })
  })

  it('should dispatch error on error', async () => {
    const mockDispatch = jest.fn()
    mockDelete.mockResolvedValue({})
    mockGetAll.mockResolvedValue({ data: null, error: 'TEST_ERROR' })
    renderWithContext({ ...mockRegistration, status: 'APROVED' }, [{}, mockDispatch])

    const deleteButton = screen.getByLabelText('delete')
    
    await user.click(deleteButton)

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'FETCH_CARDS_INIT' })
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'FETCH_CARDS_ERROR', payload: 'TEST_ERROR' })
    })
  })
})