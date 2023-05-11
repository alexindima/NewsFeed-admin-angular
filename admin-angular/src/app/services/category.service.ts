import {Injectable} from "@angular/core";
import {Category} from "../entities/category-tag.interface";
import {CategoryState} from "../states/category.state";
import {Observable, tap} from "rxjs";
import {map, switchMap} from "rxjs/operators";
import {BaseHttpService} from "./base-http.service";
import {CategoryTagService} from "../entities/service.interface";

 const CATEGORY_URL = '/api/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoryService implements CategoryTagService<Category>{
  protected constructor(
    private _baseHttpService: BaseHttpService<Category>,
    private _categoryState: CategoryState,
  ) {
  }

  updateItemsList(): Observable<Category[]> {
    return this._baseHttpService.getAllItems(CATEGORY_URL).pipe(
      tap((response) => this._categoryState.setItems(response))
    );
  }

  createItem(name: string): Observable<Category> {
    return this._baseHttpService.createItem(CATEGORY_URL, {name: name} as Category).pipe(
      switchMap(response => {
        return this.updateItemsList().pipe(
          map(() => response)
        )
      })
    );
  }

  deleteItem(id: number): Observable<boolean> {
    return this._baseHttpService.deleteItem(CATEGORY_URL, id).pipe(
      switchMap(response => {
        return this.updateItemsList().pipe(
          map(() => response)
        )
      })
    );
  }
}

