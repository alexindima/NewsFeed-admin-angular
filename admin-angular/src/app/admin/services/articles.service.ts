import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Article} from "../../interfaces";
import {map, Observable} from "rxjs";

const BASE_URL = 'http://localhost:3030/articles';

@Injectable()
export class ArticlesService {

  constructor(private _http: HttpClient) {
  }

  getCountOfArticles(search: string | null = null): Observable<number> {
    let url = BASE_URL;
    if (search) {
      url += `?q=${search.replace(/ /g, "+")}&`;
    }
    return this._http.get<Article[]>(url).pipe(
      map((articles: Article[]) => articles.length)
    );
  }

  getArticles(page: number, limit: number, search: string | null = null): Observable<Article[]> {
    let url = `${BASE_URL}?`;
    if (search) {
      url += `q=${search.replace(/ /g, "+")}&`;
    }
    url += `_page=${page}&_limit=${limit}`;
    return this._http.get<Article[]>(url);
  }

  getSingleArticle(article: number): Observable<Article> {
    return this._http.get<Article>(`${BASE_URL}/${article}`);
  }

  createArticle(article: Article): Observable<Article> {
    return this._http.post<Article>(BASE_URL, article);
  }

  editArticle(article: Article): Observable<Article> {
    return this._http.patch<Article>(`${BASE_URL}/${article.id}`, article);
  }

  deleteArticle(article: number | Article): Observable<Article> {
    let id: number | undefined;
    if (typeof article === "number") {
      id = article;
    }
    if (typeof article === "object") {
      id = article.id;
    }
    return this._http.delete<Article>(`${BASE_URL}/${id}`);
  }
}

