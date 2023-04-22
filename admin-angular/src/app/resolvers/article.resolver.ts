import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {catchError, Observable, throwError} from 'rxjs';
import {ArticleService} from "../services/article.service";
import {Article} from "../interfaces";
import {BaseArticleUserResolver} from "./base-article-user.resolver";

const ROUTE_TO_REDIRECT = ['/admin', 'articles'];

@Injectable({
  providedIn: 'root'
})
export class ArticleResolver extends BaseArticleUserResolver<Article>{
  constructor(
    protected _articleService: ArticleService,
    protected override _router: Router
  ) {
    super(_articleService, _router, ROUTE_TO_REDIRECT)
  }
}
