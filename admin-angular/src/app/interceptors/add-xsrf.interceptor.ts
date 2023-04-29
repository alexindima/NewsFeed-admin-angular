import {HttpEvent, HttpHandler, HttpInterceptor, HttpXsrfTokenExtractor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

// занятно, очень непривычно видеть не стандартный jwt токен, а другое решение, впрочем, имеет место быть
@Injectable()
export class AddXsrfInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const csrfToken = this.getCookie('XSRF-TOKEN');
    const headerName = 'X-XSRF-TOKEN';
    if (csrfToken !== null && !(req.method === 'GET')  && !req.headers.has(headerName)) {
      req = req.clone({ headers: req.headers.set(headerName, decodeURIComponent(csrfToken)) });
    }
    return next.handle(req);
  }

  getCookie(name: string) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  }
}
