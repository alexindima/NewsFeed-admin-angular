import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {TagService} from "../services/tag.service";
import {catchError, Observable} from "rxjs";
import {Tag} from "../entities/category-tag.interface";
import {ResolverErrorHandleService} from "../services/resolver-error-handle.service";

const ROUTE_TO_REDIRECT = ['server-error'];

@Injectable({
  providedIn: 'root'
})
export class TagResolver {
  constructor(
    private _tagsService: TagService,
    private _router: Router,
    private _errorHandleService: ResolverErrorHandleService,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Tag[]> {
    return this._tagsService.updateItemsList().pipe(
      catchError((err) => this._errorHandleService.handleError(err, ROUTE_TO_REDIRECT))
    );
  }
}
