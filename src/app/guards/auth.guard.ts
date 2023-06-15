import {Injectable} from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
// можно без implements CanActivate, оно уже deprecated
export class AuthGuard implements CanActivate {
  constructor(
    private _auth: AuthService,
    // _router не используется
    private _router: Router
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this._auth.isAuthenticated()) {
      return true;
    } else {
      this._auth.logout();
      return false;
    }
  }
}
