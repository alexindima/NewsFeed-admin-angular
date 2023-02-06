import {Component, OnInit} from '@angular/core';
import {CategoriesService} from "../../services/categories.service";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Article, Category, Tag} from "../../../interfaces";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {ArticlesService} from "../../services/articles.service";
import {concat, map, Observable, toArray} from "rxjs";
import {TagsService} from "../../services/tags.service";
import {UniqueArray} from "../shared/form.common";
import {ActivatedRoute} from "@angular/router";

interface ArticleForm<T> {
  mainTitle: T;
  secondTitle: T;
  photoUploader: T;
  photoText: T;
  body: T;
  category: T;
  tags: FormArray<FormControl<string | Tag>>;
}

@Component({
  selector: 'app-article-create-page',
  templateUrl: './article-create-page.component.html',
  styleUrls: ['./article-create-page.component.scss']
})
export class ArticleCreatePageComponent implements OnInit {
  article: Article | null = null
  form!: FormGroup;
  public Editor = ClassicEditor;
  CKEditorConfig = {
    placeholder: 'Create your article'
  };
  categoriesOptions: Category[] = [];
  tagsOptions: Tag[] = [];
  categoryControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required]
  })
  tagControls = new FormArray<FormControl<string | Tag>>([new FormControl('', {
    nonNullable: true,
    validators: [Validators.required]
  })]);

  constructor(public categoriesService: CategoriesService,
              public tagsService: TagsService,
              private articlesService: ArticlesService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.form = new FormGroup<ArticleForm<FormControl<string>>>({
      mainTitle: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required]
      }),
      secondTitle: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required]
      }),
      photoUploader: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required]
      }),
      photoText: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required]
      }),
      body: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required]
      }),
      category: this.categoryControl,
      tags: this.tagControls
    });

    const article = this.activatedRoute.snapshot.data['article'];
    this.categoriesOptions = this.activatedRoute.snapshot.data['categories'];
    this.tagsOptions = this.activatedRoute.snapshot.data['tags'];

    if (article) {
      const categoryName = this.getNameById(this.categoriesOptions, article.category)
      const tagsNames = this.getArrayOfNamesFromIDs(this.tagsOptions, article.tags)
      const articleForForm = {
        ...article,
        category: categoryName,
        tags: tagsNames,
      } as ArticleForm<string>
      console.log(articleForForm)
      this.form.patchValue(articleForForm)
    }
  }

  addTag() {
    this.tagControls.push(new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }));
  }

  RemoveTag(index: number) {
    this.tagControls.removeAt(index);
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

    const createArticle = () => {
      const article: Article = {
        createdDate: new Date(),
        category: category!,
        mainTitle: this.form.value.mainTitle,
        secondTitle: this.form.value.secondTitle,
        mainPhoto: this.form.value.secondTitle,
        mainPhotoDescription: this.form.value.photoText,
        tags: tags
      }
      console.log(article)
      this.articlesService.createArticle(article).subscribe(() => {
        this.form.reset()
      })
    }

    let category: number | null = null
    let tags = new UniqueArray<number>()
    const observables: Observable<Category | Tag>[] = []

    if (typeof this.form.value.category === "string") {
      observables.push(this.categoriesService.createCategory(this.form.value.category))
    } else {
      category = this.form.value.category.id
    }

    for (let tag of this.tagControls.value) {
      if (typeof tag === "string") {
        if (tag.trim()) {
          observables.push(this.tagsService.createTag(tag))
        }
      } else {
        tags.add(tag.id)
      }
    }

    concat(...observables).pipe(
      map(result => result.id),
      toArray())
      .subscribe(result => {
        for (let i = 0; i < observables.length; i++) {
          if (!category && i === 0) {
            category = result[0]
          } else {
            tags.add(result[i])
          }
        }
        createArticle()
      })
  }
}

