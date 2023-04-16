import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {JSAuthResponse, LoginUser} from "../../interfaces";
import {Observable, tap, catchError, throwError, Subject, switchMap} from "rxjs";

const LOGIN_URL = 'http://localhost:8000/login';
const LOGOUT_URL = 'http://localhost:8000/logout';
const CSRF_TOKEN_URL = 'http://localhost:8000/sanctum/csrf-cookie';

// это точно providedInRoot провайдер,
// т.к. нам нужен только один его экземпляр на всё приложение,
// с другими провайдерами также
@Injectable()
export class AuthService {
  private authenticated: boolean = false;
  public error$: Subject<string> = new Subject<string>();

  constructor(private _http: HttpClient) {
  }

  login(user: LoginUser): Observable<JSAuthResponse | null> {
    return this._http.get(CSRF_TOKEN_URL).pipe(
      switchMap(() => {
        return this._http.post<JSAuthResponse>(LOGIN_URL, user)
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
    this.error$.next(message);
    return throwError(error);
  }

  tes(){
    this._http.post("http://localhost:8000/user/confirm-password", {"password": "password"}).subscribe()
  }
  test(){
    this._http.get("http://localhost:8000/api/user").subscribe()
  }
}
