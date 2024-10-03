import { FC, useContext } from 'react'
import { HiOutlineMail, HiOutlineUser, HiOutlineCalendar, HiOutlineTrash } from "react-icons/hi"
import { ButtonSmall } from '~/components'
import { DashContext } from '~/context'
import { handleApi } from '~/utils'
import * as S from "./styles"

export const RegistrationCard: FC<RegistrationType> = registration => {
  const { getAll, updateStatus, deleteItem } = handleApi
  const [, dispatch] = useContext(DashContext)

  const handleAction = async (newStatus: RegistrationStatuses) => {
    dispatch({ type: 'FETCH_CARDS_INIT' })
    await updateStatus(registration.id, { ...registration, status: newStatus })
    handleResult()
  }

  const handleDelete = async () => {
    dispatch({ type: 'FETCH_CARDS_INIT' })
    await deleteItem(registration.id)
    handleResult()
  }
  
  const handleResult = async () => {
    const { data, error } = await getAll()
    if (data) dispatch({ type: 'FETCH_CARDS_SUCCESS', payload: data })
    if (error) dispatch({ type: 'FETCH_CARDS_ERROR', payload: error })
  }

  return (
    <S.Card>
      <S.IconAndText>
        <HiOutlineUser />
        <h3>{registration.employeeName}</h3>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineMail />
        <p>{registration.email}</p>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineCalendar />
        <span>{registration.admissionDate}</span>
      </S.IconAndText>
      <S.Actions>
        {registration.status === 'REVIEW' && (
          <>
            <ButtonSmall bgcolor="rgb(255, 145, 154)" onClick={() => handleAction('REPROVED')}>Reprovar</ButtonSmall>
            <ButtonSmall bgcolor="rgb(155, 229, 155)" onClick={() => handleAction('APROVED')}>Aprovar</ButtonSmall>
          </>
        )}
        {registration.status !== 'REVIEW' && (
          <>
            <ButtonSmall bgcolor="#ff8858" onClick={() => handleAction('REVIEW')}>Revisar novamente</ButtonSmall>
          </>
        )}
        <HiOutlineTrash aria-label='delete' onClick={handleDelete} />
      </S.Actions>
    </S.Card>
  )
}
