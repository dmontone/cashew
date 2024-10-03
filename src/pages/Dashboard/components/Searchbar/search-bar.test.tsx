import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SearchBar } from './search-bar'
import routes from '~/router/routes'
import { handleApi } from '~/utils'
import { DashContext } from '~/context'
import { DashStateType } from '~/context/types'

const mockHistoryPush = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}))

jest.mock('~/utils', () => ({
  handleApi: {
    getAll: jest.fn()
  }
}))
const mockGetAll = handleApi.getAll as jest.Mock

describe('components/search-bar', () => {
  const user = userEvent.setup()
  const mockDispatch = jest.fn()
  const renderWithContext = (value: DashStateType = {} as DashStateType) => render(
    <DashContext.Provider value={[value, mockDispatch]}>
      <SearchBar />
    </DashContext.Provider>
  )

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render search input and new item button', () => {
    render(<SearchBar />)

    const input = screen.getByPlaceholderText(/Digite um CPF válido/)
    const refreshButton = screen.getByLabelText(/refetch/)
    const newButton = screen.getByText(/Nova Admissão/)

    expect(input).toBeInTheDocument()
    expect(refreshButton).toBeInTheDocument()
    expect(newButton).toBeInTheDocument()
  })

  it('should api call on refresh button click', async () => {
    mockGetAll.mockResolvedValueOnce({ data: 'TEST_DATA', error: null })
    renderWithContext()

    const newButton = screen.getByLabelText(/refetch/)
    await user.click(newButton)

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'FETCH_CARDS_INIT' })
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'FETCH_CARDS_SUCCESS', payload: 'TEST_DATA' })
      expect(mockGetAll).toHaveBeenCalled()
    })
  })

  it('should api call error on refresh button click', async () => {
    mockGetAll.mockResolvedValueOnce({ data: null, error: 'TEST_ERROR' })
    renderWithContext()

    const newButton = screen.getByLabelText(/refetch/)
    await user.click(newButton)

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'FETCH_CARDS_INIT' })
    await waitFor(() => {
      expect(mockGetAll).toHaveBeenCalled()
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'FETCH_CARDS_ERROR', payload: 'TEST_ERROR' })
    })
  })

  it('should push new url on button click', async () => {
    render(<SearchBar />)

    const newButton = screen.getByText(/Nova Admissão/)
    userEvent.click(newButton)

    await waitFor(() => {
      expect(mockHistoryPush).toHaveBeenCalledWith(routes.newUser)
    })
  })
})