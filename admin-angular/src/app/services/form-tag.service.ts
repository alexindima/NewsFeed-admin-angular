import {Injectable} from '@angular/core';
import {TagState} from "../states/tag.state";
import {Tag} from "../interfaces";
import {BaseFormAutocompleteService} from "./base-form-autocomplete.service";

@Injectable()
export class FormTagService extends BaseFormAutocompleteService<Tag> {
  constructor(
    protected _tagState: TagState
  ) {
    super(_tagState,);
  }

}
