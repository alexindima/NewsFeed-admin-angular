import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {UserService} from "../services/user.service";
import {catchError, Observable, throwError} from "rxjs";
import {User} from "../entities/user.interface";

const ROUTE_TO_REDIRECT = ['users'];

@Injectable({
  providedIn: 'root'
})
export class UserResolver {
  constructor(
    private _userService: UserService,
    private _router: Router,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    const id: number = Number(route.paramMap.get('id'));
    return this._userService.getSingleItem(id).pipe(
      catchError((err) => {
        this._router.navigate(ROUTE_TO_REDIRECT);
        return throwError(err);
      })
    );
  }
}
