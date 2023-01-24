import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CategoriesService} from "../services/categories.service";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Article, Category, Tag} from "../../interfaces";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {ArticlesService} from "../../articles.service";
import {map, Observable, startWith} from "rxjs";
import {TagsService} from "../services/tags.service";

export interface User {
  name: string;
  id: number
}

@Component({
  selector: 'app-article-create-page',
  templateUrl: './article-create-page.component.html',
  styleUrls: ['./article-create-page.component.scss']
})
export class ArticleCreatePageComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  public Editor = ClassicEditor;
  CKEditorConfig = {
    placeholder: 'Create your article'
  };
  categoriesOptions: Category[] = [];
  tagsOptions: Tag[] = [];
  categoryControl = new FormControl<string | User>('');
  tagControls = new FormArray<FormControl>([new FormControl('', Validators.required)]);

  constructor(public categoriesService: CategoriesService,
              public tagsService: TagsService,
              private articlesService: ArticlesService) {
  }

  ngOnInit() {
    this.form.addControl('tags', this.tagControls);
    this.form.addControl('category', this.categoryControl);
    this.form.addControl('mainTitle', new FormControl(null, [Validators.required]));
    this.form.addControl('secondTitle', new FormControl(null, [Validators.required]));
    this.form.addControl('photoUploader', new FormControl(null, [Validators.required]));
    this.form.addControl('photoText', new FormControl(null, [Validators.required]));
    this.form.addControl('body', new FormControl(null, [Validators.required]));

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
    console.log(this.form)
    const article: Article = {
      createdDate: new Date(),
      mainTitle: this.form.value.mainTitle,
      secondTitle: this.form.value.secondTitle,
      mainPhoto: '',
      mainPhotoDescription: this.form.value.photoText,
      category: this.form.value.category,
      tags: [1, 2]
    }
    this.articlesService.create(article).subscribe(() => {
      this.form.reset()
    })
  }

  showValue() {
    console.log(this.form)
    console.log(this.tagControls.value);
  }
}

