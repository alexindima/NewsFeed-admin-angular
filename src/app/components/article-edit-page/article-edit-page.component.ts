import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Category, Tag} from '../../entities/category-tag.interface';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ArticleService } from '../../services/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import {CategoryState} from "../../states/category.state";
import {ckeditorConfig} from "../../../configs/ckeditor-config";
import {BaseEditPageComponent} from "../base-edit-page/base-edit-page.component";
import {TagState} from "../../states/tag.state";
import {Article} from "../../entities/article.interface";
import {Observable} from "rxjs";
import {ConvertedToFormControls} from "../../utils/form-utils";

interface ArticleForm {
  mainTitle: string;
  secondTitle: string;
  photoPass: string;
  photoText: string;
  body: string;
  category: string;
  tags: string[];
}
@Component({
  selector: 'app-article-edit-page',
  templateUrl: './article-edit-page.component.html',
  styleUrls: ['./article-edit-page.component.scss'],
})
export class ArticleEditPageComponent extends BaseEditPageComponent<Article> implements OnInit {
  protected ROUTE_TO_REDIRECT: string[] = ['articles'];
  item: Article | undefined;
  form!: FormGroup<ConvertedToFormControls<ArticleForm>>;
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
    super(_categoryState, _tagState, _router);
  }

  override ngOnInit() {
    this.item = this._activatedRoute.snapshot.data['article'];
    super.ngOnInit();
  }

  createForm(){
    this.form = this._fb.nonNullable.group({
      mainTitle: ['', Validators.required],
      secondTitle: ['', Validators.required],
      photoPass: ['', Validators.required],
      photoText: ['', Validators.required],
      body: ['', Validators.required],
      category: ['', Validators.required],
      tags: [[] as string[]],
    });
  }

  override fillForm() {
    this.form.patchValue(this.item!);
  }

  override createAction(item: Article): Observable<Article> {
    return  this.item
      ? this._articleService.editItem(this.item!.id!, item)
      : this._articleService.createItem(item);
  }
}
