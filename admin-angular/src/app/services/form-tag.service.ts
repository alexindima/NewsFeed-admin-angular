import {Injectable} from '@angular/core';
import {TagState} from "../states/tag.state";
import {Tag} from "../interfaces";
import {BaseFormAutocompleteService} from "./base-form-autocomplete.service";

@Injectable()
export class FormTagService extends BaseFormAutocompleteService<Tag> {
  constructor(
    protected override _itemsState: TagState
  ) {
    super(_itemsState,);
  }

}
