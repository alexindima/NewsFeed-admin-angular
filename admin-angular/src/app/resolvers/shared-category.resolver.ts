import {Injectable} from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {catchError, map, Observable, of} from 'rxjs';
import {Category, OperationResponse} from "../interfaces";
import {SharedCategoryService} from "../services/shared-category.service";

@Injectable({
  providedIn: 'root'
})
export class SharedCategoryResolver implements Resolve<OperationResponse<Category[]>> {
  constructor(
    private _sharedCategoryService: SharedCategoryService,
    private _router: Router
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<OperationResponse<Category[]>> {
    return this._sharedCategoryService.updateItemsList();
  }
}
