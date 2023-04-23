import {Component, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {NameableWithId} from "../../../interfaces";
import {AutocompleteOptionsFiler} from "../../../utils/autocomplete-options-filer";

@Component({
  selector: 'app-custom-category-tag-input',
  template: `
    <div
      class="mb-3"
      [ngClass]="{ 'input-group': withRemove }"
    >
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
      <div *ngIf="withRemove" class="input-group-append rou">
        <button
          type="button"
          class="btn btn-danger fixed-width-150 ml-3"
          [ngClass]="{ 'start-straight': withRemove }"
          (click)="clickHandler()"
        >
          Remove
        </button>
      </div>
    </div>
  `,
  styles: [`
    .start-straight {
      border-bottom-left-radius: 0;
      border-top-left-radius: 0;
    }
  `],
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
  @Input() withRemove: boolean = false;
  @Output() removeClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  clickHandler(){
    this.removeClick.emit();
  }

  writeValue(obj: any): void {
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState?(isDisabled: boolean): void {
  }

}
