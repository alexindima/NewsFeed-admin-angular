import {Injectable} from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {Observable} from 'rxjs';
import {OperationResponse, Tag} from "../interfaces";
import {SharedTagService} from "../services/shared-tag.service";

@Injectable({
  providedIn: 'root'
})
export class SharedTagResolver implements Resolve<OperationResponse<Tag[]>> {
  constructor(
    private _sharedTagsService: SharedTagService,
    private _router: Router
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<OperationResponse<Tag[]>> {
    return this._sharedTagsService.updateItemsList();
  }
}
