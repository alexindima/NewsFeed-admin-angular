import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "../../interfaces";
import {map, Observable, switchMap} from "rxjs";

const BASE_URL = `http://localhost:3030/users`;

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

  getUsers(page: number, limit: number, search: string | null = null): Observable<User[]> {
    let url = `${BASE_URL}?`;
    if (search) {
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
    return this.deleteUser(editedUser).pipe(
      switchMap(() => {
        if (!editedUser.password) {
          editedUser = {...editedUser, password: '123456'};
        }
        return this.createUser(editedUser);
      })
    );
  }

  deleteUser(user: number | User): Observable<User> {
    let id: number | undefined;
    if (typeof user === "number") {
      id = user;
    }
    if (typeof user === "object") {
      id = user.id;
    }
    return this._http.delete<User>(`${BASE_URL}/${id}`);
  }
}

