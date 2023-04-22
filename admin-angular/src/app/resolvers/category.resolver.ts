import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Category, OperationResponse} from "../interfaces";
import {CategoryService} from "../services/category.service";
import {BaseTagCategoryResolver} from "./base-tag-category.resolver";

@Injectable({
  providedIn: 'root'
})
export class CategoryResolver extends BaseTagCategoryResolver<OperationResponse<Category[]>>{
  constructor(
    protected _sharedCategoryService: CategoryService,
    protected override _router: Router
  ) {
    super(_sharedCategoryService, _router);
  }
}
