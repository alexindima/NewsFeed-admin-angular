export interface User {
  created_at?: string;
  updated_at?: string;
  id?: number,
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

export interface JSAuthResponse {
  accessToken: string
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

export interface PaginatedArticle {
  data: Article[],
  total: number,
}

export interface PaginatedUser{
  data: User[],
  total: number,
}



