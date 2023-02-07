import {Component, OnInit} from '@angular/core';
import {CategoriesService} from "../../services/categories.service";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Category, Tag, User} from "../../../interfaces";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {concat, forkJoin, map, Observable, of, toArray} from "rxjs";
import {TagsService} from "../../services/tags.service";
import {UniqueArray} from "../shared/form.common";
import {UsersService} from "../../services/users.service";
import {ActivatedRoute, Router} from "@angular/router";

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
export class UserCreatePageComponent implements OnInit {
  userFromResolver: User | undefined;
  form!: FormGroup;
  public Editor = ClassicEditor;
  CKEditorConfig = {
    placeholder: 'Create your article'
  };
  categoriesOptions: Category[] = [];
  tagsOptions: Tag[] = [];
  tagControls = new FormArray<FormControl>([new FormControl('')]);
  categoriesControls = new FormArray<FormControl>([new FormControl('')]);

  constructor(public categoriesService: CategoriesService,
              public tagsService: TagsService,
              private usersService: UsersService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.form = new FormGroup<UserForm>({
      name: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required]
      }),
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required]
      }),
      password: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required]
      }),
      confirmPassword: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required]
      }),
      categories: this.categoriesControls,
      tags: this.tagControls
    });

    this.userFromResolver = this.activatedRoute.snapshot.data['user'];
    this.categoriesOptions = this.activatedRoute.snapshot.data['categories'];
    this.tagsOptions = this.activatedRoute.snapshot.data['tags'];

    console.log('user', this.userFromResolver)

    if (this.userFromResolver) {
      const categoriesNames = this.getArrayOfNamesFromIDs(this.categoriesOptions, this.userFromResolver.ignoredCategories!)
      const tagsNames = this.getArrayOfNamesFromIDs(this.tagsOptions, this.userFromResolver.ignoredTags!)

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
      console.log(userForForm)
      this.form.patchValue(userForForm)
      this.form.patchValue({
        categories: categoriesNames,
        tags: tagsNames
      })
      this.form.get('password')!.clearValidators();
      this.form.get('confirmPassword')!.clearValidators();
      console.log(this.form)
    }
  }

  addTag() {
    this.tagControls.push(new FormControl('', Validators.required));
  }

  RemoveTag(index: number) {
    this.tagControls.removeAt(index);
  }

  addCategory() {
    this.categoriesControls.push(new FormControl('', Validators.required));
  }

  RemoveCategory(index: number) {
    this.categoriesControls.removeAt(index);
  }

  createFilteredOptions(control: FormControl, options: Tag[] | Category[]): Tag[] | Category[] {
    return options.filter(option => {
      const isNameString = typeof control.value === 'string' ? control.value : option?.name;
      return option.name.toLowerCase().includes(isNameString.toLowerCase())
    });
  }

  displayFn(data: Tag | Category | string): string {
    if (typeof data === 'string') {
      return data;
    }
    return data && data.name ? data.name : '';
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

    if (this.form.value.password !== this.form.value.confirmPassword) {
      return;
    }

    const createUser = () => {
      const user: User = {
        createdDate: new Date(),
        name: this.form.value.name,
        email: this.form.value.email,
        password: this.form.value.password,
        ignoredCategories: ignoredCategories,
        ignoredTags: ignoredTags
      }
      this.usersService.createUser(user).subscribe(() => {
        this.form.reset()
      })
    }

    let ignoredCategories = new UniqueArray<number>()
    let ignoredTags = new UniqueArray<number>()
    const categoriesObservables: Observable<Category>[] = []
    const tagsObservables: Observable<Tag>[] = []

    for (let category of this.categoriesControls.value) {
      if (typeof category === "string") {
        if (category.trim()) {
          categoriesObservables.push(this.categoriesService.createCategory(category))
        }
      } else {
        ignoredCategories.add(category.id)
      }
    }

    for (let tag of this.tagControls.value) {
      if (typeof tag === "string") {
        if (tag.trim()) {
          tagsObservables.push(this.tagsService.createTag(tag))
        }
      } else {
        ignoredTags.add(tag.id)
      }
    }

    // если будут одинаковые новые теги, форкджойн сделает запросы параллельно, сервер создаст для каждого свой ид
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


    forkJoin([categoriesObservable, tagsObservable]).subscribe(([categoriesID, tagsID]) => {
      for (let categoryID of categoriesID) {
        ignoredCategories.add(categoryID)
      }
      for (let tagID of tagsID) {
        ignoredTags.add(tagID)
      }
      createUser();
      this.router.navigate(['/admin', 'users']);
    })
  }
}


