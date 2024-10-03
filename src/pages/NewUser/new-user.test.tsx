import { render, screen, waitFor } from '@testing-library/react'
import { NewUserPage } from './new-user'
import userEvent from '@testing-library/user-event'
import routes from '~/router/routes'
import { act } from 'react'
import { handleApi } from '~/utils'

jest.mock('~/utils', () => ({
  ...jest.requireActual('~/utils'),
  handleApi: {
    createItem: jest.fn(),
  },
}))
const mockCreateItem = handleApi.createItem as jest.Mock


const mockHistoryPush = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}))

describe('pages/dashboard', () => {
  const user = userEvent.setup()

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

  it('should display validation errors for empty fields on submit', async () => {
    render(<NewUserPage />)

    const registerButton = screen.getByText(/Cadastrar/)
    await user.click(registerButton)

    expect(await screen.findByText(/Nome inválido/)).toBeInTheDocument()
    expect(await screen.findByText(/Email inválido/)).toBeInTheDocument()
    expect(await screen.findByText(/Cpf inválido/)).toBeInTheDocument()
    expect(await screen.findByText(/Data inválida/)).toBeInTheDocument()
  })

  it('should call createItem API and go home when form is valid', async () => {
    render(<NewUserPage />)

    const nameInput = screen.getByPlaceholderText(/Nome/)
    const emailInput = screen.getByPlaceholderText(/Email/)
    const cpfInput = screen.getByPlaceholderText(/CPF/)
    const admissionDateInput = screen.getByLabelText(/Data de admissão/)
    const registerButton = screen.getByText(/Cadastrar/)

    // Fill in valid data
    await userEvent.type(nameInput, 'Test Name')
    await userEvent.type(emailInput, 'email@example.com')
    await userEvent.type(cpfInput, '123.456.789-09')
    await userEvent.type(admissionDateInput, '2023-10-01')

    userEvent.click(registerButton)

    await waitFor(() => {
      expect(handleApi.createItem).toHaveBeenCalledTimes(1)
      expect(handleApi.createItem).toHaveBeenCalledWith({
        employeeName: 'Test Name',
        email: 'email@example.com',
        cpf: '123.456.789-09',
        admissionDate: '2023-10-01',
        status: 'REVIEW',
      })
      expect(mockHistoryPush).toHaveBeenCalledWith(routes.dashboard)
    })
  })
  
  it('should not call createItem API and go home if form is fetching', async () => {
    mockCreateItem.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)))
    render(<NewUserPage />)

    const nameInput = screen.getByPlaceholderText(/Nome/)
    const emailInput = screen.getByPlaceholderText(/Email/)
    const cpfInput = screen.getByPlaceholderText(/CPF/)
    const admissionDateInput = screen.getByLabelText(/Data de admissão/)
    const registerButton = screen.getByText(/Cadastrar/)

    // Fill in valid data
    await userEvent.type(nameInput, 'Test Name')
    await userEvent.type(emailInput, 'email@example.com')
    await userEvent.type(cpfInput, '123.456.789-09')
    await userEvent.type(admissionDateInput, '2023-10-01')


    await user.click(registerButton)
    user.click(registerButton)

    await waitFor(() => {
      expect(handleApi.createItem).toHaveBeenCalledTimes(1)
      expect(mockHistoryPush).toHaveBeenCalledTimes(1)
    })
  })

  it('should show loading state when submitting', async () => {
    mockCreateItem.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)))
    render(<NewUserPage />)

    const nameInput = screen.getByPlaceholderText(/Nome/)
    const emailInput = screen.getByPlaceholderText(/Email/)
    const cpfInput = screen.getByPlaceholderText(/CPF/)
    const admissionDateInput = screen.getByLabelText(/Data de admissão/)
    const registerButton = screen.getByText(/Cadastrar/)

    await userEvent.type(nameInput, 'Test Name')
    await userEvent.type(emailInput, 'email@example.com')
    await userEvent.type(cpfInput, '123.456.789-09')
    await userEvent.type(admissionDateInput, '2023-10-01')


    await user.click(registerButton)

    expect(registerButton).toHaveTextContent(/Aguarde.../)
    await waitFor(() => {
      expect(registerButton).toHaveTextContent(/Cadastrar/)
    })
  })
})