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
export abstract class BaseEditPageComponent<T extends { id?: number }> implements OnInit, OnDestroy {
  protected abstract ROUTE_TO_REDIRECT: string[];
  protected _subs = new Subs();
  abstract item: T | undefined;
  abstract form: FormGroup;
  abstract submitted: boolean;
  abstract categoriesList: Category[];
  abstract tagsList: Tag[];

  protected constructor(
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

  abstract createForm(): void;
  abstract fillForm(): void;
  abstract createAction(item: T): Observable<T>;

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;

    const action$ = this.createAction(this.form.value as T);
    this._subs.add = action$.pipe(
      finalize(() => this._router.navigate(this.ROUTE_TO_REDIRECT))
    ).subscribe()
  }

  ngOnDestroy() {
    this._subs.unsubscribe();
  }
}


