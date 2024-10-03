import { render, screen, waitFor } from '@testing-library/react'
import React, { ReactNode } from 'react'
import { DashboardPage } from './dashboard'
import { useFetch } from '~/hooks'

jest.mock('./components', () => ({
  ...jest.requireActual('~/hooks'),
  Collumns: ({ children }: { children: ReactNode }) => <>TEST_COLUMNS {children}</>,
  SearchBar: ({ children }: { children: ReactNode }) => <>TEST_SEARCH_BAR {children}</>
}))

jest.mock('~/hooks', () => ({
  ...jest.requireActual('~/hooks'),
  useFetch: jest.fn()
}))

const mockUseFetch = useFetch as jest.Mock

describe('pages/dashboard', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render expected components', () => {
    mockUseFetch.mockReturnValueOnce({ loading: false, error: null, data: null })
    render(<DashboardPage />)

    const columns = screen.getByText(/TEST_COLUMNS/)
    const searchBar = screen.getByText(/TEST_SEARCH_BAR/)

    expect(columns).toBeInTheDocument()
    expect(searchBar).toBeInTheDocument()
  })

  it('should dispatch FETCH_CARDS_INIT on first load', () => {
    mockUseFetch.mockReturnValueOnce({ loading: true, data: null, error: null })
    const mockDispatch = jest.fn()
    jest.spyOn(React, 'useContext').mockReturnValueOnce([{}, mockDispatch])

    render(<DashboardPage />)

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'FETCH_CARDS_INIT' })
  })

  it('should dispatch FETCH_CARDS_SUCCESS on successfull load', async () => {
    mockUseFetch.mockReturnValueOnce({ loading: false, error: null, data: 'TEST_DATA' })
    const mockDispatch = jest.fn()
    jest.spyOn(React, 'useContext').mockReturnValueOnce([{}, mockDispatch])

    render(<DashboardPage />)

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'FETCH_CARDS_SUCCESS', payload: 'TEST_DATA' })
    })
  })

  it('should dispatch FETCH_CARDS_ERROR when it fails', async () => {
    mockUseFetch.mockReturnValueOnce({ loading: false, error: 'TEST_ERROR', data: null })
    const mockDispatch = jest.fn()
    jest.spyOn(React, 'useContext').mockReturnValueOnce([{}, mockDispatch])

    render(<DashboardPage />)

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'FETCH_CARDS_ERROR', payload: 'TEST_ERROR' })
    })
  })
})