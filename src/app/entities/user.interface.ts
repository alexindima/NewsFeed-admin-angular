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
