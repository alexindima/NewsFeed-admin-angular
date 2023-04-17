import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Article, OperationResponse, PaginatedArticle, PaginatedUser, User} from "../../interfaces";
import {BehaviorSubject, map, Observable, tap} from "rxjs";

// я сча по проекту нашёл копипасту localhost:3030
// а на занятиях я говорил про proxy conf файл,
// погугли и пусть все апи пути будут без хоста и порта, здесь это /users
const BASE_URL = `http://localhost:8000/api/users`;

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private _data = new BehaviorSubject<number>(0);
  countOfUsers: Observable<number> = this._data.asObservable();
  constructor(private _http: HttpClient) {
  }

  getCountOfUsers(search: string | null = null): Observable<number> {
    let url = BASE_URL;
    if (search) {
      url += `?q=${search.replace(/ /g, "+")}&`;
    }
    return this._http.get<User[]>(url).pipe(
      map((users: User[]) => users.length)
    );
  }

  getUsers(page: number | null, limit: number | null, search: string | null = null): Observable<User[]> {
    let url = `${BASE_URL}?`;
    if (search) {
      url += `q=${search.replace(/ /g, "+")}&`;
    }
    url += `_page=${page}&_limit=${limit}`;
    return this._http.get<OperationResponse<PaginatedUser>>(url).pipe(
      tap(response => {
        this._data.next(response.data.total);
      }),
      map(response => response.data.data)
    )
  }

  getSingleUser(user: number): Observable<User> {
    return this._http.get<OperationResponse<User>>(`${BASE_URL}/${user}`).pipe(
      map(response => response.data)
    );
  }

  createUser(newUser: User): Observable<User> {
    return this._http.post<OperationResponse<User>>(BASE_URL, newUser).pipe(
      map(response => response.data)
    );
  }

  editUser(editedUser: User): Observable<User> {
    if (!editedUser.password) {
      editedUser = {...editedUser, password: '123456'}
    }
    return this._http.patch<OperationResponse<User>>(`${BASE_URL}/${editedUser.id}`, editedUser).pipe(
      map(response => response.data)
    );
  }

  deleteUser(id: number): Observable<User> {
    return this._http.delete<OperationResponse<User>>(`${BASE_URL}/${id}`).pipe(
      map(response => response.data)
    );
  }
}

