import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {catchError, Observable, throwError} from 'rxjs';
import {ArticleUserService} from "../interfaces";

export class BaseArticleUserResolver<T> implements Resolve<T> {
  constructor(
    private _service: ArticleUserService<T>,
    protected _router: Router,
    private _routeToRedirect: string[],
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<T> {
    const id: number = Number(route.paramMap.get('id'));
    return this._service.getSingleItem(id).pipe(
      catchError((err) => {
        this._router.navigate(this._routeToRedirect);
        return throwError(err);
      })
    );
  }
}
