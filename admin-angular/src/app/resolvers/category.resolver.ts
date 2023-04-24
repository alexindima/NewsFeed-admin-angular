import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Category} from "../interfaces";
import {CategoryService} from "../services/category.service";
import {BaseTagCategoryResolver} from "./base-tag-category.resolver";

@Injectable({
  providedIn: 'root'
})
export class CategoryResolver extends BaseTagCategoryResolver<Category> {
  constructor(
    protected _categoryService: CategoryService,
    protected override _router: Router
  ) {
    super(_categoryService, _router);
  }
}
