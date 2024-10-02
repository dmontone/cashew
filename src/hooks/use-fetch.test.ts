import { renderHook, waitFor } from '@testing-library/react'
import axios from 'axios'
import { useFetch } from './use-fetch'

jest.mock('axios')
const mockAxios = (axios as unknown as jest.Mock)

describe('hooks/use-fetch', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('should return data after successfull fetch', async () => {
    const mockData = { test_key: 'TEST_VALUE' }
    mockAxios.mockResolvedValueOnce({ data: mockData })

    const { result } = renderHook(() => useFetch('test_url'))

    await waitFor(() => expect(result.current).toEqual({ loading: true, data: null, error: null }))
    await waitFor(() => expect(result.current).toEqual({ loading: false, data: { test_key: 'TEST_VALUE' }, error: null }))
  })

  it('should handle error', async () => {
    mockAxios.mockRejectedValueOnce(new Error('TEST_ERROR'))

    const { result } = renderHook(() => useFetch('test_url'))

    await waitFor(() => expect(result.current).toEqual({ loading: true, data: null, error: null }))
    await waitFor(() => expect(result.current).toEqual({ loading: false, data: null, error: 'TEST_ERROR' }))
  })
})