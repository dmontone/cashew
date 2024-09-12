import * as S from "./styles";
import { ALL_COLUMNS } from './constants'
import { RegistrationCard } from "../RegistrationCard";

type Props = {
  registrations?: Registration[];
};

export const Collumns = ({ registrations }: Props) => {
  return (
    <S.Container>
      {ALL_COLUMNS.map((column) => {
        return (
          <S.Column status={column.status} key={column.title}>
            <>
              <S.TitleColumn status={column.status}>
                {column.title}
              </S.TitleColumn>
              <S.CollumContent>
                {registrations?.map((registration) => {
                  return (
                    <RegistrationCard
                      data={registration}
                      key={registration.id}
                    />
                  );
                })}
              </S.CollumContent>
            </>
          </S.Column>
        );
      })}
    </S.Container>
  );
};
