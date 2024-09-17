import { Collumns, SearchBar } from "./components"
import { DashboardProvider } from './context'
import * as S from "./styles"

export const DashboardPage = () => {
  return (
    <S.Container>
      <DashboardProvider>
        <SearchBar />
        <Collumns />
      </DashboardProvider>
    </S.Container>
  )
}
