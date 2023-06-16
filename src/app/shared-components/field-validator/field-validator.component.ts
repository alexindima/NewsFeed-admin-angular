import {AfterViewInit, Component, ContentChild, ElementRef, OnDestroy} from '@angular/core';
import { fromEvent } from 'rxjs';
import {NgControl} from "@angular/forms";
import {Subs} from "../../utils/subs";

@Component({
  selector: 'app-field-validator',
  templateUrl: './field-validator.component.html',
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

  // не стоит называть методы двумя глаголами, в таком случае скорее всего это должны быть два разных метода на каждое действие
  // но в данном случае можно назвать метод просто toggleClass(), а параметр не setClass, а class
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
