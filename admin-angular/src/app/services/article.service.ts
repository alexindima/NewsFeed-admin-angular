import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Article, OperationResponse, Paginated} from "../interfaces";
import {map, Observable, tap} from "rxjs";
import {ArticleState} from "../states/article.state";

const BASE_URL = 'http://localhost:8000/api/articles';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  constructor(
    private _http: HttpClient,
    private _articleState: ArticleState,
  ) {
  }

  getItems(page: number, limit: number, search: string | null = null): Observable<Article[]> {
    let url = `${BASE_URL}?`;
    if (search) {
      url += `q=${search.replace(/ /g, "+")}&`;
    }
    url += `page=${page}&pageSize=${limit}`;
    return this._http.get<OperationResponse<Paginated<Article>>>(url).pipe(
      tap(response => {
        this._articleState.setCount(response.data.total);
      }),
      map(response => response.data.data)
    )

  }

  getSingleItem(article: number): Observable<Article> {
    return this._http.get<OperationResponse<Article>>(`${BASE_URL}/${article}`).pipe(
      map(response => response.data)
    );
  }

  createItem(article: Article): Observable<Article> {
    return this._http.post<OperationResponse<Article>>(BASE_URL, article).pipe(
      map(response => response.data)
    );
  }

  editItem(id: number, article: Article): Observable<Article> {
    return this._http.patch<OperationResponse<Article>>(`${BASE_URL}/${id}`, article).pipe(
      map(response => response.data)
    );
  }

  deleteItem(id: number ): Observable<boolean> {
    return this._http.delete<OperationResponse<null>>(`${BASE_URL}/${id}`).pipe(
      map(response => response.success)
    );
  }
}

