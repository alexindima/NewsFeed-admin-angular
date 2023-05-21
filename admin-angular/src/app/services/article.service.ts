import {Injectable} from "@angular/core";
import {map, Observable, tap} from "rxjs";
import {ArticleState} from "../states/article.state";
import {BaseHttpService} from "./base-http.service";
import {Article} from "../entities/article.interface";
import {ArticleUserQueryPaginator, ArticleUserService} from "../entities/service.interface";

const ARTICLE_URL = '/api/articles';

@Injectable({
  providedIn: 'root'
})
export class ArticleService implements ArticleUserService<Article>{

  constructor(
    private _baseHttpService: BaseHttpService<Article>,
    private _articleState: ArticleState,
  ) {
  }

  getPaginatedItems(query: ArticleUserQueryPaginator): Observable<Article[]> {
    return this._baseHttpService.getPaginatedItems(ARTICLE_URL, query).pipe(
      tap(response => {
        this._articleState.setCount(response.total);
      }),
      map(response => response.data)
    )
  }

  getSingleItem(id: number): Observable<Article> {
    return this._baseHttpService.getSingleItem(ARTICLE_URL, id);
  }

  createItem(item: Article): Observable<Article> {
    return this._baseHttpService.createItem(ARTICLE_URL, item);
  }

  editItem(id: number, item: Article): Observable<Article> {
    return this._baseHttpService.editItem(ARTICLE_URL, id, item);
  }

  deleteItem(id: number): Observable<boolean> {
    return this._baseHttpService.deleteItem(ARTICLE_URL, id);
  }
}
