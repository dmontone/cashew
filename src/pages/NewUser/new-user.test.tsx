import { render, screen, waitFor } from '@testing-library/react'
import { NewUserPage } from './new-user'
import userEvent from '@testing-library/user-event'
import routes from '~/router/routes'

const mockHistoryPush = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}))

describe('pages/dashboard', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render expected form', () => {
    render(<NewUserPage />)

    const nameInput = screen.getByPlaceholderText(/Nome/)
    const emailInput = screen.getByPlaceholderText(/Email/)
    const cpfInput = screen.getByPlaceholderText(/CPF/)

    expect(nameInput).toBeInTheDocument()
    expect(emailInput).toBeInTheDocument()
    expect(cpfInput).toBeInTheDocument()
  })

  it('should go home when back button clicked', async () => {
    render(<NewUserPage />)

    const backButton = screen.getByLabelText(/back/)
    userEvent.click(backButton)

    await waitFor(() => {
      expect(mockHistoryPush).toHaveBeenCalledWith(routes.dashboard)
    })
  })

  it('should go home when register button clicked', async () => {
    render(<NewUserPage />)

    const registerButton = screen.getByText(/Cadastrar/)
    userEvent.click(registerButton)

    await waitFor(() => {
      expect(mockHistoryPush).toHaveBeenCalledWith(routes.dashboard)
    })
  })
})