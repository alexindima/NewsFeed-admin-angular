import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Category, Tag} from '../../entities/category-tag.interface';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ArticleService } from '../../services/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import {CategoryState} from "../../states/category.state";
import {ckeditorConfig} from "../../../configs/ckeditor-config";
import {BaseEditPageComponent} from "../base-edit-page/base-edit-page.component";
import {TagState} from "../../states/tag.state";
import {Article} from "../../entities/article.interface";

interface ArticleForm {
  mainTitle: FormControl<string | null>;
  secondTitle: FormControl<string | null>;
  photoPass: FormControl<string | null>;
  photoText: FormControl<string | null>;
  body: FormControl<string | null>;
  category: FormControl<string | null>;
  tags: FormControl<string[] | null>;
}

@Component({
  selector: 'app-article-edit-page',
  templateUrl: './article-edit-page.component.html',
  styleUrls: ['./article-edit-page.component.scss'],
})
export class ArticleEditPageComponent extends BaseEditPageComponent<Article> implements OnInit {
  protected ROUTE_TO_REDIRECT: string[] = ['articles'];
  item: Article | undefined;
  form!: FormGroup;
  submitted = false;
  Editor = ClassicEditor;
  CKEditorConfig = ckeditorConfig;
  categoriesList: Category[] = [];
  tagsList: Tag[] = [];

  constructor(
    protected override _categoryState: CategoryState,
    protected override _tagState: TagState,
    protected _articleService: ArticleService,
    protected _activatedRoute: ActivatedRoute,
    protected override _router: Router,
    private _fb: FormBuilder,
  ) {
    super(_categoryState, _tagState, _articleService, _router);
  }

  override ngOnInit() {
    this.item = this._activatedRoute.snapshot.data['article'];

    super.ngOnInit();
  }

  createForm(){
    this.form = this._fb.nonNullable.group<ArticleForm>({
      // здесь можно проще писать, без this._fb.control - перепиши с лучшим АПИ от ангуляра, слишком много лишнего текста сейчас
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
      tags: this._fb.control(
        []
      ),
    });

  }

  fillForm(){
    this.form.patchValue(this.item!);
  }

  createItemInstance(){
    const itemInstance: Article = this.form.value
    return itemInstance;
  }
}
