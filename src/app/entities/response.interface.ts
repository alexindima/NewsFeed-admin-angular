export interface OperationResponse<T> {
  data: T,
  success: boolean,

  // вижу, что месседж может вообще не приходить, тогда стоит ставить его опциональность, чтобы тайпскрипт, где надо, это учитывал
  // >> я бы лучше сделал фабрику типа toResponse() чтобы поменьше использовать оператор опциональности, от него много бед
  message: string,
}

export interface Paginated<T> {
  data: T[],
  total: number,
}

export interface ErrorData {
  [key: string]: string[];
}
