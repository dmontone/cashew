declare type RegistrationStatuses = 'REVIEW' | 'APROVED' | 'REPROVED'

declare type RegistrationType = {
  admissionDate: string,
  email: string,
  employeeName: string,
  status: RegistrationStatuses,
  cpf: string,
  id: string
}