import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {NotificationService} from "../services/notification.service";
import {AuthService} from "../services/auth.service";
import {OperationResponse} from "../entities/response.interface";

@Injectable()
export class ResponseNotificationInterceptor implements HttpInterceptor {
  constructor(
    private _notificationService: NotificationService,
    private _authService: AuthService,
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        if(event instanceof HttpResponse && event.status === 419) {
          this._notificationService.showError('CSRF token error');
          this._authService.logout();
          return;
        }if(event instanceof HttpResponse && event.status === 422) {
          this._notificationService.showError('Wrong data');
          this._authService.logout();
          return;
        }
        if (event instanceof HttpResponse && event.status !== 204) {
          // можно и без as, вот так: const response: OperationResponse<any> = event.body;
          const response = event.body as OperationResponse<any>;
          if (response.message) {
            if (response.success) {
              this._notificationService.showInfo(response.message);
            } else {
              this._notificationService.showError(response.message);
              this._authService.logout();
            }
          }
        }
/*
Я бы переписала все эти условия вот так и добавила бы отдельную функцию для обработки ошибки,
 т к ошибок много может быть и они могут добавляться и будет много дублирования + у тебя есть обработка
 если ошибка не 204, по идее можно просто на наличие body в этом случае проверить и дальше уже другие
 условия смотреть
        if (event instanceof HttpResponse) {
            switch (event.status) {
                case 419:
                    return this._handleError('CSRF token error');
                case 422:
                    return this._handleError('Wrong data');
                default: {
                    if (event.body) {
                        const response: OperationResponse<any> = event.body;

                        if (response.message) {
                            response.success
                                ? this._notificationService.showInfo(response.message)
                                : this._handleError(response.message);
                        }
                    }
                }
            }
        }
*/
      })
    );
  }

// private _handleError(msg: string) {
//     this._notificationService.showError(msg);
//     this._authService.logout();
// }
}
