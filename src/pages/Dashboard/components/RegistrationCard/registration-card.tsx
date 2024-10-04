import { FC, useContext } from 'react'
import { HiOutlineMail, HiOutlineUser, HiOutlineCalendar, HiOutlineTrash } from "react-icons/hi"
import { ButtonSmall } from '~/components'
import { DashContext } from '~/context'
import { handleApi } from '~/utils'
import * as S from "./styles"
import { useModal } from '~/hooks'

export const RegistrationCard: FC<RegistrationType> = registration => {
  const { getAll, updateStatus, deleteItem } = handleApi
  const [{ isFetching }, dispatch] = useContext(DashContext)
  const handleModal = useModal()

  const handleAction = async (newStatus: RegistrationStatuses | 'DELETE') => {
    const statusMap: { [K in RegistrationStatuses]: string } = {
      'REVIEW': 'pronto para revisar',
      'APROVED': 'aprovado',
      'REPROVED': 'reprovado'
    }

    const title = newStatus === 'DELETE' ? 'Excluir registro' : 'Alteração de status'
    const message = newStatus === 'DELETE'
      ? `Excluindo o registro de ${registration.employeeName}...`
      : `Alterando o registro de ${registration.employeeName} de ${statusMap[registration.status]} para ${statusMap[newStatus]}...`

    handleModal.open({
      title,
      message,
      onCancel: () => handleModal.close(),
      onConfirm: async () => {
        handleModal.disable()
        dispatch({ type: 'FETCH_CARDS_INIT' })
        if (newStatus === 'DELETE')
          await deleteItem(registration.id)
        else
          await updateStatus(registration.id, { ...registration, status: newStatus })
        handleModal.close()

        const { data, error } = await getAll()
        if (data) dispatch({ type: 'FETCH_CARDS_SUCCESS', payload: data })
        if (error) dispatch({ type: 'FETCH_CARDS_ERROR', payload: error })
      }
    })
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
            <ButtonSmall disabled={isFetching} bgcolor="rgb(255, 145, 154)" onClick={() => !isFetching && handleAction('REPROVED')}>Reprovar</ButtonSmall>
            <ButtonSmall disabled={isFetching} bgcolor="rgb(155, 229, 155)" onClick={() => !isFetching && handleAction('APROVED')}>Aprovar</ButtonSmall>
          </>
        )}
        {registration.status !== 'REVIEW' && (
          <>
            <ButtonSmall disabled={isFetching} bgcolor="#ff8858" onClick={() => !isFetching && handleAction('REVIEW')}>Revisar novamente</ButtonSmall>
          </>
        )}
        <HiOutlineTrash aria-label='delete' onClick={() => !isFetching && handleAction('DELETE')} />
      </S.Actions>
    </S.Card>
  )
}
