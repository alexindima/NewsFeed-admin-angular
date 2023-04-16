import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {catchError, throwError, Observable} from 'rxjs';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private _auth: AuthService,
    private _router: Router,
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error.status === 401) {
          console.log('i see 401 error')
          // Update authentication status
          this._auth.logout();
          this._router.navigate(['/admin', 'login'], {
            queryParams: {
              // идея понятная, однако можно лучше
              // кроме редиректа на логин есть смысл отдельно вывести ошибку где-то справа снизу мол что именно пошло не так
              // т.е. сейчас ты используешь обходной путь через роутинг чтобы сделать такую же фичу
              loginAgain: true
            }
          });
          // Implement additional logic, such as redirecting to a login page or showing an error message
        }
        return throwError(error);
      })
    );
  }
}
