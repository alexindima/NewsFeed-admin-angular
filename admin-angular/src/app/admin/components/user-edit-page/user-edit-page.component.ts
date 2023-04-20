import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Category, Tag, User} from "../../../interfaces";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as bcrypt from 'bcryptjs';
import {concat, forkJoin, map, Observable, of, toArray} from "rxjs";
import {UsersService} from "../../services/users.service";
import {ActivatedRoute, Router} from "@angular/router";
import {appValidEqualFactory} from '../../utils/valid-equal'
import {SharedTagsService} from "../../services/shared-tags.service";
import {SharedCategoriesService} from "../../services/shared-categories.service";
import {Subs} from "../../utils/subs";
import {AutocompleteOptionsFiler} from "../../utils/autocomplete-options-filer";

interface UserForm {
  name: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
  categories: FormArray<FormControl<string | Category>>;
  tags: FormArray<FormControl<string | Tag>>;
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
  styleUrls: ['./user-edit-page.component.scss']
})
export class UserEditPageComponent implements OnInit, OnDestroy {
  private _subs = new Subs();
  userFromResolver: User | undefined;
  form!: FormGroup;
  submitted = false;

  // мусор из копипасты, всякий раз когда нажимаешь ctrl-v мысленно подогревается котёл в аду на 5 градусов если копипастишь люто
  public Editor = ClassicEditor;
  CKEditorConfig = {
    placeholder: 'Create your article'
  };
  categoriesList: Category[] = [];
  tagsList: Tag[] = [];
  categoriesAutocompleteOptions: AutocompleteOptionsFiler[] = [];
  categoriesControls: FormArray<FormControl<Category | string>> = new FormArray<FormControl<Category | string>>([]);
  tagsAutocompleteOptions: AutocompleteOptionsFiler[] = [];
  tagsControls: FormArray<FormControl<Tag | string>> = new FormArray<FormControl<Tag | string>>([]);

  constructor(
    public sharedCategoriesService: SharedCategoriesService,
    private _sharedTagsService: SharedTagsService,
    private _usersService: UsersService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {
  }

  ngOnInit() {
    this.userFromResolver = this._activatedRoute.snapshot.data['user'];
    this._subs.add = this.sharedCategoriesService.categories.subscribe((data) => {
      this.categoriesList = data;
    })
    this._subs.add = this._sharedTagsService.tags.subscribe((data) => {
      this.tagsList = data;
    })

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

    this.addCategory();
    this.addTag();

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
          this.addCategory();
        }
      }
      if (tagsNames.length > 1) {
        for (let i = 1; i < tagsNames.length; i++) {
          this.addTag();
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

  addCategory() {
    this.categoriesAutocompleteOptions.push(new AutocompleteOptionsFiler(new FormControl('', {
      nonNullable: true
    })));
    this.UpdateCategoriesControls();
  }

  addTag() {
    this.tagsAutocompleteOptions.push(new AutocompleteOptionsFiler(new FormControl('', {
      nonNullable: true
    })));
    this.UpdateTagsControls();
  }

  RemoveCategory(index: number) {
    this.categoriesAutocompleteOptions.splice(index, 1);
    this.UpdateCategoriesControls();
  }

  RemoveTag(index: number) {
    this.tagsAutocompleteOptions.splice(index, 1);
    this.UpdateTagsControls();
  }

  UpdateCategoriesControls() {
    const newControls = this.categoriesAutocompleteOptions.map(o => o.control);
    this.categoriesControls.clear();
    newControls.forEach(control => this.categoriesControls.push(control));
  }

  UpdateTagsControls() {
    const newControls = this.tagsAutocompleteOptions.map(o => o.control);
    this.tagsControls.clear();
    newControls.forEach(control => this.tagsControls.push(control));
  }

  getArrayOfNamesFromIDs(arrayOfObj: Tag[] | Category[], arrayOfIDs: string[]): string[] {
    return arrayOfIDs.map((id: string) => {
      const result = arrayOfObj.find(obj => obj.name === id);
      return result ? result.name : `!wrong ID: ${id}!`;
    })
  }


  submit() {
    if (this.form.invalid) {
      return
    }
    this.submitted = true;

    let ignoredCategories = new Set<string>()
    for (let category of this.categoriesAutocompleteOptions) {
      if (typeof category.control.value === "string") {
        if (category.control.value.trim()) {
          ignoredCategories.add(category.control.value);
        }
      } else {
        ignoredCategories.add(category.control.value.name);
      }
    }

    let ignoredTags = new Set<string>()
    for (let tag of this.tagsAutocompleteOptions) {
      if (typeof tag.control.value === "string") {
        if (tag.control.value.trim()) {
          ignoredTags.add(tag.control.value);
        }
      } else {
        ignoredTags.add(tag.control.value.name);
      }
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
      this._subs.add = this._usersService.createUser(user).subscribe(() =>
        this._router.navigate(['/admin', 'users'])
      )
    }

    const editUser = () => {
      this._subs.add = this._usersService.editUser(this.userFromResolver!.id!, user).subscribe(() =>
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


