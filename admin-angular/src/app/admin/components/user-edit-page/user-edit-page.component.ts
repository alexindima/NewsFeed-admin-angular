import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Category, Tag, User} from "../../../interfaces";
import * as bcrypt from 'bcryptjs';
import {UserService} from "../../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {appValidEqualFactory} from '../../../utils/valid-equal'
import {AutocompleteOptionsFiler} from "../../../utils/autocomplete-options-filer";
import {CategoryState} from "../../../states/category.state";
import {TagState} from "../../../states/tag.state";
import {FormTagService} from "../../../services/form-tag.service";
import {FormCategoryService} from "../../../services/form-category.service";
import { omit } from 'lodash';
import {BaseEditPageComponent} from "../base-edit-page/base-edit-page.component";

const ROUTE_TO_REDIRECT: string[] = ['/admin', 'users'];

interface UserForm {
  name: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
  categories: FormArray<FormControl<string>>;
  tags: FormArray<FormControl<string>>;
  role: FormControl<string>;
}

@Component({
  selector: 'app-user-edit-page',
  templateUrl: './user-edit-page.component.html',
  styleUrls: ['./user-edit-page.component.scss'],
  providers: [
    FormCategoryService,
    FormTagService,
  ],
})
export class UserEditPageComponent extends BaseEditPageComponent<User> implements OnInit {
  item: User | undefined;
  form!: FormGroup;
  submitted = false;
  categoriesAutocompleteOptions!: AutocompleteOptionsFiler<Category>[];
  categoriesControls!: FormArray<FormControl<string>>;
  tagsAutocompleteOptions!: AutocompleteOptionsFiler<Tag>[];
  tagsControls!: FormArray<FormControl<string>>;

  constructor(
    protected _categoryState: CategoryState,
    protected _tagState: TagState,
    protected _usersService: UserService,
    protected _activatedRoute: ActivatedRoute,
    protected override _router: Router,
    protected formTagService: FormTagService,
    protected formCategoryService: FormCategoryService,
  ) {
    super(_usersService, _router, ROUTE_TO_REDIRECT);
  }

  override ngOnInit() {
    this.item = this._activatedRoute.snapshot.data['user'];

    this._subs.add = this.formTagService.autocompleteOptions$.subscribe((data) => {
      this.tagsAutocompleteOptions = data;
    });
    this._subs.add = this.formTagService.controls$.subscribe((data) => {
      this.tagsControls = data;
    });
    this._subs.add = this.formCategoryService.autocompleteOptions$.subscribe((data) => {
      this.categoriesAutocompleteOptions = data;
    });
    this._subs.add = this.formCategoryService.controls$.subscribe((data) => {
      this.categoriesControls = data;
    });

    super.ngOnInit();
  }

  createForm(){
    this.form = new FormGroup<UserForm>({
      role: new FormControl('user', {
        nonNullable: true
      }),
      name: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required]
      }),
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required]
      }),
      confirmPassword: new FormControl('', {
        nonNullable: true
      }),
      categories: this.categoriesControls,
      tags: this.tagsControls
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

    this.formCategoryService.addItem();
    this.formTagService.addItem()
  }

  fillForm(){
    const categoriesNames = this.item!.categories;
    const tagsNames = this.item!.tags;

    const itemWithoutPassword = omit(this.item, ['password']);
    this.createAutocompleteInputs(categoriesNames, this.formCategoryService);
    this.createAutocompleteInputs(tagsNames, this.formTagService);
    this.form.patchValue(itemWithoutPassword);
    this.form.patchValue({
      categories: categoriesNames,
      tags: tagsNames
    })
    this.form.get('password')!.removeValidators([Validators.required]);
  }

  createItemInstance(){
    let ignoredCategories = new Set<string>()
    for (let category of this.categoriesAutocompleteOptions) {
      ignoredCategories.add(category.control.value);
    }

    let ignoredTags = new Set<string>()
    for (let tag of this.tagsAutocompleteOptions) {
      ignoredTags.add(tag.control.value);
    }

    let password = this.form.value.password;
    if(password){
      const salt = bcrypt.genSaltSync(10);
      password = bcrypt.hashSync(password, salt);
    }

    const itemInstance: User = {
      role: this.form.value.role,
      name: this.form.value.name,
      email: this.form.value.email,
      password: password,
      categories: [...ignoredCategories],
      tags: [...ignoredTags],
    }

    return itemInstance;
  }

}


