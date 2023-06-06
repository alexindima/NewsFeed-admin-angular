import {Injectable} from "@angular/core";
import {throwError} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ResolverErrorHandleService {
  constructor(
    private router: Router
  ) {}

  handleError(error: any, routeToRedirect: string[]) {
    this.router.navigate(routeToRedirect);
    return throwError(error);
  }
}

