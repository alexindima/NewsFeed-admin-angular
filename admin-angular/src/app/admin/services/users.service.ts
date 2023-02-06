import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "../../interfaces";
import {map, Observable} from "rxjs";

@Injectable()
export class UsersService {

  constructor(private http: HttpClient) {
  }

  getCountOfUsers(search: string | null = null): Observable<number> {
    let url = `http://localhost:3030/users`;
    if (search) {
      url += `?q=${search.replace(/ /g, "+")}&`;
    }
    return this.http.get<User[]>(url).pipe(
      map((users: User[]) => users.length)
    )
  }

  getUsers(page: number, limit: number, search: string | null = null): Observable<User[]> {
    let url = `http://localhost:3030/users?`;
    if (search) {
      url += `q=${search.replace(/ /g, "+")}&`;
    }
    url += `_page=${page}&_limit=${limit}`;
    return this.http.get<User[]>(url)
  }

  getSingleUser(user: number): Observable<User> {
    return this.http.get<User>(`http://localhost:3030/users/${user}`)
  }


  createUser(newUser: User): Observable<User> {
    return this.http.post<User>(`http://localhost:3030/users/register`, newUser)
  }

  deleteUser(user: number | User): Observable<any> {
    let id: number | undefined
    if (typeof user === "number") {
      id = user
    }
    if (typeof user === "object") {
      id = user.id
    }
    return this.http.delete(`http://localhost:3030/users/${id}`)
  }
}

