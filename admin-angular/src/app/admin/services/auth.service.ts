import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {JSAuthResponse, LoginUser} from "../../interfaces";
import {Observable, tap, catchError, throwError, Subject} from "rxjs";

const BASE_URL = 'http://localhost:3030/login';

// это точно providedInRoot провайдер,
// т.к. нам нужен только один его экземпляр на всё приложение,
// с другими провайдерами также
@Injectable()
export class AuthService {
  public error$: Subject<string> = new Subject<string>()

  constructor(private _http: HttpClient) {
  }

  get token() {
    return localStorage.getItem('js-token');
  }

  login(user: LoginUser): Observable<JSAuthResponse | null> {
    return this._http.post<JSAuthResponse>(BASE_URL, user)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      );
  }

  logout() {
    this.setToken(null);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private handleError(error: HttpErrorResponse) {
    const message = error.error;
    this.error$.next(message);
    return throwError(error);
  }

  private setToken(response: JSAuthResponse | null) {
    if (response) {
      localStorage.setItem('js-token', response.accessToken);
    } else {
      localStorage.clear();
    }
  }
}
