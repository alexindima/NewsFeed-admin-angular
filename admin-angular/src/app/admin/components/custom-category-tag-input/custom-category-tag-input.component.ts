import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {NameableWithId} from "../../../interfaces";
import {AutocompleteOptionsFiler} from "../../../utils/autocomplete-options-filer";

@Component({
  selector: 'app-custom-category-tag-input',
  template: `
    <input type="text"
           placeholder="{{placeholder}}"
           class="{{class}}"
           [formControl]="autocompleteOptions.control"
           [matAutocomplete]="auto"
           (focusin)="autocompleteOptions.createFilteredOptions()"
           (input)="autocompleteOptions.createFilteredOptions()"
    >
    <mat-autocomplete
      #auto="matAutocomplete"
    >
      <mat-option
        *ngFor="let option of autocompleteOptions.options"
        [value]="option"
      >
        {{option}}
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
export class CustomCategoryTagInputComponent<T extends NameableWithId> implements ControlValueAccessor {
  @Input() placeholder?: string;
  @Input() class?: string;
  @Input() autocompleteOptions!: AutocompleteOptionsFiler<T>;


  writeValue(obj: any): void {
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState?(isDisabled: boolean): void {
  }

}
