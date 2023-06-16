import {Observable} from "rxjs";

// лучше просто QueryPaginator, вдруг в приложении появится еще
// например, страница с какими-нибудь отчетами и там тоже нужна будет такая
// пагинация, поэтому название должно быть более универсальным
export interface ArticleUserQueryPaginator{
  pageIndex: number;
  pageSize: number;
  search?: string | null;
}

// мне не нравится это название, опять же вдруг появится другая сущность, которой нужен будет этот же интерфейс
// я бы назвала как-то типо IItemsInteractions<T>
// Хотя вообще данные интерфейсы не особо нужны, я б их даже удалила
export interface ArticleUserService<T> {
  getPaginatedItems(query: ArticleUserQueryPaginator): Observable<T[]>;
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
