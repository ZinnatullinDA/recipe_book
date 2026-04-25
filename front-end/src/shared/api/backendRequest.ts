import type { AxiosRequestConfig, Method, ResponseType } from 'axios'
import { backendHttp } from '@/shared/service/api/backend-http'

interface BackendRequestConfig {
  url: string
  method?: Method
  responseType?: ResponseType
  headers?: Record<string, string>
  params?: Record<string, unknown>
  data?: unknown
  paramsSerializer?: AxiosRequestConfig['paramsSerializer']
}

export async function backendRequest<T>({
  url,
  method = 'GET',
  headers,
  params,
  data,
  responseType = 'json',
  paramsSerializer,
}: BackendRequestConfig): Promise<T> {
  const response = await backendHttp.request<T>({
    url,
    method,
    responseType,
    headers,
    params,
    data,
    paramsSerializer,
  })

  return response.data
}
