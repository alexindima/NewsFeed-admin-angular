import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CategoriesService} from "../services/categories.service";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Article} from "../../interfaces";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {ArticlesService} from "../../articles.service";
import {map, Observable, startWith} from "rxjs";

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

  categoryControl = new FormControl<string | User>('');
  filteredOptions: Observable<User[]> | undefined;

  public tagInputs: FormArray<FormControl> = new FormArray<FormControl>([new FormControl('', Validators.required)]);

  addTag() {
    this.tagInputs.push(new FormControl('', Validators.required));
  }

  RemoveTag(index: number) {
    this.tagInputs.removeAt(index);
  }


  showValue() {
    console.log(this.form)
    console.log(this.tagInputs.value);
  }

  constructor(public categories: CategoriesService,
              private articlesService: ArticlesService) {
  }

  trackByFn(index: number, item: any) {
    return item.id;
  }

  ngOnInit() {
    this.categories.getCategoriesList()
    this.form.addControl('tags', this.tagInputs);
    this.form.addControl('category', this.categoryControl);
    this.form.addControl('mainTitle', new FormControl(null, [Validators.required]));
    this.form.addControl('secondTitle', new FormControl(null, [Validators.required]));
    this.form.addControl('photoUploader', new FormControl(null, [Validators.required]));
    this.form.addControl('photoText', new FormControl(null, [Validators.required]));
    this.form.addControl('body', new FormControl(null, [Validators.required]));

    this.categories.getCategoriesList().subscribe((result) => {
      this.filteredOptions = this.categoryControl.valueChanges.pipe(
        startWith(''),
        map(value => {
          function filter(name: string): User[] {
            const filterValue = name.toLowerCase();
            return result.filter(option => option.name.toLowerCase().includes(filterValue));
          }

          const name = typeof value === 'string' ? value : value?.name;
          return name ? filter(name as string) : result.slice();
        }),
      );
    })
  }

  displayFn(user: User): string {
    return user && user.name ? user.name : '';
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
}

