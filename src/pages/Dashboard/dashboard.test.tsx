import { render, screen, waitFor } from '@testing-library/react'
import { ReactNode } from 'react'
import { DashboardPage } from './dashboard'
import { handleApi } from '~/utils'
import { DashContext } from '~/context'
import { DashStateType } from '~/context/types'

jest.mock('./components', () => ({
  Collumns: ({ children }: { children: ReactNode }) => <>TEST_COLUMNS {children}</>,
  SearchBar: ({ children }: { children: ReactNode }) => <>TEST_SEARCH_BAR {children}</>
}))

jest.mock('~/utils', () => ({
  handleApi: {
    getAll: jest.fn()
  }
}))

const mockGetAll = handleApi.getAll as jest.Mock

describe('pages/dashboard', () => {
  const renderWithContext = (value: [DashStateType, jest.Mock]) => render(
    <DashContext.Provider value={value}>
      <DashboardPage />
    </DashContext.Provider>
  )

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render expected components', () => {
    mockGetAll.mockReturnValueOnce({ loading: false, error: null, data: null })
    render(<DashboardPage />)

    const columns = screen.getByText(/TEST_COLUMNS/)
    const searchBar = screen.getByText(/TEST_SEARCH_BAR/)

    expect(columns).toBeInTheDocument()
    expect(searchBar).toBeInTheDocument()
  })

  it('should call dispatches correctly on success', () => {
    const mockDispatch = jest.fn()
    mockGetAll.mockReturnValueOnce({ loading: false, error: null, data: { TEST_KEY: 'TEST_VALUE' } })
    renderWithContext([{} as DashStateType, mockDispatch])

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'FETCH_CARDS_INIT' })
    waitFor(() => { expect(mockDispatch).toHaveBeenCalledWith({ type: 'FETCH_CARDS_SUCCESS', payload: { TEST_KEY: 'TEST_VALUE' } }) })
  })

  it('should call dispatches correctly on error', () => {
    const mockDispatch = jest.fn()
    mockGetAll.mockReturnValueOnce({ loading: false, error: { TEST_KEY: 'TEST_VALUE' }, data: null })
    renderWithContext([{} as DashStateType, mockDispatch])

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'FETCH_CARDS_INIT' })
    waitFor(() => { expect(mockDispatch).toHaveBeenCalledWith({ type: 'FETCH_CARDS_ERROR', payload: { TEST_KEY: 'TEST_VALUE' } }) })
  })
})