import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Category, JSAuthResponse, User} from "../../interfaces";
import {Observable} from "rxjs";

@Injectable()
export class CategoriesService {

  constructor(private http: HttpClient) {
  }

  getCategoriesList(): Observable<Category[]> {
    return this.http.get<Category[]>(`http://localhost:3030/categories`)
  }
}

