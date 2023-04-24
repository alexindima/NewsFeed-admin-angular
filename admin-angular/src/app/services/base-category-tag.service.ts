import { HttpClient } from "@angular/common/http";
import {Observable } from "rxjs";
import { map, switchMap} from "rxjs/operators";
import {CategoryTagService, CategoryTagState, OperationResponse} from "../interfaces";

export abstract class BaseCategoryTagService<T> implements CategoryTagService<T>{
  protected readonly BASE_URL: string;

  protected constructor(
    protected readonly _http: HttpClient,
    protected _state: CategoryTagState<T>,
    baseUrl: string,
  ) {
    this.BASE_URL = baseUrl;
  }

  updateItemsList(): Observable<T[]> {
    return this._http.get<OperationResponse<T[]>>(this.BASE_URL).pipe(
      map(response => {
        this._state.setItems(response.data)
        return response.data
      })
    )
  }

  createItem(name: string): Observable<T> {
    return this._http.post<OperationResponse<T>>(this.BASE_URL, {name: name}).pipe(
      switchMap(response => {
        return this.updateItemsList().pipe(
          map(() => response.data)
        )
      })
    );
  }

  deleteItem(id: number): Observable<boolean> {
    return this._http.delete<OperationResponse<null>>(`${(this.BASE_URL)}/${id}`).pipe(
      switchMap(response => {
        return this.updateItemsList().pipe(
          map(() => response.success)
        )
      })
    );
  }
}
