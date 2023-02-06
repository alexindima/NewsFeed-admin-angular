import {Injectable} from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {Observable, of} from 'rxjs';
import {TagsService} from "../services/tags.service";
import {Tag} from "../../interfaces";

@Injectable({
  providedIn: 'root'
})
export class TagsResolver implements Resolve<Tag[]> {
  constructor(public tagsService: TagsService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Tag[]> {
    return this.tagsService.getTagsList();
  }
}
