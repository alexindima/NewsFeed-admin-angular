import {AfterViewInit, Component, DoCheck, ElementRef, forwardRef, Input, OnDestroy} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  ValidationErrors,
  FormControl
} from '@angular/forms';
import {Subs} from "../../utils/subs";
import {hashString} from "../../utils/hash-string";

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PasswordInputComponent),
      multi: true
    }
  ]
})
export class PasswordInputComponent implements ControlValueAccessor, Validator, AfterViewInit, DoCheck, OnDestroy {
  @Input() isRequired: boolean = false;
  private _subs = new Subs();
  public passwordControl: FormControl<string | null> = new FormControl<string | null>('');
  public confirmControl: FormControl<string | null> = new FormControl<string | null>('');
  public classes = '';
  public onChange = (_: string) => {};
  public onTouch = () => {};

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    this._subs.add = this.passwordControl.valueChanges.subscribe((value1) => {
      this.onChange(hashString(value1));
    });
    this._subs.add = this.confirmControl.valueChanges.subscribe(() => {
      if(this.passwordControl.touched){
        this.onChange(hashString(this.passwordControl.value));
      }
    });
  }

  ngDoCheck() {
    this.classes = [...this.elementRef.nativeElement.classList].join(' ');
  }

  writeValue(value: string): void {
    this.passwordControl.setValue(value);
    this.confirmControl.setValue(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const password = this.passwordControl.value;
    const confirmPassword = this.confirmControl.value;
    if (password && password.length < 6) {
      return { minlength: { requiredLength: 6, actualLength: password.length } };
    }
    if(this.confirmControl.touched){
      if (confirmPassword !== password) {
        return { validEqual: true };
      }
    }
    return null;
  }

  ngOnDestroy() {
    this._subs.unsubscribe();
  }
}
