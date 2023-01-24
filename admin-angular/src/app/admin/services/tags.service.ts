import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Category, JSAuthResponse, Tag, User} from "../../interfaces";
import {Observable} from "rxjs";

@Injectable()
export class TagsService {

  constructor(private http: HttpClient) {
  }

  getTagsList(): Observable<Tag[]> {
    return this.http.get<Tag[]>(`http://localhost:3030/tags`)
  }
}

