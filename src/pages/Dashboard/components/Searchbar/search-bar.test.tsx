import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SearchBar } from './search-bar'
import routes from '~/router/routes'

const mockHistoryPush = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}))

describe('components/search-bar', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render search input and new item button', () => {
    render(<SearchBar />)

    const input = screen.getByPlaceholderText(/Digite um CPF válido/)
    const newButton = screen.getByText(/Nova Admissão/)

    expect(input).toBeInTheDocument()
    expect(newButton).toBeInTheDocument()
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