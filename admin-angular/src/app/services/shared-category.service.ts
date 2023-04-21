import {Injectable, OnDestroy} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Category, OperationResponse} from "../interfaces";
import {BehaviorSubject, map, Observable, of, switchMap, tap} from "rxjs";
import {CategoryState} from "../states/category.state";

const BASE_URL = 'http://localhost:8000/api/categories';

// ужасно, абсолютно полная копипаста с shared-tag.service.ts
// здесь решение простое и на выбор
// 1) есть абсолютный класс, который объединяет всю логику категорий и тегов
// 2) это будет одна сущность например Features, в которой есть поле kind, которое будет либо category либо tag, а то ты сча дублируешь весь код
@Injectable({
  providedIn: 'root'
})
export class SharedCategoryService {
  constructor(
    private _http: HttpClient,
    private _categoryState: CategoryState
  ) {
  }

  updateItemsList(): Observable<OperationResponse<Category[]>> {
    return this._http.get<OperationResponse<Category[]>>(BASE_URL).pipe(
      tap(response => this._categoryState.setItems(response.data))
    )
  }

  createItem(name: string): Observable<Category> {
    return this._http.post<OperationResponse<Category>>(BASE_URL, {name: name}).pipe(
      switchMap(response => {
        return this.updateItemsList().pipe(
          map(() => response.data)
        )
      })
    );
  }

  deleteItem(id: number): Observable<boolean> {
    return this._http.delete<OperationResponse<null>>(`${BASE_URL}/${id}`).pipe(
      switchMap(response => {
        return this.updateItemsList().pipe(
          map(() => response.success)
        )
      })
    );
  }
}

