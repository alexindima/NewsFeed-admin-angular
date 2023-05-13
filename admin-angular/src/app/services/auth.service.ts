import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, tap, catchError, switchMap, of} from "rxjs";
import {AuthState} from "../states/auth.state";
import {Router} from "@angular/router";
import {joinErrorMessages} from "../utils/error-utils";
import {LoginUser} from "../entities/user.interface";

const LOGIN_URL = '/auth/login';
const LOGOUT_URL = '/auth/logout';
const CSRF_TOKEN_URL = '/sanctum/csrf-cookie';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private _http: HttpClient,
    private _authState: AuthState,
    private _router: Router,
  ) {
  }

  login(user: LoginUser): Observable<null> {
    return this._http.get(CSRF_TOKEN_URL).pipe(
      switchMap(() => {
        return this._http.post<null>(LOGIN_URL, user)
          .pipe(
            tap(() => localStorage.setItem('isAuthenticated', 'true')),
            catchError((response: HttpErrorResponse) => {
              const joinedErrors = joinErrorMessages(response.error)
              this._authState.setError(joinedErrors);
              return of(null);
            })
          );
      })
    );
  }

  logout() {
    this._http.post(LOGOUT_URL, {}).subscribe()
    localStorage.removeItem('isAuthenticated');
    this._router.navigate(['login'])
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('isAuthenticated') === 'true';
  }

}
