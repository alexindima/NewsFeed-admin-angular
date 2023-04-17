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
  created_at?: string;
  updated_at?: string;
  main_title: string;
  second_title: string;
  photo_pass: string;
  photo_text: string;
  body: string;
  category_id: number;
  tags: number[];
}

export interface PaginatedArticle {
  data: Article[],
  total: number,
}

export interface PaginatedUser{
  data: User[],
  total: number,
}



