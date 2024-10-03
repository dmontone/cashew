import { AxiosError, AxiosResponse } from 'axios'
import { axiosInstance } from '~/axios'

const createItem = async (data: Omit<RegistrationType, 'id'>) => {
  try {
    const response = await axiosInstance.post('', data)
    return { data: response.data, error: null }
  } catch (e) {
    const error = e as AxiosError
    return { data: null, error: error.message }
  }
}

const getAll = async () => {
  try {
    const response: AxiosResponse<RegistrationType[]> = await axiosInstance.get('')
    return { data: response.data, error: null }
  } catch (e) {
    const error = e as AxiosError
    return { data: null, error: error.message }
  }
}

const updateStatus = async (id: string, data: RegistrationType) => {
  try {
    const response: AxiosResponse<RegistrationType, string> = await axiosInstance.put(id, data)
    return { data: [response.data], error: null }
  } catch (e) {
    const error = e as AxiosError
    return { data: null, error: error.message }
  }
}

const deleteItem = async (id: string) => {
  try {
    const response = await axiosInstance.delete(id)
    return { data: response.data, error: null }
  } catch (e) {
    const error = e as AxiosError
    return { data: null, error: error.message }
  }
}

export const handleApi = {
  getAll,
  updateStatus,
  deleteItem,
  createItem
}