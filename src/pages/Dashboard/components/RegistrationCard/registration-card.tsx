import { FC } from 'react'
import { ButtonSmall } from '~/components'
import * as S from "./styles"
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi"

export const RegistrationCard: FC<Partial<RegistrationType>> = ({
  admissionDate,
  email,
  employeeName,
  status
}) => {
  return (
    <S.Card>
      <S.IconAndText>
        <HiOutlineUser />
        <h3>{employeeName}</h3>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineMail />
        <p>{email}</p>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineCalendar />
        <span>{admissionDate}</span>
      </S.IconAndText>
      <S.Actions>
        {status !== 'REPROVED' && <ButtonSmall bgcolor="rgb(255, 145, 154)" >Reprovar</ButtonSmall>}
        {status !== 'APROVED' && <ButtonSmall bgcolor="rgb(155, 229, 155)">Aprovar</ButtonSmall>}
        {status !== 'REVIEW' && <ButtonSmall bgcolor="#ff8858">Revisar novamente</ButtonSmall>}

        <HiOutlineTrash />
      </S.Actions>
    </S.Card>
  )
}
