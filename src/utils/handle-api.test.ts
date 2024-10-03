import { handleApi } from './handle-api'
import { axiosInstance } from '~/axios'
import { AxiosResponse } from 'axios'

jest.mock('~/axios', () => ({
  axiosInstance: {
    get: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
    post: jest.fn()
  }
}))

const mockGet = axiosInstance.get as jest.Mock
const mockPut = axiosInstance.put as jest.Mock
const mockDel = axiosInstance.delete as jest.Mock
const mockPost = axiosInstance.post as jest.Mock

describe('utils/handle-api', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return data on success createItem', async () => {
    mockPost.mockResolvedValueOnce({ data: 'TEST_DATA' })

    const result = await handleApi.createItem({} as RegistrationType)

    expect(axiosInstance.post).toHaveBeenCalledWith('', {})
    expect(result).toEqual({ data: 'TEST_DATA', error: null })
  })

  it('should return error on thrown createItem', async () => {
    mockPost.mockRejectedValueOnce({ message: 'TEST_ERROR' })

    const result = await handleApi.createItem({} as RegistrationType)

    expect(axiosInstance.post).toHaveBeenCalledWith('', {})
    expect(result).toEqual({ data: null, error: 'TEST_ERROR' })
  })

  it('should return data on success getAll', async () => {
    mockGet.mockResolvedValueOnce({ data: 'TEST_DATA' })

    const result = await handleApi.getAll()

    expect(axiosInstance.get).toHaveBeenCalledWith('')
    expect(result).toEqual({ data: 'TEST_DATA', error: null })
  })

  it('should return error on thrown getAll', async () => {
    mockGet.mockRejectedValueOnce({ message: 'TEST_ERROR' })

    const result = await handleApi.getAll()

    expect(axiosInstance.get).toHaveBeenCalledWith('')
    expect(result).toEqual({ data: null, error: 'TEST_ERROR' })
  })

  it('should return data on success updateStatus', async () => {
    mockPut.mockResolvedValueOnce({ data: 'TEST_DATA' })

    const result = await handleApi.updateStatus('TEST_ID', { status: 'REVIEW' } as RegistrationType)

    expect(axiosInstance.put).toHaveBeenCalledWith('TEST_ID', { status: 'REVIEW' })
    expect(result).toEqual({ data: ['TEST_DATA'], error: null })
  })

  it('should return error on thrown updateStatus', async () => {
    mockPut.mockRejectedValueOnce({ message: 'TEST_ERROR' })

    const result = await handleApi.updateStatus('1', {} as RegistrationType)

    expect(axiosInstance.put).toHaveBeenCalledWith('1', {})
    expect(result).toEqual({ data: null, error: 'TEST_ERROR' })
  })

  it('should return data on success deleteItem', async () => {
    mockDel.mockResolvedValueOnce({ data: 'TEST_DATA' })

    const result = await handleApi.deleteItem('TEST_ID')

    expect(axiosInstance.delete).toHaveBeenCalledWith('TEST_ID')
    expect(result).toEqual({ data: 'TEST_DATA', error: null })
  })

  it('should return error on thrown deleteItem', async () => {
    mockDel.mockRejectedValueOnce({ message: 'TEST_ERROR' })

    const result = await handleApi.deleteItem('1')

    expect(axiosInstance.delete).toHaveBeenCalledWith('1')
    expect(result).toEqual({ data: null, error: 'TEST_ERROR' })
  })
})