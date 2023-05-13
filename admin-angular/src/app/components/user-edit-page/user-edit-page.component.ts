import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Category, Tag} from "../../entities/category-tag.interface";
import * as bcrypt from 'bcryptjs';
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {appValidEqualFactory} from '../../utils/valid-equal'
import { omit } from 'lodash-es';
import {BaseEditPageComponent} from "../base-edit-page/base-edit-page.component";
import {CategoryState} from "../../states/category.state";
import {TagState} from "../../states/tag.state";
import {trimmedNonEmptySet} from "../../utils/set-utils";
import {User} from "../../entities/user.interface";

const ROUTE_TO_REDIRECT: string[] = ['users'];

interface UserForm {
  name: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  confirmPassword: FormControl<string | null>;
  categories: FormControl<string[] | null>;
  tags: FormControl<string[] | null>;
  role: FormControl<string | null>;
}

@Component({
  selector: 'app-user-edit-page',
  templateUrl: './user-edit-page.component.html',
  styleUrls: ['./user-edit-page.component.scss'],
})
export class UserEditPageComponent extends BaseEditPageComponent<User> implements OnInit {
  item: User | undefined;
  form!: FormGroup;
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
    super(_categoryState, _tagState, _usersService, _router, ROUTE_TO_REDIRECT);
  }

  override ngOnInit() {
    this.item = this._activatedRoute.snapshot.data['user'];

    super.ngOnInit();
  }

  createForm(){
    this.form = this._fb.nonNullable.group<UserForm>({
      role: this._fb.control(
        'user',
      ),
      name: this._fb.control(
        '', [
          Validators.required,
        ]
      ),
      email: this._fb.control(
        '', [
          Validators.required,
          Validators.email
        ]
      ),
      password: this._fb.control(
        '', [
          Validators.required,
          Validators.minLength(6)
        ]
      ),
      confirmPassword: this._fb.control(
        '',
      ),
      categories: this._fb.control(
        []
      ),
      tags: this._fb.control(
        []
      ),
    });

    this.form.setValidators(appValidEqualFactory(['password', 'confirmPassword'], 'VALIDATION.PASSWORD_MISMATCH'))

    this._subs.add = this.form.get('password')!.valueChanges.subscribe(() => {
      if (this.form.get('password')!.value || this.form.get('confirmPassword')!.value) {
        this.form.get('password')!.addValidators([Validators.minLength(6)]);
      } else {
        this.form.get('password')!.removeValidators([Validators.minLength(6)]);
      }
      this.form.get('password')!.updateValueAndValidity({
        onlySelf: true,
        emitEvent: false
      })
    });
  }

  fillForm(){
    const itemWithoutPassword = omit(this.item, ['password']);
    this.form.patchValue(itemWithoutPassword);
    this.form.get('password')!.removeValidators([Validators.required]);
  }

  createItemInstance(){
    const ignoredCategories = trimmedNonEmptySet(this.form.value.categories);
    const ignoredTags = trimmedNonEmptySet(this.form.value.tags);

    let password = this.form.value.password;
    if(password){
      const salt = bcrypt.genSaltSync(10);
      password = bcrypt.hashSync(password, salt);
    }

    const itemInstance: User = omit({
      ...this.form.value,
      password: password,
      categories: [...ignoredCategories],
      tags: [...ignoredTags],
    }, ['confirmPassword'])

    return itemInstance;
  }

}


