import {Component, OnInit} from '@angular/core';
import {CategoriesService} from "../../services/categories.service";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Category, Tag, User} from "../../../interfaces";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {concat, forkJoin, map, Observable, of, toArray} from "rxjs";
import {TagsService} from "../../services/tags.service";
import {UniqueArray} from "../shared/form.common";
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-user-create-page',
  templateUrl: './user-create-page.component.html',
  styleUrls: ['./user-create-page.component.scss']
})
export class UserCreatePageComponent implements OnInit {
  form: FormGroup = new FormGroup({});
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
              private usersService: UsersService) {
  }

  ngOnInit() {
    this.form.addControl('tags', this.tagControls);
    this.form.addControl('categories', this.categoriesControls);
    this.form.addControl('name', new FormControl(null, [Validators.required]));
    this.form.addControl('email', new FormControl(null, [Validators.required]));
    this.form.addControl('password', new FormControl(null, [Validators.required]));
    this.form.addControl('confirmPassword', new FormControl(null, [Validators.required]));

    this.categoriesService.getCategoriesList().subscribe((result: Category[]) => {
      this.categoriesOptions = result;
    })

    this.tagsService.getTagsList().subscribe((result: Tag[]) => {
      this.tagsOptions = result;
    })
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

  displayFn(obj: Tag | Category): string {
    return obj && obj.name ? obj.name : '';
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
      createUser()
    })
  }
}


