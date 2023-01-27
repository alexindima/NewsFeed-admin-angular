import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "../../interfaces";
import {Observable} from "rxjs";

@Injectable()
export class UsersService {

  constructor(private http: HttpClient) {
  }

  getUsersList(): Observable<User[]> {
    return this.http.get<User[]>(`http://localhost:3030/users`)
  }

  createUser(newUser: User) {
    this.http.post<User>(`http://localhost:3030/users`, newUser).subscribe()
  }

  deleteUser(deletedUser: number | string | User) {
    if (typeof deletedUser === "number") {
      this.http.delete(`http://localhost:3030/users/${deletedUser}`).subscribe()
    }
    if (typeof deletedUser === "string") {
      this.getUsersList().subscribe((users: User[]) => {
        const isUserExist = users.some((user: User) => user.email.toLowerCase() === deletedUser.toLowerCase())
        if (isUserExist) {
          const foundUser = users.find((user: User) => user.name!.toLowerCase() === deletedUser.toLowerCase())
          this.http.delete(`http://localhost:3030/users/${foundUser!.id}`).subscribe()
        }
      })
    }
    if (typeof deletedUser === "object") {
      this.http.delete(`http://localhost:3030/users/${deletedUser.id}`).subscribe()
    }
  }
}

