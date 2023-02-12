import {Injectable, OnDestroy} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Category} from "../../interfaces";
import {BehaviorSubject, map, Observable, of, switchMap, tap} from "rxjs";
import {Subs} from "../utils/subs";

const BASE_URL = 'http://localhost:3030/categories';

@Injectable()
export class SharedCategoriesService implements OnDestroy {
  private _subs = new Subs();
  private _data = new BehaviorSubject<Category[]>([]);
  categories: Observable<Category[]> = this._data.asObservable();

  constructor(
    private _http: HttpClient) {
  }

  updateCategoryList(): Observable<Category[]> {
    return this._http.get<Category[]>(BASE_URL).pipe(
      tap(data => {
      this._data.next(data);
    }))
  }

  getCategoriesList(): Observable<Category[]> {
    return this._http.get<Category[]>(BASE_URL);
  }

  createCategory(name: string): Observable<Category> {
    return this.getCategoriesList().pipe(
      switchMap((categories: Category[]) => {
        const categoryExist = categories.find((category: Category) => category.name.toLowerCase() === name.toLowerCase());
        if (categoryExist) {
          return of(categoryExist);
        }

        return this._http.post<Category>(BASE_URL, {name: name}).pipe(
          switchMap((category: Category) => {
            return this.updateCategoryList().pipe(
              map(() => category)
            )
          })
        );
      })
    );
  }

  deleteCategory(category: number | string | Category): Observable<Category> {
    const deleteCategoryById = (id: number): Observable<Category> => {
      return this._http.delete<Category>(`${BASE_URL}/${id}`).pipe(
        switchMap((category: Category) => {
          return this.updateCategoryList().pipe(
            map(() => category)
          )
        })
      );
    }

    if (typeof category === "number") {
      return deleteCategoryById(category);
    }

    if (typeof category === "object") {
      return deleteCategoryById(category.id);
    }

    return this.getCategoriesList().pipe(
      switchMap((categories: Category[]) => {
        const categoryExist = categories.find((singleCategory: Category) => singleCategory.name.toLowerCase() === category.toLowerCase());
        if (categoryExist) {
          return deleteCategoryById(categoryExist.id);
        }
        return of({id: '', name: ''} as unknown as Category);
      })
    );
  }

  ngOnDestroy() {
    this._subs.unsubscribe();
  }
}

