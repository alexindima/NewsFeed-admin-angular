import {
  AfterViewInit,
  Component,
  forwardRef,
  Input, OnDestroy,
} from '@angular/core';
import {
  ControlValueAccessor, FormArray,
  FormControl,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";
import {NameableWithId} from "../../entities/category-tag.interface";
import {Subs} from "../../utils/subs";
import {trimmedNonEmptySet} from "../../utils/set-utils";

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
export class CustomCategoryTagGroupComponent implements ControlValueAccessor, AfterViewInit, OnDestroy {
  @Input() name?: string = 'option';
  @Input() options!: NameableWithId[];
  private _subs = new Subs();
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
    this._subs.add = this.formArray.valueChanges.subscribe(() => {
      const result = this.formArray.controls.map(res => res.value)
      this.onChange([...trimmedNonEmptySet(result)]);
    });
  }

  writeValue(value: string[]): void {
    this.formArray = new FormArray(
      [...trimmedNonEmptySet(value)].map(value => {
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

  ngOnDestroy() {
    this._subs.unsubscribe();
  }

}
