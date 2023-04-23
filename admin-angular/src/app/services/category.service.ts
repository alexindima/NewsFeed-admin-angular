import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Category} from "../interfaces";
import {CategoryState} from "../states/category.state";
import {BaseCategoryTagService} from "./base-category-tag.service";

 const CATEGORY_URL = 'http://localhost:8000/api/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseCategoryTagService<Category>{
  constructor(
    protected override _http: HttpClient,
    protected _categoryState: CategoryState,
  ) {
    super(_http, _categoryState, CATEGORY_URL);
  }

}

