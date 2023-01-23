import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Article} from "./interfaces";

@Injectable({providedIn: 'root'})

export class ArticlesService {
  constructor(private http: HttpClient) {
  }

  create(article: Article): Observable<Article> {
    return this.http.post<Article>('http://localhost:3030/articles', article)
  }
}

