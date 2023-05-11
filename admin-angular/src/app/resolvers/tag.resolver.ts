import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {TagService} from "../services/tag.service";
import {Observable} from "rxjs";
import {Tag} from "../entities/category-tag.interface";

@Injectable({
  providedIn: 'root'
})
export class TagResolver {
  constructor(
    private _tagsService: TagService,
    private _router: Router
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Tag[]> {
    return this._tagsService.updateItemsList();
  }
}
