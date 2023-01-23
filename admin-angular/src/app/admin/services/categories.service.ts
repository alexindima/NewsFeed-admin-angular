import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Category, JSAuthResponse, User} from "../../interfaces";

@Injectable()
export class CategoriesService {
  public categoriesList: Category[] = []

  constructor(private http: HttpClient) {
  }

  getCategoriesList() {
    return this.http.get<Category[]>(`http://localhost:3030/categories`)
  }
}

