import {Injectable} from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {catchError, EMPTY, Observable, of} from 'rxjs';
import {ArticlesService} from "../services/articles.service";
import {Article} from "../../interfaces";

@Injectable({
  providedIn: 'root'
})
export class ArticleResolver implements Resolve<Article> {
  constructor(
    private articlesService: ArticlesService,
    private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Article> {
    return this.articlesService.getSingleArticle(route.params?.['id']).pipe(
      catchError(() => {
        this.router.navigate(['/admin', 'articles'])
        return EMPTY
      })
    )
  }
}
