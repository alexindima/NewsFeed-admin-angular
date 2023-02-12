import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Category, Tag, User} from "../../../interfaces";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {concat, forkJoin, map, Observable, of, toArray} from "rxjs";
import {UniqueArray} from "../../utils/unique-array.common";
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
}

interface UserFromResolverForForm {
  name: string;
  email: string;
}

@Component({
  selector: 'app-user-create-page',
  templateUrl: './user-create-page.component.html',
  styleUrls: ['./user-create-page.component.scss']
})
export class UserCreatePageComponent implements OnInit, OnDestroy {
  private _subs = new Subs();
  userFromResolver: User | undefined;
  form!: FormGroup;
  submitted = false;
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
    private sharedTagsService: SharedTagsService,
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.userFromResolver = this.activatedRoute.snapshot.data['user'];
    this._subs.add = this.sharedCategoriesService.categories.subscribe((data) => {
      this.categoriesList = data;
    })
    this._subs.add = this.sharedTagsService.tags.subscribe((data) => {
      this.tagsList = data;
    })

    this.form = new FormGroup<UserForm>({
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
      const categoriesNames = this.getArrayOfNamesFromIDs(this.categoriesList, this.userFromResolver.ignoredCategories!)
      const tagsNames = this.getArrayOfNamesFromIDs(this.tagsList, this.userFromResolver.ignoredTags!)

      if (categoriesNames.length > 1) {
        for (let i = 1; i < categoriesNames.length; i++) {
          this.addCategory()
        }
      }
      if (tagsNames.length > 1) {
        for (let i = 1; i < tagsNames.length; i++) {
          this.addTag()
        }
      }

      const userForForm: UserFromResolverForForm = {
        name: this.userFromResolver.name!,
        email: this.userFromResolver.email!
      };
      this.form.patchValue(userForForm)
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

  getArrayOfNamesFromIDs(arrayOfObj: Tag[] | Category[], arrayOfIDs: number[]): string[] {
    return arrayOfIDs.map((id: number) => {
      const result = arrayOfObj.find(obj => obj.id === id);
      return result ? result.name : `!wrong ID: ${id}!`;
    })
  }

  getNameById(array: Tag[] | Category[], id: number): string {
    const result = array.find(obj => obj.id === id);
    return result ? result.name : `!wrong ID: ${id}!`;
  }

  submit() {
    if (this.form.invalid) {
      return
    }
    this.submitted = true;

    const createUser = () => {
      const user: User = {
        createdDate: new Date().toISOString(),
        name: this.form.value.name,
        email: this.form.value.email,
        password: this.form.value.password,
        ignoredCategories: ignoredCategories,
        ignoredTags: ignoredTags
      }
      this._subs.add = this.usersService.createUser(user).subscribe(() => {
        this.form.reset()
      })
    }

    const editUser = () => {
      const user: User = {
        id: this.userFromResolver!.id,
        name: this.form.value.name,
        email: this.form.value.email,
        password: this.form.value.password,
        ignoredCategories: ignoredCategories,
        ignoredTags: ignoredTags
      }
      this._subs.add = this.usersService.editUser(user).subscribe(() => {
        this.form.reset()
      })
    }

    let ignoredCategories = new UniqueArray<number>()
    let ignoredTags = new UniqueArray<number>()
    const categoriesObservables: Observable<Category>[] = []
    const tagsObservables: Observable<Tag>[] = []

    for (let category of this.categoriesAutocompleteOptions) {
      if (typeof category.control.value === "string") {
        if (category.control.value.trim()) {
          categoriesObservables.push(this.sharedCategoriesService.createCategory(category.control.value))
        }
      } else {
        ignoredCategories.add(category.control.value.id)
      }
    }

    for (let tag of this.tagsAutocompleteOptions) {
      if (typeof tag.control.value === "string") {
        if (tag.control.value.trim()) {
          tagsObservables.push(this.sharedTagsService.createTag(tag.control.value))
        }
      } else {
        ignoredTags.add(tag.control.value.id)
      }
    }

    const categoriesObservable = categoriesObservables.length
      ? concat(...categoriesObservables).pipe(
        map(category => category.id),
        toArray())
      : of([]);
    const tagsObservable = tagsObservables.length
      ? concat(...tagsObservables).pipe(
        map(tag => tag.id),
        toArray())
      : of([]);


    this._subs.add = forkJoin([categoriesObservable, tagsObservable]).subscribe(([categoriesID, tagsID]) => {
      for (let categoryID of categoriesID) {
        ignoredCategories.add(categoryID)
      }
      for (let tagID of tagsID) {
        ignoredTags.add(tagID)
      }
      if (this.userFromResolver) {
        editUser()
      } else {
        createUser();
      }
      this.router.navigate(['/admin', 'users']).then();
      this.submitted = false;
    })
  }

  ngOnDestroy() {
    this._subs.unsubscribe();
  }
}


