import {Injectable} from "@angular/core";
import {map, Observable, tap} from "rxjs";
import {UserState} from "../states/user.state";
import {BaseHttpService} from "./base-http.service";
import {User} from "../entities/user.interface";
import {ArticleUserQueryPaginator, ArticleUserService} from "../entities/service.interface";

 const USER_URL = `/api/users`;

@Injectable({
  providedIn: 'root'
})
export class UserService implements ArticleUserService<User>{
  constructor(
    private _baseHttpService: BaseHttpService<User>,
    private _userState: UserState,
  ) {
  }

  getPaginatedItems(query: ArticleUserQueryPaginator): Observable<User[]> {
    return this._baseHttpService.getPaginatedItems(USER_URL, query).pipe(
      tap(response => {
        this._userState.setCount(response.total);
      }),
      map(response => response.data)
    )
  }

  getSingleItem(id: number): Observable<User> {
    return this._baseHttpService.getSingleItem(USER_URL, id);
  }

  createItem(item: User): Observable<User> {
    return this._baseHttpService.createItem(USER_URL, item);
  }

  editItem(id: number, item: User): Observable<User> {
    return this._baseHttpService.editItem(USER_URL, id, item);
  }

  deleteItem(id: number): Observable<boolean> {
    return this._baseHttpService.deleteItem(USER_URL, id);
  }
}

