import { Injectable } from '@angular/core';
import {Category} from "../interfaces";
import {CategoryState} from "../states/category.state";
import {BaseFormAutocompleteService} from "./base-form-autocomplete.service";

@Injectable()
export class FormCategoryService extends BaseFormAutocompleteService<Category>{
  constructor(
    protected override _itemsState: CategoryState
  ) {
    super(_itemsState,);
  }

}
