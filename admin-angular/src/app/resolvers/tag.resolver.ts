import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Tag} from "../interfaces";
import {TagService} from "../services/tag.service";
import {BaseTagCategoryResolver} from "./base-tag-category.resolver";

@Injectable({
  providedIn: 'root'
})
export class TagResolver extends BaseTagCategoryResolver<Tag> {
  constructor(
    protected _tagsService: TagService,
    protected override _router: Router
  ) {
    super(_tagsService, _router)
  }
}
