import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "../../interfaces";
import {map, Observable} from "rxjs";

// я сча по проекту нашёл копипасту localhost:3030
// а на занятиях я говорил про proxy conf файл,
// погугли и пусть все апи пути будут без хоста и порта, здесь это /users
const BASE_URL = `http://localhost:8000/api/users`;

@Injectable()
export class UsersService {

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
      // полное дублирование с функцией выше, всё что дублируется выносится отдельными функциями
      url += `q=${search.replace(/ /g, "+")}&`;
    }
    url += `_page=${page}&_limit=${limit}`;
    return this._http.get<User[]>(url);
  }

  getSingleUser(user: number): Observable<User> {
    return this._http.get<User>(`${BASE_URL}/${user}`);
  }


  createUser(newUser: User): Observable<User> {
    return this._http.post<User>(BASE_URL, newUser);
  }

  editUser(editedUser: User): Observable<User> {
    if (!editedUser.password) {
      editedUser = {...editedUser, password: '123456'}
    }
    return this._http.patch<User>(`${BASE_URL}/${editedUser.id}`, editedUser);
  }

  deleteUser(user: number | User): Observable<User> {
    let id: number | undefined;
    // не-не, это плохая затея, эндпоинт удаления работает по userId,
    // соответственно точно всегда передаём id в этот метод, не надо давать такой простор
    if (typeof user === "number") {
      id = user;
    }
    if (typeof user === "object") {
      id = user.id;
    }
    return this._http.delete<User>(`${BASE_URL}/${id}`);
  }
}

