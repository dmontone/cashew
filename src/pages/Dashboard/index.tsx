import { Collumns, SearchBar } from "./components";
import * as S from "./styles";

export const DashboardPage = () => {
  return (
    <S.Container>
      <SearchBar />
      <Collumns registrations={[]} />
    </S.Container>
  );
};
