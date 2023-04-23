import {Injectable, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Subs } from '../../../utils/subs';
import {FormGroup} from "@angular/forms";

@Injectable()
export abstract class BaseEditPageComponent<T extends { id?: number }> implements OnInit, OnDestroy {
  protected _subs = new Subs();
  abstract item: T | undefined;
  abstract form: FormGroup;
  abstract submitted: boolean;

  protected constructor(
    protected _service: any,
    protected _router: Router,
    protected _routeToRedirect: string[],
  ) {
  }

  ngOnInit() {
    this.createForm();
    if (this.item) {
      this.fillForm();
    }
  }

  abstract createForm(): void;
  abstract fillForm(): void;
  abstract createItemInstance(): T;

  createAutocompleteInputs(values: string[], service: any){
      if (values.length >= 1) {
      for (let i = 0; i < values.length; i++) {
        service.addItem();
      }
    }
  }

  createItem(item: T) {
    this._subs.add = this._service.createItem(item).subscribe(
      () => this.finish()
    )
  }

  editItem(item: T) {
    this._subs.add = this._service.editItem(this.item!.id!, item).subscribe(
      () => this.finish()
    );
  }

  finish(){
    this._router.navigate(this._routeToRedirect);
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;

    const itemInstance = this.createItemInstance();

    if (this.item) {
      this.editItem(itemInstance);
    } else {
      this.createItem(itemInstance);
    }

  }

  ngOnDestroy() {
    this._subs.unsubscribe();
  }
}


