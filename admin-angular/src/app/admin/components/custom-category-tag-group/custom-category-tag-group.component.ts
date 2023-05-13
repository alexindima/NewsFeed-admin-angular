import {
  AfterViewInit,
  Component,
  forwardRef,
  Input,
} from '@angular/core';
import {
  ControlValueAccessor, FormArray,
  FormControl,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";
import {NameableWithId} from "../../../entities/category-tag.interface";

@Component({
  selector: 'app-custom-category-tag-group',
  templateUrl: './custom-category-tag-group.component.html',
  styleUrls: ['./custom-category-tag-group.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomCategoryTagGroupComponent),
      multi: true
    },
  ]
})
export class CustomCategoryTagGroupComponent implements ControlValueAccessor, AfterViewInit {
  @Input() name?: string = 'option';
  @Input() options!: NameableWithId[];
  public onChange = (_: string[]) => {};
  public onTouch = () =>{};
  public formArray: FormArray<FormControl<string>> = new FormArray<FormControl<string>>([]);

  addItem() {
    this.formArray.push(new FormControl('', { nonNullable: true }))
  }

  removeItem(index: number) {
    this.formArray.removeAt(index)
  }

  ngAfterViewInit() {
    // отписку потерял
    this.formArray.valueChanges.subscribe(() => {
      const result = this.formArray.controls.map(res => res.value)
      this.onChange(result);
    });
  }

  writeValue(value: string[]): void {
    // да, здесь норм, но я бы выносил всякие подготовки данных ко входу (и к выходу тоже!) в отельные функции,
    // причем вижу пересечение с trimmedNonEmptySet (которое должно быть на выходе из компонента!)
    const checkedValue = value.filter(value => value.trim() != '').map(value => value.trim())
    this.formArray = new FormArray(
      checkedValue.map(value => {
        return new FormControl(value, { nonNullable: true });
      })
    );
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
