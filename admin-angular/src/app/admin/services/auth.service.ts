import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {JSAuthResponse, User} from "../../interfaces";
import {Observable, tap, catchError, of, throwError, Subject} from "rxjs";

@Injectable()
export class AuthService {
  public error$: Subject<string> = new Subject<string>()

  constructor(private http: HttpClient) {
  }

  get token() {
    return localStorage.getItem('js-token')
  }

  login(user: User): Observable<JSAuthResponse | null> {
    return this.http.post<JSAuthResponse>(`http://localhost:3030/login`, user)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      )
  }

  logout() {
    this.setToken(null)
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  private handleError(error: HttpErrorResponse) {
    const message = error.error;
    this.error$.next(message)
    return throwError(error)
  }

  private setToken(response: JSAuthResponse | null) {
    if (response) {
      localStorage.setItem('js-token', response.accessToken);
    } else {
      localStorage.clear();
    }
  }
}
