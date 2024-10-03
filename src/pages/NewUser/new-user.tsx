import * as S from "./styles"
import { HiOutlineArrowLeft } from "react-icons/hi"
import { Button, IconButton, TextField } from "~/components"
import { useHistory } from "react-router-dom"
import routes from "~/router/routes"
import { handleApi, masks, validations } from '~/utils'
import { FormEvent, useState } from 'react'

export const NewUserPage = () => {
  const [isFetching, setFetchingStatus] = useState<boolean>(false)
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [cpf, setCpf] = useState<string>('')
  const [date, setDate] = useState<string>('')
  const [errors, setErrors] = useState<string[]>([])

  const history = useHistory()
  const goToHome = () => {
    history.push(routes.dashboard)
  }

  const handleCpf = (value: string) =>
    value.length <= 14 && setCpf(masks.cpf(value))

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (isFetching)
      return

    const validationErrors: string[] = []
    if (!validations.isName(name)) validationErrors.push('name')
    if (!validations.isEmail(email)) validationErrors.push('email')
    if (!validations.isCpf(cpf)) validationErrors.push('cpf')
    if (date.length <= 0) validationErrors.push('date')
    setErrors(validationErrors)

    if (validationErrors.length <= 0) {
      const data: Omit<RegistrationType, 'id'> = {
        employeeName: name,
        email,
        cpf,
        admissionDate: date,
        status: 'REVIEW'
      }

      setFetchingStatus(true)
      await handleApi.createItem(data)
      setFetchingStatus(false)
      goToHome()
    }
  }

  return (
    <S.Container>
      <S.Card onSubmit={handleSubmit}>
        <IconButton onClick={() => goToHome()} aria-label="back">
          <HiOutlineArrowLeft size={24} />
        </IconButton>
        <TextField placeholder="Nome" id="name" label="Nome" value={name} onChange={e => setName(e.target.value)} error={errors.includes('name') ? 'Nome inválido' : ''} />
        <TextField placeholder="Email" id="email" label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} error={errors.includes('email') ? 'Email inválido' : ''} />
        <TextField placeholder="CPF" id="cpf" label="CPF" value={cpf} onChange={e => handleCpf(e.target.value)} error={errors.includes('cpf') ? 'Cpf inválido' : ''} />
        <TextField label="Data de admissão" id="date" type="date" value={date} onChange={e => setDate(e.target.value)} error={errors.includes('date') ? 'Data inválida' : ''} />
        <Button type='submit'>
          {!isFetching ? 'Cadastrar' : 'Aguarde...'}
        </Button>
      </S.Card>
    </S.Container>
  )
}
