import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Category, Tag} from "../../../interfaces";
import {AutocompleteOptionsFiler} from "../../../utils/autocomplete-options-filer";

@Component({
  selector: 'app-custom-category-tag-input',
  template: `
    <input type="text"
           placeholder="{{placeholder}}"
           class="{{class}}"
           [formControl]="autocompleteOptions.control"
           [matAutocomplete]="auto"
           (focusin)="autocompleteOptions.createFilteredOptions(options)"
           (input)="autocompleteOptions.createFilteredOptions(options)"
    >
    <mat-autocomplete
      #auto="matAutocomplete"
      [displayWith]="displayFn"
    >
      <mat-option
        *ngFor="let option of autocompleteOptions.options"
        [value]="option"
      >
        {{option.name}}
      </mat-option>
    </mat-autocomplete>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomCategoryTagInputComponent),
      multi: true
    }
  ]
})
export class CustomCategoryTagInputComponent implements ControlValueAccessor {
  @Input() placeholder?: string;
  @Input() class?: string;
  @Input() autocompleteOptions!: AutocompleteOptionsFiler;
  @Input() options!: Category[] | Tag[];


  writeValue(obj: any): void {
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState?(isDisabled: boolean): void {
  }

  displayFn(data: Tag | Category | string): string {
    if (typeof data === 'string') {
      return data;
    }
    return data && data.name ? data.name : '';
  }
}
