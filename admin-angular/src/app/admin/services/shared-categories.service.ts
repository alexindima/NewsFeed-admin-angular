import {Injectable, OnDestroy} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Category, OperationResponse} from "../../interfaces";
import {BehaviorSubject, map, Observable, of, switchMap, tap} from "rxjs";

const BASE_URL = 'http://localhost:8000/api/categories';

// ужасно, абсолютно полная копипаста с shared-tags.service.ts
// здесь решение простое и на выбор
// 1) есть абсолютный класс, который объединяет всю логику категорий и тегов
// 2) это будет одна сущность например Features, в которой есть поле kind, которое будет либо category либо tag, а то ты сча дублируешь весь код
@Injectable({
  providedIn: 'root'
})
export class SharedCategoriesService{
  private _data = new BehaviorSubject<Category[]>([]);
  categories: Observable<Category[]> = this._data.asObservable();

  constructor(
    private _http: HttpClient
  ) {
  }

  updateCategoryList(): Observable<OperationResponse<Category[]>> {
    return this._http.get<OperationResponse<Category[]>>(BASE_URL).pipe(
      tap(response => this._data.next(response.data))
    )
  }

  getCategoriesList(): Observable<Category[]> {
    return this._http.get<OperationResponse<Category[]>>(BASE_URL).pipe(
      map((response) => response.data)
    );
  }

  createCategory(name: string): Observable<Category> {
    return this.getCategoriesList().pipe(
      switchMap((categories: Category[]) => {
        const categoryExist = categories.find((category: Category) => category.name.toLowerCase() === name.toLowerCase());
        if (categoryExist) {
          return of(categoryExist);
        }

        return this._http.post<OperationResponse<Category>>(BASE_URL, {name: name}).pipe(
          switchMap(response => {
            return this.updateCategoryList().pipe(
              map(() => response.data)
            )
          })
        );
      })
    );
  }

  deleteCategory(category: number): Observable<boolean> {
    const deleteCategoryById = (id: number): Observable<boolean> => {
      return this._http.delete<OperationResponse<null>>(`${BASE_URL}/${id}`).pipe(
        switchMap(response => {
          return this.updateCategoryList().pipe(
            map(() => response.success)
          )
        })
      );
    }

    return deleteCategoryById(category);
  }
}

