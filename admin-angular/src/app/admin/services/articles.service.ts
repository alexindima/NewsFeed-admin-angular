import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Article, Category} from "../../interfaces";
import {map, Observable} from "rxjs";

@Injectable()
export class ArticlesService {

  constructor(private http: HttpClient) {
  }

  getCountOfArticles(search: string | null = null): Observable<number> {
    let url = `http://localhost:3030/articles`;
    if (search) {
      url += `?q=${search.replace(/ /g, "+")}&`;
    }
    return this.http.get<Article[]>(url).pipe(
      map((articles: Article[]) => articles.length)
    )
  }

  getArticles(page: number, limit: number, search: string | null = null): Observable<Article[]> {
    let url = `http://localhost:3030/articles?`;
    if (search) {
      url += `q=${search.replace(/ /g, "+")}&`;
    }
    url += `_page=${page}&_limit=${limit}`;
    return this.http.get<Article[]>(url)
  }

  createArticle(article: Article): Observable<Article> {
    return this.http.post<Article>('http://localhost:3030/articles', article)
  }


  deleteArticle(article: number | Article): Observable<any> {
    let id: number | undefined
    if (typeof article === "number") {
      id = article
    }
    if (typeof article === "object") {
      id = article.id
    }
    return this.http.delete(`http://localhost:3030/articles/${id}`)
  }
}

