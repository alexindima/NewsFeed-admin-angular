import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {LoaderState} from "../states/loader.state";

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(
    private _loaderState: LoaderState,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._loaderState.increaseCount();

    return next.handle(req).pipe(
      finalize(() => {
        this._loaderState.decreaseCount();
      })
    );
  }
}
