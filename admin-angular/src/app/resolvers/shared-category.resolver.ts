import {Injectable} from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {Observable} from 'rxjs';
import {Category, OperationResponse} from "../interfaces";
import {CategoryService} from "../services/category.service";

@Injectable({
  providedIn: 'root'
})
export class SharedCategoryResolver implements Resolve<OperationResponse<Category[]>> {
  constructor(
    private _sharedCategoryService: CategoryService,
    private _router: Router
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<OperationResponse<Category[]>> {
    return this._sharedCategoryService.updateItemsList();
  }
}
