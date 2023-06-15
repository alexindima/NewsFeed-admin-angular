export interface User {
  createdAt?: string;
  updatedAt?: string;
  id?: number, // снова опциональный id
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
