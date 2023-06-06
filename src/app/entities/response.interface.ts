export interface OperationResponse<T> {
  data: T,
  success: boolean,
  message: string,
}

export interface Paginated<T> {
  data: T[],
  total: number,
}

export interface ErrorData {
  [key: string]: string[];
}
