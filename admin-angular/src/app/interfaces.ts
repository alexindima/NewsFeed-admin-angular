import {Observable} from "rxjs";

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

export interface ArticleUserService<T> {
  getItems(pageIndex: number, pageSize: number): Observable<T[]>;
  getSingleItem(id: number): Observable<T>;
  createItem(item: T): Observable<T>;
  editItem(id: number, item: T): Observable<T>;
  deleteItem(id: number): Observable<boolean>;
}

export interface ArticleUserState {
  count$: Observable<number>;
  setCount(count: number): void;
}

export interface CategoryTagService<T> {
  updateItemsList(): Observable<T[]>;
  createItem(name: string): Observable<T>;
  deleteItem(id: number): Observable<boolean>;
}

export interface CategoryTagState<T> {
  items$: Observable<T[]>;
  setItems(items: T[]): void;
}
