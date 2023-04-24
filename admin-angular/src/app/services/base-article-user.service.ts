import { HttpClient } from '@angular/common/http';
import {map, Observable, tap} from 'rxjs';
import {ArticleUserService, ArticleUserState, OperationResponse, Paginated} from "../interfaces";

export abstract class BaseArticleUserService<T> implements ArticleUserService<T>{
  protected readonly BASE_URL: string;

  protected constructor(
    protected _http: HttpClient,
    protected _state: ArticleUserState,
    baseUrl: string,
  ) {
    this.BASE_URL = baseUrl;
  }

  getItems(page: number, pageSize: number, search: string | null = null): Observable<T[]> {
    let url = `${this.BASE_URL}?`;
    if (search) {
      url += `q=${search.replace(/ /g, '+')}&`;
    }
    url += `page=${page}&pageSize=${pageSize}`;
    return this._http.get<OperationResponse<Paginated<T>>>(url).pipe(
      tap(response => {
        this._state.setCount(response.data.total);
      }),
      map(response => response.data.data)
    )
  }

  getSingleItem(id: number): Observable<T> {
    return this._http.get<OperationResponse<T>>(`${(this.BASE_URL)}/${id}`).pipe(
      map(response => response.data)
    );
  }

  createItem(item: T): Observable<T> {
    return this._http.post<OperationResponse<T>>(this.BASE_URL, item).pipe(
      map(response => response.data)
    );
  }

  editItem(id: number, item: T): Observable<T> {
    return this._http.patch<OperationResponse<T>>(`${(this.BASE_URL)}/${id}`, item).pipe(
      map(response => response.data)
    );
  }

  deleteItem(id: number): Observable<boolean> {
    return this._http.delete<OperationResponse<null>>(`${(this.BASE_URL)}/${id}`).pipe(
      map(response => response.success)
    );
  }
}
