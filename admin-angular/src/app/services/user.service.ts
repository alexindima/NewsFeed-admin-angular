import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {OperationResponse, Paginated, User} from "../interfaces";
import {BehaviorSubject, map, Observable, tap} from "rxjs";
import {UserState} from "../states/user.state";

// я сча по проекту нашёл копипасту localhost:3030
// а на занятиях я говорил про proxy conf файл,
// погугли и пусть все апи пути будут без хоста и порта, здесь это /users
const BASE_URL = `http://localhost:8000/api/users`;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _data = new BehaviorSubject<number>(0);
  countOfItems: Observable<number> = this._data.asObservable();
  constructor(
    private _http: HttpClient,
    private _userState: UserState,
  ) {
  }

  getItems(page: number | null, limit: number | null, search: string | null = null): Observable<User[]> {
    let url = `${BASE_URL}?`;
    if (search) {
      url += `q=${search.replace(/ /g, "+")}&`;
    }
    url += `page=${page}&pageSize=${limit}`;
    return this._http.get<OperationResponse<Paginated<User>>>(url).pipe(
      tap(response => {
        this._userState.setCount(response.data.total);
      }),
      map(response => response.data.data)
    )
  }

  getSingleItem(user: number): Observable<User> {
    return this._http.get<OperationResponse<User>>(`${BASE_URL}/${user}`).pipe(
      map(response => response.data)
    );
  }

  createItem(newUser: User): Observable<User> {
    return this._http.post<OperationResponse<User>>(BASE_URL, newUser).pipe(
      map(response => response.data)
    );
  }

  editItem(id: number, editedUser: User): Observable<User> {
    return this._http.patch<OperationResponse<User>>(`${BASE_URL}/${id}`, editedUser).pipe(
      map(response => response.data)
    );
  }

  deleteItem(id: number): Observable<boolean> {
    return this._http.delete<OperationResponse<User>>(`${BASE_URL}/${id}`).pipe(
      map(response => response.success)
    );
  }
}

