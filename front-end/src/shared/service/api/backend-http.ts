import axios from 'axios'
import { BACKEND_API_URL } from '@/shared/api/backendConfig'

export const backendHttp = axios.create({
  baseURL: BACKEND_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})
