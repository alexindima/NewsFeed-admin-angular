import {Injectable, OnDestroy} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Category} from "../../interfaces";
import {BehaviorSubject, catchError, Observable, of, switchMap, tap} from "rxjs";
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

  updateCategoryList() {
    this._subs.add = this._http.get<Category[]>(BASE_URL).subscribe(data => {
      this._data.next(data);
    })
  }

  getCategoriesList(): Observable<Category[]> {
    return this._http.get<Category[]>(BASE_URL)
  }

  createCategory(name: string): Observable<Category> {
    return this.getCategoriesList().pipe(
      switchMap((categories: Category[]) => {
        const isCategoryExist = categories.some((category: Category) => category.name.toLowerCase() === name.toLowerCase())
        if (isCategoryExist) {
          return of(categories.find((category: Category) => category.name.toLowerCase() === name.toLowerCase()))
        } else {
          return this._http.post<Category>(BASE_URL, {name: name}).pipe(
            tap(() => {
              this.updateCategoryList();
            }),
            catchError(error => of(error))
          )
        }
      })
    )
  }

  deleteCategory(category: number | string | Category): Observable<Category> {
    if (typeof category === "number") {
      return this._http.delete<Category>(`${BASE_URL}/${category}`)
    }

    if (typeof category === "object") {
      return this._http.delete<Category>(`${BASE_URL}/${category.id}`).pipe(
        tap(() => {
          this.updateCategoryList();
        }),
        catchError(error => of(error))
      )
    }

    return this.getCategoriesList().pipe(
      switchMap((categories: Category[]) => {
        const isCategoryExist = categories.some((singleCategory: Category) => singleCategory.name.toLowerCase() === category.toLowerCase())
        if (isCategoryExist) {
          const foundCategory = categories.find((singleCategory: Category) => singleCategory.name.toLowerCase() === category.toLowerCase())
          return this._http.delete<Category>(`${BASE_URL}/${foundCategory!.id}`).pipe(
            tap(() => {
              this.updateCategoryList();
            })
          )
        }
        return of({id: '', name: ''} as unknown as Category);
      })
    )
  }

  ngOnDestroy() {
    this._subs.unsubscribe();
  }
}

