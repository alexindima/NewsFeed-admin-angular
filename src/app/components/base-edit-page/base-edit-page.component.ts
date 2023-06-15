import {Injectable, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Subs } from '../../utils/subs';
import {FormGroup} from "@angular/forms";
import {Category, Tag} from "../../entities/category-tag.interface";
import {finalize} from "rxjs/operators";
import {CategoryState} from "../../states/category.state";
import {TagState} from "../../states/tag.state";
import {Observable} from "rxjs";

@Injectable()
// не вижу смысла делать extends от объекта с опциональным id, может меня поправят, но здесь он сработает
// для любого переданного дженерика, вне зависимости есть у него id или нет
// >> соглашусь, но могу представить, чтобы код был описательнее, тогда { id?: number } стоит вынести в свой собственный тип, так делают, но редко
export abstract class BaseEditPageComponent<T extends { id?: number }> implements OnInit, OnDestroy {
  protected abstract ROUTE_TO_REDIRECT: string[];
  protected _subs = new Subs();
  abstract item: T | undefined;
  abstract form: FormGroup;
  // я бы эту переменную переименовала в loading и поставила здесь с типом public и по умолчанию значением
  // false, а при сабмите делала true
  abstract submitted: boolean;
  abstract categoriesList: Category[];
  abstract tagsList: Tag[];

  protected constructor(
    // protected переменные лучше писать без подчеркивания, а вот private да, стоит им выделять
    protected _categoryState: CategoryState,
    protected _tagState: TagState,
    protected _router: Router,
  ) {
  }

  ngOnInit() {
    this._subs.add = this._categoryState.items$.subscribe((data) => {
      this.categoriesList = data;
    });
    this._subs.add = this._tagState.items$.subscribe((data) => {
      this.tagsList = data;
    });
    this.createForm();
    if (this.item) {
      this.fillForm();
    }

  }

  // абстрактные методы лучше объявить выше, сразу после абстрактных свойств
  abstract createForm(): void;
  abstract fillForm(): void;
  abstract createAction(item: T): Observable<T>;

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;
    /*
    Можно еще вот так сделать, чтобы без as

    const value: T = {
      ...this.form.value
    }

    const action$ = this.createAction(value);
    */
    const action$ = this.createAction(this.form.value as T);
    this._subs.add = action$.pipe(
      // мне кажется редирект здесь делать не стоит, я бы просто loading = false поставила и все
      // так юзер сможет сразу убедиться, что изменения применились, но здесь чисто кажется так удобнее
      finalize(() => this._router.navigate(this.ROUTE_TO_REDIRECT))
    ).subscribe()
  }

  ngOnDestroy() {
    this._subs.unsubscribe();
  }
}


