import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'

interface useFetchResponse<T> {
  data: T | null
  loading: boolean
  error: string | null
}

export const useFetch = <T>(url: string, options?: AxiosRequestConfig): useFetchResponse<T> => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response: AxiosResponse<T> = await axios(url, options)
        setData(response.data)
      } catch (e) {
        const axiosError = e as AxiosError
        setData(null)
        setError(axiosError.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { data, loading, error }
}