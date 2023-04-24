import {
  Router,
  RouterStateSnapshot,
  ActivatedRouteSnapshot, Resolve
} from '@angular/router';
import {Observable} from 'rxjs';
import {CategoryTagService} from "../interfaces";

export abstract class BaseTagCategoryResolver<T> implements Resolve<T[]> {
  protected constructor(
    protected _service: CategoryTagService<T>,
    protected _router: Router
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<T[]> {
    return this._service.updateItemsList();
  }
}
