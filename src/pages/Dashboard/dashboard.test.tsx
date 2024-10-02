import { render, screen } from '@testing-library/react'
import { ReactNode } from 'react'
import { DashboardPage } from './dashboard'

jest.mock('./components', () => ({
  Collumns: ({ children }: { children: ReactNode }) => <>TEST_COLUMNS { children }</>,
  SearchBar: ({ children }: { children: ReactNode }) => <>TEST_SEARCH_BAR { children }</>
}))

jest.mock('./context', () => ({
  DashProvider: ({ children }: { children: ReactNode }) => <>DASH_PROVIDER { children }</>
}))

describe('pages/dashboard', () => {
  it('should render expected components', () => {
    render(<DashboardPage />)

    const contextProvider = screen.getByText(/DASH_PROVIDER/)
    const columns = screen.getByText(/TEST_COLUMNS/)
    const searchBar = screen.getByText(/TEST_SEARCH_BAR/)

    expect(contextProvider).toBeInTheDocument()
    expect(columns).toBeInTheDocument()
    expect(searchBar).toBeInTheDocument()
  })
})