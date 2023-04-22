export interface User {
  createdAt?: string;
  updatedAt?: string;
  id?: number,
  role: string;
  email: string,
  password?: string,
  name: string
  categories: string[];
  tags: string[];
}

export interface LoginUser {
  email: string
  password: string,
}

export interface OperationResponse<T> {
  data: T,
  success: boolean,
  message: string,
}
export interface Category {
  id: number,
  name: string
}

export interface Tag {
  id: number;
  name: string;
}

export interface Article {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  mainTitle: string;
  secondTitle: string;
  photoPass: string;
  photoText: string;
  body: string;
  category: string;
  tags: string[];
}

export interface Paginated<T> {
  data: T[],
  total: number,
}

export interface PaginatorSettings {
  length: number,
  pageSize: number,
  pageIndex: number,
}

export interface NameableWithId {
  name: string;
  id?: number
}
