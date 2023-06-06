import { HttpClient } from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Injectable} from "@angular/core";
import {OperationResponse, Paginated} from "../entities/response.interface";
import {ArticleUserQueryPaginator} from "../entities/service.interface";

@Injectable({
  providedIn: 'root'
})
export class BaseHttpService<T>{
  constructor(
    private _http: HttpClient,
  ) {
  }

  getPaginatedItems(url: string, query: ArticleUserQueryPaginator): Observable<Paginated<T>> {
    let preparedUrl = `${url}?`;
    if (query.search) {
      preparedUrl += `q=${query.search.replace(/ /g, '+')}&`;
    }
    preparedUrl += `page=${query.pageIndex}&pageSize=${query.pageSize}`;
    return this._http.get<OperationResponse<Paginated<T>>>(preparedUrl).pipe(
      map(result => result.data)
    )
  }

  getAllItems(url: string): Observable<T[]> {
    return this._http.get<OperationResponse<T[]>>(url).pipe(
      map(response => response.data)
    )
  }

  getSingleItem(url: string, id: number): Observable<T> {
    return this._http.get<OperationResponse<T>>(`${(url)}/${id}`).pipe(
      map(response => response.data)
    );
  }

  createItem(url: string, item: T): Observable<T> {
    return this._http.post<OperationResponse<T>>(url, item).pipe(
      map(response => response.data)
    );
  }

  editItem(url: string, id: number, item: T): Observable<T> {
    return this._http.patch<OperationResponse<T>>(`${(url)}/${id}`, item).pipe(
      map(response => response.data)
    );
  }

  deleteItem(url: string, id: number): Observable<boolean> {
    return this._http.delete<OperationResponse<null>>(`${(url)}/${id}`).pipe(
      map(response => response.success)
    );
  }
}
