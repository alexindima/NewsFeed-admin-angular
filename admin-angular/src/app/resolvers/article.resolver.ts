import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {ArticleService} from "../services/article.service";
import {catchError, Observable, throwError} from "rxjs";
import {Article} from "../entities/article.interface";

const ROUTE_TO_REDIRECT = ['/admin', 'articles'];

@Injectable({
  providedIn: 'root'
})
export class ArticleResolver {
  constructor(
    private _articleService: ArticleService,
    private _router: Router,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Article> {
    const id: number = Number(route.paramMap.get('id'));
    return this._articleService.getSingleItem(id).pipe(
      catchError((err) => {
        this._router.navigate(ROUTE_TO_REDIRECT);
        return throwError(err);
      })
    );
  }
}
