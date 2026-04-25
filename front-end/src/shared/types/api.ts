import type { ResponseType } from 'axios'

export interface BaseApiTyped<T, K, U, I = any> {
  getOne: (id: number | string) => Promise<I>
  getAll: (params?: K, additional_endpoint?: string) => Promise<TableData<T>>
  update: (id: number | string, data: Partial<Omit<U, 'id'>>) => Promise<I>
  remove: (id: number | string) => Promise<unknown>
  create: (data: Partial<U>) => Promise<I>
  createFile: (id: number | string, type: string) => Promise<T>
  createReport: (data: any, endpoint: string) => Promise<T>
  createFileJpeg: (data: any, endpoint: string) => Promise<T>
}

export interface BaseApi {
  endpoint?: string
  methods?: string[]

  getOne: (id: number | string) => Promise<any>

  getAll: (params: any, additional_endpoint?: string) => Promise<any>

  update: (id: number | string, data: any) => Promise<any>

  remove: (id: number | string) => Promise<any>

  create: (data: any) => Promise<any>
}

export interface ErrorResponse {
  attr: string
  code: string
  detail: string
}

// export interface BaseResponse<T> {
//   data: T
//   status?: string
//   errors?: ErrorResponse[]
// }
export interface BaseResponse<T> {
  status: string
  node: string
  protocol: string
  timestamp: string
  count?: number
  action?: string
  data: T
}

export interface TableData<T> {
  page: number
  total_pages: number
  count: number
  results: T[]
  success: boolean
  message: string
}

export interface PaginatedResponse<T> {
  count: number
  page: number
  total_pages: number
  results: T[]
}

export interface Request {
  url: string
  method?: string
  responseType?: ResponseType
  headers?: any
  params?: any
  data?: any
  paramsSerializer?: (params: object | string) => string
}
