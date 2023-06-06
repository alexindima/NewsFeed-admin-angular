import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Category, Tag} from "../../entities/category-tag.interface";
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import { omit } from 'lodash-es';
import {BaseEditPageComponent} from "../base-edit-page/base-edit-page.component";
import {CategoryState} from "../../states/category.state";
import {TagState} from "../../states/tag.state";
import {User} from "../../entities/user.interface";
import {Observable} from "rxjs";
import {ConvertedToFormControls} from "../../utils/form-utils";

interface UserForm {
  name: string;
  email: string;
  password: string;
  categories: string[];
  tags: string[];
  role: string;
}

@Component({
  selector: 'app-user-edit-page',
  templateUrl: './user-edit-page.component.html',
  styleUrls: ['./user-edit-page.component.scss'],
})
export class UserEditPageComponent extends BaseEditPageComponent<User> implements OnInit {
  protected ROUTE_TO_REDIRECT: string[] = ['users'];
  item: User | undefined;
  form!: FormGroup<ConvertedToFormControls<UserForm>>;
  submitted = false;
  categoriesList: Category[] = [];
  tagsList: Tag[] = [];

  constructor(
    protected override _categoryState: CategoryState,
    protected override _tagState: TagState,
    protected _usersService: UserService,
    protected _activatedRoute: ActivatedRoute,
    protected override _router: Router,
    private _fb: FormBuilder,
  ) {
    super(_categoryState, _tagState, _router);
  }

  override ngOnInit() {
    this.item = this._activatedRoute.snapshot.data['user'];
    super.ngOnInit();
  }

  createForm(){
    this.form = this._fb.nonNullable.group({
      role: ['user'],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      categories: [[] as string[]],
      tags: [[] as string[]],
    });
  }

  override fillForm() {
    const itemWithoutPassword = omit(this.item, ['password']);
    this.form.patchValue(itemWithoutPassword);
    this.form.get('password')!.removeValidators([Validators.required]);
  }

  override createAction(item: User): Observable<User> {
    return  this.item
      ? this._usersService.editItem(this.item!.id!, item)
      : this._usersService.createItem(item);
  }
}


