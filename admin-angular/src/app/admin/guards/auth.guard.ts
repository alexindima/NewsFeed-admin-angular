import {Injectable} from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "../services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private _auth: AuthService,
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
      this._router.navigate(['/admin', 'login'], {
        queryParams: {
          // идея понятная, однако можно лучше
          // кроме редиректа на логин есть смысл отдельно вывести ошибку где-то справа снизу мол что именно пошло не так
          // т.е. сейчас ты используешь обходной путь через роутинг чтобы сделать такую же фичу
          loginAgain: true
        }
      }).then();
      return false;
    }
  }
}
