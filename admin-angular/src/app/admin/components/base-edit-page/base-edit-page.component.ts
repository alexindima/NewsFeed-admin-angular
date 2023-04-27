import {Injectable, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Subs } from '../../../utils/subs';
import {FormGroup} from "@angular/forms";
import {ArticleUserService, NameableWithId} from "../../../interfaces";
import {BaseFormAutocompleteService} from "../../../services/base-form-autocomplete.service";
import {finalize} from "rxjs/operators";

@Injectable()
export abstract class BaseEditPageComponent<T extends { id?: number }> implements OnInit, OnDestroy {
  protected _subs = new Subs();
  abstract item: T | undefined;
  abstract form: FormGroup;
  abstract submitted: boolean;

  protected constructor(
    protected _service: ArticleUserService<T>,
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

  createAutocompleteInputs(values: string[], service: BaseFormAutocompleteService<NameableWithId>){
      if (values.length >= 1) {
      for (let i = 0; i < values.length; i++) {
        service.addItem();
      }
    }
  }

  createItem(item: T) {
    this._subs.add = this._service.createItem(item).pipe(
      finalize(() => this.finish())
    ).subscribe();
  }

  editItem(item: T) {
    this._subs.add = this._service.editItem(this.item!.id!, item).pipe(
      finalize(() => this.finish())
    ).subscribe();
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


