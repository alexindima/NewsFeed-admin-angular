export interface User {
  createdAt?: string;
  updatedAt?: string;
  id?: number, // снова опциональный id >> более того его всегда первым свойством логично видеть или еще лучше сделать отдельный интерфейс IUnique и от него наследоваться
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
