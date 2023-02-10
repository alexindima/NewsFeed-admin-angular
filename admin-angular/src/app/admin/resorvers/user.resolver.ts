import {Injectable} from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {catchError, EMPTY, Observable, of} from 'rxjs';
import {UsersService} from "../services/users.service";
import {User} from "../../interfaces";

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<User> {
  constructor(
    private _usersService: UsersService,
    private _router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    return this._usersService.getSingleUser(route.params?.['id']).pipe(
      catchError(() => {
        this._router.navigate(['/admin', 'users']).then();
        return EMPTY;
      })
    );
  }
}
