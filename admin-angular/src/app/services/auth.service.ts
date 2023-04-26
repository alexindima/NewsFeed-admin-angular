import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {LoginUser} from "../interfaces";
import {Observable, tap, catchError, throwError, switchMap} from "rxjs";
import {AuthState} from "../states/auth.state";
import {Router} from "@angular/router";

const LOGIN_URL = '/login';
const LOGOUT_URL = '/logout';
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
            catchError(this.handleError.bind(this))
          );
      })
    );
  }

  logout() {
    this._http.post(LOGOUT_URL, {}).subscribe()
    localStorage.removeItem('isAuthenticated');
    this._router.navigate(['/admin', 'login'])
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('isAuthenticated') === 'true';
  }

  // не-не, это совсем плохо, бекенд должен ошибку присылать, а не фронт приложение
  private handleError(error: HttpErrorResponse) {
    if(error.status === 422){
      this._authState.setError('Wrong email or password');
    }
    else{
      this._authState.setError('Server error. Please try again');
    }
    return throwError(error);
  }
}
