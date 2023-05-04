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
import {NameableWithId} from "../../../interfaces";

@Component({
  selector: 'app-custom-category-tag-group',
  template: `
    <app-custom-category-tag-add
      [name]="'Add ' + name"
      (addClick)="addItem()"
    ></app-custom-category-tag-add>

    <div
      class="mb-3"
      *ngFor="let tag of formArray.controls; let i = index"
    >
      <app-custom-category-tag-input
        [formControl]="tag"
        [name]="name"
        [options]="options"
        [withRemove]="true"
        (removeClick)="removeItem(i)"
      ></app-custom-category-tag-input>
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
      useExisting: forwardRef(() => CustomCategoryTagGroupComponent),
      multi: true
    },
  ]
})
export class CustomCategoryTagGroupComponent implements ControlValueAccessor, AfterViewInit {
  @Input() name?: string = 'option';
  @Input() options!: NameableWithId[];
  public onChange = (_: any) => {};
  public onTouch = () =>{};
  public formArray: FormArray<FormControl<string>> = new FormArray<FormControl<string>>([]);


  addItem() {
    this.formArray.push(new FormControl('', { nonNullable: true }))
  }

  removeItem(index: number) {
    this.formArray.removeAt(index)
  }

  ngAfterViewInit() {
    this.formArray.valueChanges.subscribe(res => {
      const result = this.formArray.controls.map(res => res.value)
      console.log('onChange ', res)
      this.onChange(result);
    });
  }

  writeValue(value: any): void {
    console.log(value)
    this.formArray = new FormArray(
      value.map(() => {
        return new FormControl('x');
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
