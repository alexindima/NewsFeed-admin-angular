export interface OperationResponse<T> {
  data: T,
  success: boolean,
  message: string, // вижу, что месседж может вообще не приходить, тогда стоит ставить его опциональность, чтобы тайпскрипт, где надо, это учитывал
}

export interface Paginated<T> {
  data: T[],
  total: number,
}

export interface ErrorData {
  [key: string]: string[];
}
