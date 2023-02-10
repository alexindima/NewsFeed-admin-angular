import {Injectable} from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {catchError, EMPTY, Observable} from 'rxjs';
import {ArticlesService} from "../services/articles.service";
import {Article} from "../../interfaces";

@Injectable({
  providedIn: 'root'
})
export class ArticleResolver implements Resolve<Article> {
  constructor(
    private _articlesService: ArticlesService,
    private _router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Article> {
    return this._articlesService.getSingleArticle(route.params?.['id']).pipe(
      catchError(() => {
        this._router.navigate(['/admin', 'articles']).then();
        return EMPTY;
      })
    );
  }
}
