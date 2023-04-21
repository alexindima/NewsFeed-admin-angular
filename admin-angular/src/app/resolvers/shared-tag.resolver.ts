import {Injectable} from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {Observable} from 'rxjs';
import {OperationResponse, Tag} from "../interfaces";
import {TagService} from "../services/tag.service";

@Injectable({
  providedIn: 'root'
})
export class SharedTagResolver implements Resolve<OperationResponse<Tag[]>> {
  constructor(
    private _sharedTagsService: TagService,
    private _router: Router
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<OperationResponse<Tag[]>> {
    return this._sharedTagsService.updateItemsList();
  }
}
