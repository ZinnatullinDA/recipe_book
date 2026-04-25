export const SERVICE_METHOD_ERRORS = {
  GET: 'Метод получения данных с сервера не обьявлен',
  UPDATE: 'Метод обновления данных на сервере не обьявлен',
  POST: 'Метод создания данных на сервере не обьявлен',
  DELETE: 'Метод удаления данных на сервере не обьявлен',
} as const

export const API_METHODS = {
  GET: 'GET',
  DELETE: 'DELETE',
  PARTIAL_UPDATE: 'PATCH',
  UPDATE: 'PUT',
  POST: 'POST',
} as const
