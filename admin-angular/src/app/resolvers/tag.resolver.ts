import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {OperationResponse, Tag} from "../interfaces";
import {TagService} from "../services/tag.service";
import {BaseTagCategoryResolver} from "./base-tag-category.resolver";

@Injectable({
  providedIn: 'root'
})
export class TagResolver extends BaseTagCategoryResolver<OperationResponse<Tag[]>> {
  constructor(
    protected _sharedTagsService: TagService,
    protected override _router: Router
  ) {
    super(_sharedTagsService, _router)
  }
}
