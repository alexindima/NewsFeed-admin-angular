import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {catchError, Observable, throwError} from 'rxjs';
import {ArticleService} from "../services/article.service";
import {Article} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class ArticleResolver implements Resolve<Article> {
  constructor(
    private _articleService: ArticleService,
    private _router: Router
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Article> {
    const id: number = Number(route.paramMap.get('id'));
    return this._articleService.getSingleItem(id).pipe(
      catchError((err) => {
        this._router.navigate(['/admin', 'articles']);
        return throwError(err);
      })
    );
  }
}
