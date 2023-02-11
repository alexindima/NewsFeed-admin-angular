import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Article, Category, Tag} from "../../../interfaces";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {ArticlesService} from "../../services/articles.service";
import {concat, map, Observable, toArray} from "rxjs";
import {UniqueArray} from "../../utils/unique-array.common";
import {ActivatedRoute, Router} from "@angular/router";
import {SharedTagsService} from "../../services/shared-tags.service";
import {SharedCategoriesService} from "../../services/shared-categories.service";
import {Subs} from "../../utils/subs";

interface ArticleForm {
  mainTitle: FormControl<string>;
  secondTitle: FormControl<string>;
  photoUrl: FormControl<string>;
  photoText: FormControl<string>;
  body: FormControl<string>;
  category: FormControl<string | Category>;
  tags: FormArray<FormControl<string | Tag>>;
}

interface ArticleForForm {
  mainTitle: string;
  secondTitle: string;
  photoUrl: string;
  photoText: string;
  body: string;
  category: string;
}

@Component({
  selector: 'app-article-create-page',
  templateUrl: './article-create-page.component.html',
  styleUrls: ['./article-create-page.component.scss']
})
export class ArticleCreatePageComponent implements OnInit, OnDestroy {
  private _subs = new Subs();
  articleFromResolver: Article | undefined;
  form!: FormGroup;
  submitted = false;
  public Editor = ClassicEditor;
  CKEditorConfig = {
    placeholder: 'Create your article'
  };
  categoriesList: Category[] = [];
  tagsList: Tag[] = [];
  categoryControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required]
  });
  tagControls = new FormArray<FormControl<string | Tag>>([new FormControl('', {
    nonNullable: true,
    validators: [Validators.required]
  })]);

  constructor(
    public sharedCategoriesService: SharedCategoriesService,
    private _sharedTagsService: SharedTagsService,
    private _articlesService: ArticlesService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {
  }

  ngOnInit() {
    this.articleFromResolver = this._activatedRoute.snapshot.data['article'];
    this._subs.add = this.sharedCategoriesService.categories.subscribe((data) => {
      this.categoriesList = data;
    })
    this._subs.add = this._sharedTagsService.tags.subscribe((data) => {
      this.tagsList = data;
    })

    this.form = new FormGroup<ArticleForm>({
      mainTitle: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required]
      }),
      secondTitle: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required]
      }),
      photoUrl: new FormControl('', {
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

    if (this.articleFromResolver) {
      const categoryName = this.getNameById(this.categoriesList, this.articleFromResolver.category)
      const tagsNames = this.getArrayOfNamesFromIDs(this.tagsList, this.articleFromResolver.tags)

      if (tagsNames.length > 1) {
        for (let i = 1; i < tagsNames.length; i++) {
          this.addTag()
        }
      }

      const articleForForm: ArticleForForm = {
        ...this.articleFromResolver,
        category: categoryName
      }
      this.form.patchValue(articleForForm)
      this.form.patchValue({
        tags: tagsNames
      })
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
      return;
    }

    this.submitted = true;
    const createArticle = () => {
      const article: Article = {
        createdDate: new Date().toISOString(),
        category: category!,
        mainTitle: this.form.value.mainTitle,
        secondTitle: this.form.value.secondTitle,
        photoUrl: this.form.value.secondTitle,
        photoText: this.form.value.photoText,
        body: this.form.value.body,
        tags: tags
      };
      this._subs.add = this._articlesService.createArticle(article).subscribe(() => {
        this.form.reset();
      })
    }

    const editArticle = () => {
      const article: Article = {
        id: this.articleFromResolver!.id,
        upgradeDate: new Date().toISOString(),
        category: category!,
        mainTitle: this.form.value.mainTitle,
        secondTitle: this.form.value.secondTitle,
        photoUrl: this.form.value.photoUrl,
        photoText: this.form.value.photoText,
        body: this.form.value.body,
        tags: tags
      }
      this._subs.add = this._articlesService.editArticle(article).subscribe(() => {
        this.form.reset();
      })
    }

    let category: number | null = null;
    let tags = new UniqueArray<number>();
    const observables: Observable<Category | Tag>[] = [];

    if (typeof this.form.value.category === "string") {
      observables.push(this.sharedCategoriesService.createCategory(this.form.value.category));
    } else {
      category = this.form.value.category.id;
    }

    for (let tag of this.tagControls.value) {
      if (typeof tag === "string") {
        if (tag.trim()) {
          observables.push(this._sharedTagsService.createTag(tag));
        }
      } else {
        tags.add(tag.id);
      }
    }

    this._subs.add = concat(...observables).pipe(
      map(result => result.id),
      toArray())
      .subscribe(result => {
        for (let i = 0; i < observables.length; i++) {
          if (!category && i === 0) {
            category = result[0];
          } else {
            tags.add(result[i]);
          }
        }
        if (this.articleFromResolver) {
          editArticle();
        } else {
          createArticle();
        }
        this.submitted = false;
        this._router.navigate(['/admin', 'articles']).then();
      })
  }

  ngOnDestroy() {
    this._subs.unsubscribe();
  }
}
