import { makeRequest } from '@/shared/service/api/make-request'

export function request<T>(url: string, params?: Record<string, unknown>) {
  return makeRequest<T>({
    url,
    params,
  })
}
