import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import {Article, Category, Tag} from '../../../interfaces';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ArticleService } from '../../../services/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AutocompleteOptionsFiler } from '../../../utils/autocomplete-options-filer';
import {CategoryState} from "../../../states/category.state";
import {TagState} from "../../../states/tag.state";
import {FormTagService} from "../../../services/form-tag.service";
import {ckeditorConfig} from "../../../configs/ckeditor-config";
import {BaseEditPageComponent} from "../base-edit-page/base-edit-page.component";

const ROUTE_TO_REDIRECT: string[] = ['/admin', 'articles'];

interface ArticleForm {
  mainTitle: FormControl<string>;
  secondTitle: FormControl<string>;
  photoPass: FormControl<string>;
  photoText: FormControl<string>;
  body: FormControl<string>;
  category: FormControl<string>;
  tags: FormArray<FormControl<string>>;
}

@Component({
  selector: 'app-article-edit-page',
  templateUrl: './article-edit-page.component.html',
  styleUrls: ['./article-edit-page.component.scss'],
  providers: [
    FormTagService
  ],
})
export class ArticleEditPageComponent extends BaseEditPageComponent<Article> implements OnInit {
  item: Article | undefined;
  form!: FormGroup;
  submitted = false;
  public Editor = ClassicEditor;
  CKEditorConfig = ckeditorConfig;
  categoriesList: Category[] = [];
  categoryAutocompleteOptions!: AutocompleteOptionsFiler<Category>;
  tagsAutocompleteOptions!: AutocompleteOptionsFiler<Tag>[];
  tagsControls!: FormArray<FormControl<string>>;

  constructor(
    protected _categoryState: CategoryState,
    protected _tagState: TagState,
    protected _articleService: ArticleService,
    protected _activatedRoute: ActivatedRoute,
    protected override _router: Router,
    protected formTagService: FormTagService,
  ) {
    super(_articleService, _router, ROUTE_TO_REDIRECT);
  }

  override ngOnInit() {
    this.item = this._activatedRoute.snapshot.data['article'];

    this._subs.add = this._categoryState.items$.subscribe((data) => {
      this.categoriesList = data;
      this.categoryAutocompleteOptions = new AutocompleteOptionsFiler(new FormControl('', {
        nonNullable: true,
        validators: [Validators.required]
      }), this.categoriesList)
    });

    this._subs.add = this.formTagService.autocompleteOptions$.subscribe((data) => {
      this.tagsAutocompleteOptions = data;
    })
    this._subs.add = this.formTagService.controls$.subscribe((data) => {
      this.tagsControls = data;
    })

    super.ngOnInit();
  }

  createForm(){
    this.form = new FormGroup<ArticleForm>({
      mainTitle: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required]
      }),
      secondTitle: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required]
      }),
      photoPass: new FormControl('', {
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
      category: this.categoryAutocompleteOptions.control,
      tags: this.tagsControls
    });

    this.formTagService.addItem()
  }

  fillForm(){
    const tagsNames = this.item!.tags;
    this.createAutocompleteInputs(tagsNames, this.formTagService)

    this.form.patchValue(this.item!);
    this.form.patchValue({
      tags: tagsNames
    });
  }

  createItemInstance(){
    const category: string = this.form.value.category;

    const tags = new Set<string>(
      this.tagsAutocompleteOptions.map(tag => tag.control.value.trim())
        .filter(trimmedTag => trimmedTag != '')
    );

    const itemInstance: Article = {
      category: category,
      mainTitle: this.form.value.mainTitle,
      secondTitle: this.form.value.secondTitle,
      photoPass: this.form.value.photoPass,
      photoText: this.form.value.photoText,
      body: this.form.value.body,
      tags: [...tags]
    }

    return itemInstance;
  }
}
