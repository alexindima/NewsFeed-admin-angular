import {Injectable} from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {catchError, map, Observable, of} from 'rxjs';
import {Category, Tag} from "../../interfaces";
import {SharedCategoriesService} from "../services/shared-categories.service";
import {SharedTagsService} from "../services/shared-tags.service";

@Injectable({
  providedIn: 'root'
})
export class SharedTagsResolver implements Resolve<Tag[]> {
  constructor(
    private _sharedTagsService: SharedTagsService,
    private _router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Tag[]> {
    return this._sharedTagsService.updateTagsList();
  }
}
