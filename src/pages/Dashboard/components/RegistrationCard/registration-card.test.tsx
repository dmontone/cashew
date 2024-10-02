import { RegistrationCard } from './registration-card';
import { render, screen } from '@testing-library/react'

const PROPS = {
    admissionDate: '01/01/2001',
    email: 'TEST_EMAIL',
    employeeName: 'TEST_EMPLOYEE_NAME',
    status: 'TEST_STATUS' as RegistrationStatuses,
    cpf: 'TEST_CPF',
    id: 'TEST_ID',
}

describe('pages/dashboard/components/registration-card', () => {
  it('should render admission date, employeeName and email as properties', () => {
    render(<RegistrationCard {...PROPS} />)

    const admissionDate = screen.getByText(/01\/01\/2001/)
    const email = screen.getByText(/TEST_EMAIL/)
    const employeeName = screen.getByText(/TEST_EMPLOYEE_NAME/)

    expect(admissionDate).toBeInTheDocument()
    expect(email).toBeInTheDocument()
    expect(employeeName).toBeInTheDocument()
  })
})