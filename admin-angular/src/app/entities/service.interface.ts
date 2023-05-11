import {Observable} from "rxjs";

export interface ArticleUserService<T> {
  getPaginatedItems(pageIndex: number, pageSize: number): Observable<T[]>;
  getSingleItem(id: number): Observable<T>;
  createItem(item: T): Observable<T>;
  editItem(id: number, item: T): Observable<T>;
  deleteItem(id: number): Observable<boolean>;
}

export interface CategoryTagService<T> {
  updateItemsList(): Observable<T[]>;
  createItem(name: string): Observable<T>;
  deleteItem(id: number): Observable<boolean>;
}
