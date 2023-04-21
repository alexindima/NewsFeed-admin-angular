import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import {Article, Category, Tag} from '../../../interfaces';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ArticlesService } from '../../services/articles.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedTagsService } from '../../services/shared-tags.service';
import { SharedCategoriesService } from '../../services/shared-categories.service';
import { Subs } from '../../utils/subs';
import { AutocompleteOptionsFiler } from '../../utils/autocomplete-options-filer';

interface ArticleForm {
  mainTitle: FormControl<string>;
  secondTitle: FormControl<string>;
  photoPass: FormControl<string>;
  photoText: FormControl<string>;
  body: FormControl<string>;
  category: FormControl<string | Category>;
  tags: FormArray<FormControl<string | Tag>>;
}

interface ArticleForForm {
  mainTitle: string;
  secondTitle: string;
  photoPass: string;
  photoText: string;
  body: string;
  category: string;
}

@Component({
  selector: 'app-article-edit-page',
  templateUrl: './article-edit-page.component.html',
  styleUrls: ['./article-edit-page.component.scss']
})
export class ArticleEditPageComponent implements OnInit, OnDestroy {
  private _subs = new Subs();
  articleFromResolver: Article | undefined; // лишнее пространство имён, корректнее будет item или article
  form!: FormGroup;
  submitted = false;

  // вот не надо так, все конфиги редактора стоит вынести в app-editor компонент какой-нибудь,
  // а то получается что пейджи слишком много знают о том, что низкоуровневое для них
  public Editor = ClassicEditor;
  CKEditorConfig = {
    placeholder: 'Create your article'
  };
  categoriesList: Category[] = [];
  tagsList: Tag[] = [];
  categoryAutocompleteOptions: AutocompleteOptionsFiler = new AutocompleteOptionsFiler(new FormControl('', {
    nonNullable: true,
    validators: [Validators.required]
  }));
  tagsAutocompleteOptions: AutocompleteOptionsFiler[] = [];
  tagsControls: FormArray<FormControl<Tag | string>> = new FormArray<FormControl<Tag | string>>([]);

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

    this.addTag();

    if (this.articleFromResolver) {
      const tagsNames = this.articleFromResolver.tags;

      if (tagsNames.length > 1) {
        for (let i = 1; i < tagsNames.length; i++) {
          this.addTag();
        }
      }

      const articleForForm: ArticleForForm = this.articleFromResolver;
      console.log(articleForForm)
      this.form.patchValue(articleForForm)
      this.form.patchValue({
        tags: tagsNames
      })
    }
  }

  addTag() {
    this.tagsAutocompleteOptions.push(new AutocompleteOptionsFiler(new FormControl('', {
      nonNullable: true
    })))
    this.updateTagsControls();
  }

  // имена методов с маленькой буквы
  // у тебя сейчас получается маленькая свалка из методов,
  // которые можно вынести в дочерние компоненты, а то слишком низкоуровневые операции для пейджи,
  // я делал это на занятиях в answers-edit фиче
  removeTag(index: number) {
    this.tagsAutocompleteOptions.splice(index, 1);
    this.updateTagsControls();
  }

  updateTagsControls() {
    const newControls = this.tagsAutocompleteOptions.map(o => o.control);
    this.tagsControls.clear();
    newControls.forEach(control => this.tagsControls.push(control));
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    let category: string = this.form.value.category.name;
    if (typeof this.form.value.category === 'string') {
      if (this.form.value.category) {
        category = this.form.value.category;
      }
    }

    let tags = new Set<string>();
    for (let tag of this.tagsAutocompleteOptions) {
      if (typeof tag.control.value === 'string') {
        if (tag.control.value.trim()) {
          tags.add(tag.control.value);
        }
      } else {
        tags.add(tag.control.value.name);
      }
    }

    const article: Article = {
      category: category,
      mainTitle: this.form.value.mainTitle,
      secondTitle: this.form.value.secondTitle,
      photoPass: this.form.value.photoPass,
      photoText: this.form.value.photoText,
      body: this.form.value.body,
      tags: [...tags]
    }
    const createArticle = () => {
      this._subs.add = this._articlesService.createItem(article).subscribe(
        () => this._router.navigate(['/admin', 'articles'])
      )
    }

    const editArticle = () => {
      this._subs.add = this._articlesService.editItem(this.articleFromResolver!.id!, article).subscribe(
        () => this._router.navigate(['/admin', 'articles'])
      )
    }

    if (this.articleFromResolver) {
      editArticle();
    } else {
      createArticle();
    }

    const finishing = () => {
      this.form.reset()
      this.submitted = false;
      this._router.navigate(['/admin', 'articles']).then();
    }

  }

  ngOnDestroy() {
    this._subs.unsubscribe();
  }
}
