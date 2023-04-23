import {
  Router,
  RouterStateSnapshot,
  ActivatedRouteSnapshot, Resolve
} from '@angular/router';
import {Observable} from 'rxjs';

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
