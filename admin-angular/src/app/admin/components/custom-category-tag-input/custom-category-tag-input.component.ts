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
import {NameableWithId} from "../../../entities/category-tag.interface";

@Component({
  selector: 'app-custom-category-tag-input',
  templateUrl: './custom-category-tag-input.component.html',
  styleUrls: ['./custom-category-tag-input.component.scss'],
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
  public onChange = (_: string) => {};
  public onTouch = () => {};

  ngAfterViewInit() {
    this.control.valueChanges.subscribe((value) => {
        this.createFilteredOptions();
        this.onChange(value ? value.trim() : '');
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
