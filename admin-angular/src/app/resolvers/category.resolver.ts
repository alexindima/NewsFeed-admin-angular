import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {Category} from "../entities/category-tag.interface";
import {CategoryService} from "../services/category.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryResolver {
  constructor(
    private _categoryService: CategoryService,
  ) {
  }

  // отсутствует обработка ошибки!
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Category[]> {
    return this._categoryService.updateItemsList();
  }
}
