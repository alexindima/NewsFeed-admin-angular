import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Article, Category, Tag} from '../../../interfaces';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ArticleService } from '../../../services/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AutocompleteOptionsFiler } from '../../../utils/autocomplete-options-filer';
import {CategoryState} from "../../../states/category.state";
import {FormTagService} from "../../../services/form-tag.service";
import {ckeditorConfig} from "../../../../configs/ckeditor-config";
import {BaseEditPageComponent} from "../base-edit-page/base-edit-page.component";
import {TagState} from "../../../states/tag.state";

const ROUTE_TO_REDIRECT: string[] = ['/admin', 'articles'];

interface ArticleForm {
  mainTitle: FormControl<string | null>;
  secondTitle: FormControl<string | null>;
  photoPass: FormControl<string | null>;
  photoText: FormControl<string | null>;
  body: FormControl<string | null>;
  category: FormControl<string | null>;
  tags: FormArray<FormControl<any>>;
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
  tagsList: Tag[] = [];
  categoryAutocompleteOptions!: AutocompleteOptionsFiler<Category>;
  tagsAutocompleteOptions!: AutocompleteOptionsFiler<Tag>[];
  tagsControls: FormArray<FormControl<string | any>> = new FormArray<FormControl<any>>([]);

  constructor(
    protected _categoryState: CategoryState,
    protected _tagState: TagState,
    protected _articleService: ArticleService,
    protected _activatedRoute: ActivatedRoute,
    protected override _router: Router,
    protected formTagService: FormTagService,
    private _fb: FormBuilder,
  ) {
    super(_articleService, _router, ROUTE_TO_REDIRECT);
  }

  override ngOnInit() {
    this.item = this._activatedRoute.snapshot.data['article'];

    this._subs.add = this._categoryState.items$.subscribe((data) => {
      this.categoriesList = data;
    });
    this._subs.add = this._tagState.items$.subscribe((data) => {
      this.tagsList = data;
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
    this.form = this._fb.nonNullable.group<ArticleForm>({
      mainTitle: this._fb.control(
        '',[
          Validators.required,
        ]
      ),
      secondTitle: this._fb.control(
        '', [
          Validators.required,
        ]
      ),
      photoPass: this._fb.control(
        '', [
          Validators.required,
        ]
      ),
      photoText: this._fb.control(
        '', [
          Validators.required,
        ]
      ),
      body: this._fb.control(
        '', [
          Validators.required,
        ]
      ),
      category: this._fb.control(
        '', [
          Validators.required,
        ]
      ),
      /*tags: this.tagsControls*/
      tags: this._fb.array([])
    });

  }

  fillForm(){
    const tagsNames = this.item!.tags;
    //this.createAutocompleteInputs(tagsNames, this.formTagService)

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
      ...this.form.value,
      category: category,
      tags: [...tags]
    }

    return itemInstance;
  }

  show(){
    console.log(this.form.value)
  }
}
