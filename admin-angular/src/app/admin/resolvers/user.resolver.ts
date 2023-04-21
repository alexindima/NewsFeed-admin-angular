import {Injectable} from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {catchError, Observable, throwError} from 'rxjs';
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
    const id: number = Number(route.paramMap.get('id'));
    return this._usersService.getSingleItem(id).pipe(
      catchError((err) => {
        this._router.navigate(['/admin', 'users']);
        return throwError(err);
      })
    );
  }
}
