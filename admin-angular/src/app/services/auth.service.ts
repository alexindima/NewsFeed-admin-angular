import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {LoginUser} from "../interfaces";
import {Observable, tap, catchError, throwError, Subject, switchMap} from "rxjs";
import {AuthState} from "../states/auth.state";

const LOGIN_URL = 'http://localhost:8000/login';
const LOGOUT_URL = 'http://localhost:8000/logout';
const CSRF_TOKEN_URL = 'http://localhost:8000/sanctum/csrf-cookie';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private _http: HttpClient,
    private _authState: AuthState,
  ) {
  }

  login(user: LoginUser): Observable<null> {
    return this._http.get(CSRF_TOKEN_URL).pipe(
      switchMap(() => {
        return this._http.post<null>(LOGIN_URL, user)
          .pipe(
            tap(() => sessionStorage.setItem('isAuthenticated', 'true')),
            catchError(this.handleError.bind(this))
          );
      })
    );
  }

  logout() {
    this._http.post(LOGOUT_URL, {}).subscribe()
    sessionStorage.removeItem('isAuthenticated');
  }

  isAuthenticated(): boolean {
    return sessionStorage.getItem('isAuthenticated') === 'true';
  }

  private handleError(error: HttpErrorResponse) {
    const message = error.error;
    this._authState.setError(message);
    return throwError(error);
  }
}
