import {Injectable, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Subs } from '../../../utils/subs';
import {FormGroup} from "@angular/forms";
import {Category, Tag} from "../../../entities/category-tag.interface";
import {finalize} from "rxjs/operators";
import {CategoryState} from "../../../states/category.state";
import {TagState} from "../../../states/tag.state";
import {ArticleUserService} from "../../../entities/service.interface";

@Injectable()
export abstract class BaseEditPageComponent<T extends { id?: number }> implements OnInit, OnDestroy {
  protected _subs = new Subs();
  abstract item: T | undefined;
  abstract form: FormGroup;
  abstract submitted: boolean;
  abstract categoriesList: Category[];
  abstract tagsList: Tag[];

  protected constructor(
    protected _categoryState: CategoryState,
    protected _tagState: TagState,
    protected _service: ArticleUserService<T>,
    protected _router: Router,
    protected _routeToRedirect: string[],
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
  abstract createItemInstance(): T;

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


