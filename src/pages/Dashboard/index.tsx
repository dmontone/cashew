import { Collumns, SearchBar } from "./components"
import { DashProvider } from './context'
import * as S from "./styles"

export const DashboardPage = () => {
  return (
    <S.Container>
      <DashProvider>
        <SearchBar />
        <Collumns />
      </DashProvider>
    </S.Container>
  )
}
