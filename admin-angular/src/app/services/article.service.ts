import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Article} from "../interfaces";
import {ArticleState} from "../states/article.state";
import {BaseArticleUserService} from "./base-article-user.service";

const BASE_URL = 'http://localhost:8000/api/articles';

@Injectable({
  providedIn: 'root'
})
export class ArticleService extends BaseArticleUserService<Article>{
  constructor(
    protected override _http: HttpClient,
    protected override _state: ArticleState,
  ) {
    super(_http, _state, BASE_URL);
  }

}
