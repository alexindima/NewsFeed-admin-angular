import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {Category} from "../entities/category-tag.interface";
import {CategoryService} from "../services/category.service";
import {catchError, Observable} from "rxjs";
import {ResolverErrorHandleService} from "../services/resolver-error-handle.service";

const ROUTE_TO_REDIRECT = ['server-error'];

@Injectable({
  providedIn: 'root'
})
export class CategoryResolver {
  constructor(
    private _categoryService: CategoryService,
    private _router: Router,
    private _errorHandleService: ResolverErrorHandleService,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Category[]> {
    return this._categoryService.updateItemsList().pipe(
      catchError((err) => this._errorHandleService.handleError(err, ROUTE_TO_REDIRECT))
    );
  }
}
