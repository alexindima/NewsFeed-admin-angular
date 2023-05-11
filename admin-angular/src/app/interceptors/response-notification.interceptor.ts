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
      })
    );
  }
}
