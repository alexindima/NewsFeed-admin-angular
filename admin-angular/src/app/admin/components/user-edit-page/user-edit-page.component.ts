import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Category, Tag, User} from "../../../interfaces";
import * as bcrypt from 'bcryptjs';
import {UserService} from "../../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {appValidEqualFactory} from '../../../utils/valid-equal'
import {Subs} from "../../../utils/subs";
import {AutocompleteOptionsFiler} from "../../../utils/autocomplete-options-filer";
import {CategoryState} from "../../../states/category.state";
import {TagState} from "../../../states/tag.state";
import {FormTagService} from "../../../services/form-tag.service";
import {FormCategoryService} from "../../../services/form-category.service";

interface UserForm {
  name: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
  categories: FormArray<FormControl<string>>;
  tags: FormArray<FormControl<string>>;
  role: FormControl<string>;
}

interface UserFromResolverForForm {
  role: string;
  name: string;
  email: string;
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
export class UserEditPageComponent implements OnInit, OnDestroy {
  private _subs = new Subs();
  userFromResolver: User | undefined;
  form!: FormGroup;
  submitted = false;

  // мусор из копипасты, всякий раз когда нажимаешь ctrl-v мысленно подогревается котёл в аду на 5 градусов если копипастишь люто

  categoriesAutocompleteOptions!: AutocompleteOptionsFiler<Category>[];
  categoriesControls!: FormArray<FormControl<string>>;
  tagsAutocompleteOptions!: AutocompleteOptionsFiler<Tag>[];
  tagsControls!: FormArray<FormControl<string>>;

  constructor(
    private _categoryState: CategoryState,
    private _tagState: TagState,
    private _usersService: UserService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    public formTagService: FormTagService,
    public formCategoryService: FormCategoryService,
  ) {
  }

  ngOnInit() {
    this.userFromResolver = this._activatedRoute.snapshot.data['user'];

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

    this.formCategoryService.addItem();
    this.formTagService.addItem()

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

    if (this.userFromResolver) {
      const categoriesNames = this.userFromResolver.categories;
      const tagsNames = this.userFromResolver.tags;

      if (categoriesNames.length > 1) {
        for (let i = 1; i < categoriesNames.length; i++) {
          this.formCategoryService.addItem();
        }
      }
      if (tagsNames.length > 1) {
        for (let i = 1; i < tagsNames.length; i++) {
          this.formTagService.addItem()
        }
      }


      const userForForm: UserFromResolverForForm = {
        role: this.userFromResolver.role!,
        name: this.userFromResolver.name!,
        email: this.userFromResolver.email!
      };
      this.form.patchValue(userForForm);
      this.form.patchValue({
        categories: categoriesNames,
        tags: tagsNames
      })
      this.form.get('password')!.removeValidators([Validators.required]);
    }
  }

  submit() {
    if (this.form.invalid) {
      return
    }
    this.submitted = true;

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

    const user: User = {
      role: this.form.value.role,
      name: this.form.value.name,
      email: this.form.value.email,
      password: password,
      categories: [...ignoredCategories],
      tags: [...ignoredTags],
    }

    const createUser = () => {
      this._subs.add = this._usersService.createItem(user).subscribe(() =>
        this._router.navigate(['/admin', 'users'])
      )
    }

    const editUser = () => {
      this._subs.add = this._usersService.editItem(this.userFromResolver!.id!, user).subscribe(() =>
        this._router.navigate(['/admin', 'users'])
      )
    }

    if (this.userFromResolver) {
      editUser();
    } else {
      createUser();
    }
  }

  ngOnDestroy() {
    this._subs.unsubscribe();
  }
}


