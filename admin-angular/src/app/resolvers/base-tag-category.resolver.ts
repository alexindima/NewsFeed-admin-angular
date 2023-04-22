import {
  Router,
  RouterStateSnapshot,
  ActivatedRouteSnapshot, Resolve
} from '@angular/router';
import {Observable} from 'rxjs';
import {Category, OperationResponse} from "../interfaces";

export abstract class BaseTagCategoryResolver<T> implements Resolve<T> {
  protected constructor(
    protected _sharedService: any,
    protected _router: Router
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<T> {
    return this._sharedService.updateItemsList();
  }
}
