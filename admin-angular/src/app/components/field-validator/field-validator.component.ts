import {AfterViewInit, Component, ContentChild, ElementRef, OnDestroy} from '@angular/core';
import { fromEvent } from 'rxjs';
import {NgControl} from "@angular/forms";
import {Subs} from "../../utils/subs";

@Component({
  selector: 'app-field-validator',
  template: `
    <ng-content></ng-content>
    <div
      class="form-text"
      *ngIf="input.control?.touched && input.control?.invalid"
    >
      <small
        class="text-danger"
        *ngIf="input.control?.errors?.['required']"
      >
        Field can not be empty
      </small>
      <small
        class="text-danger"
        *ngIf="input.control?.errors?.['email']"
      >
        Enter correct email
      </small>
      <small
        class="text-danger"
        *ngIf="input.control?.errors?.['minlength']"
      >
        Password must contain at least {{input.control?.errors?.['minlength'].requiredLength}} symbols.
        Now here only {{input.control?.errors?.['minlength'].actualLength}}
      </small>
      <div
       *ngIf="input.control?.errors?.['validEqual']"
       class="form-text"
      >
        <small class="text-danger">Passwords mismatch</small>
      </div>
    </div>
  `,
  styleUrls: ['./field-validator.component.scss']
})
export class FieldValidatorComponent implements AfterViewInit, OnDestroy {
  @ContentChild('forValidation', { read: NgControl })
  input!: NgControl;
  @ContentChild('forValidation', { read: ElementRef })
  inputRef!: ElementRef;
  private _subs = new Subs();

  ngAfterViewInit() {
    const inputHtmlRef = this.inputRef.nativeElement;
    this._subs.add = fromEvent(inputHtmlRef, 'focusout').subscribe(() => {
      this.setRemoveClassOnError('border-danger');
    });

    this._subs.add = fromEvent(inputHtmlRef, 'input').subscribe(() => {
      this.setRemoveClassOnError('border-danger');
    });
  }

  setRemoveClassOnError(setClass: string){
    if (this.input.touched && !this.input.valid) {
      this.inputRef.nativeElement.classList.add(setClass)
    } else {
      this.inputRef.nativeElement.classList.remove(setClass)
    }
  }

  ngOnDestroy() {
    this._subs.unsubscribe();
  }
}
