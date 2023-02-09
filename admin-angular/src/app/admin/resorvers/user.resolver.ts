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
    private usersService: UsersService,
    private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
    return this.usersService.getSingleUser(route.params?.['id']).pipe(
      catchError(() => {
        this.router.navigate(['/admin', 'users']);
        return EMPTY;
      })
    )
  }
}
