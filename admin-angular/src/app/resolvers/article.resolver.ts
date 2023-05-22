import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {ArticleService} from "../services/article.service";
import {catchError, Observable} from "rxjs";
import {Article} from "../entities/article.interface";
import {ResolverErrorHandleService} from "../services/resolver-error-handle.service";

const ROUTE_TO_REDIRECT = ['articles'];

@Injectable({
  providedIn: 'root'
})
export class ArticleResolver {
  constructor(
    private _articleService: ArticleService,
    private _router: Router,
    private _errorHandleService: ResolverErrorHandleService,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Article> {
    const id: number = Number(route.paramMap.get('id'));
    return this._articleService.getSingleItem(id).pipe(
      catchError((err) => this._errorHandleService.handleError(err, ROUTE_TO_REDIRECT))
    );
  }
}
