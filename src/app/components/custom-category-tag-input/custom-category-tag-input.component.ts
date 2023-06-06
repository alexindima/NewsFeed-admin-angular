import {
  AfterViewInit,
  Component, DoCheck, ElementRef,
  EventEmitter,
  forwardRef,
  Input, OnDestroy,
  Output,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";
import {NameableWithId} from "../../entities/category-tag.interface";
import {Subs} from "../../utils/subs";

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
export class CustomCategoryTagInputComponent implements ControlValueAccessor, AfterViewInit, DoCheck, OnDestroy {
  @Input() name?: string = 'option';
  @Input() options!: NameableWithId[];
  @Input() withRemove: boolean = false;
  @Output() removeClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  private _subs = new Subs();
  public classes = '';
  public control: FormControl<string | null> = new FormControl<string | null>('')
  public filteredOptions: string[] = [];
  public onChange = (_: string) => {};
  public onTouch = () => {};

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    this._subs.add = this.control.valueChanges.subscribe((value) => {
        this.createFilteredOptions();
        this.onChange(value ? value.trim() : '');
      }
    );

  }

  ngDoCheck() {
    this.classes = [...this.elementRef.nativeElement.classList].join(' ');
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

  ngOnDestroy() {
    this._subs.unsubscribe();
  }

}
