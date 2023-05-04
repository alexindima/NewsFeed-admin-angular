import {
  AfterViewInit,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";
import {NameableWithId} from "../../../interfaces";

@Component({
  selector: 'app-custom-category-tag-input',
  template: `
    <div [ngClass]="{ 'input-group': withRemove }">
      <input type="text"
             [formControl]="control"
             placeholder="Choose {{name}} or enter a new one"
             class="form-control {{class}}"
             [matAutocomplete]="auto"
             (focus)="createFilteredOptions()"
             (blur)="onTouch()"
      >
      <mat-autocomplete
        #auto="matAutocomplete"
      >
        <mat-option
          *ngFor="let option of filteredOptions"
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
    },
  ]
})
export class CustomCategoryTagInputComponent implements ControlValueAccessor, AfterViewInit {
  @Input() name?: string = 'option';
  @Input() class?: string;
  @Input() options!: NameableWithId[];
  @Input() withRemove: boolean = false;
  @Output() removeClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  public control: FormControl<string | null> = new FormControl<string | null>('')
  public filteredOptions: string[] = [];
  public onChange = (_: string | null) => {};
  public onTouch = () => {};

  ngAfterViewInit() {
    this.control.valueChanges.subscribe((value) => {
        this.createFilteredOptions();
        this.onChange(value)
      }
    )
  }

  createFilteredOptions() {
    const optionsNames = this.options.map(option => option.name)
    this.filteredOptions = optionsNames.filter(name => {
      const controlValue = this.control.value ? this.control.value?.toLowerCase() : ''
      return name.toLowerCase().includes(controlValue);
    });
  }

  clickHandler(){
    this.removeClick.emit();
  }

  writeValue(value: string): void {
    this.control.setValue(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
  }

}
