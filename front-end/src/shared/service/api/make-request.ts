import type { AxiosRequestConfig, Method, ResponseType } from 'axios'
import { http } from './http'

export interface RequestConfig {
  url: string
  method?: Method
  responseType?: ResponseType
  headers?: Record<string, string>
  params?: Record<string, unknown>
  data?: unknown
  token?: string
  paramsSerializer?: AxiosRequestConfig['paramsSerializer']
}

export async function makeRequest<T>({
  url,
  method = 'GET',
  headers,
  params,
  data,
  token,
  responseType = 'json',
  paramsSerializer,
}: RequestConfig): Promise<T> {
  const response = await http.request<T>({
    url,
    method,
    responseType,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    params,
    data,
    paramsSerializer,
  })

  return response.data
}
