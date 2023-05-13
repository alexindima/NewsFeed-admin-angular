import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatRadioModule} from "@angular/material/radio";
import {MatNativeDateModule} from "@angular/material/core";
import {ConfirmDialogModalComponent} from "./admin/components/confirm-dialog-modal/confirm-dialog-modal.component";
import {ArrayToStringPipe} from "./utils/array-to-string.pipe";
import {NotFoundPageComponent} from "./admin/components/not-found-page/not-found-page.component";
import {
  CustomCategoryTagInputComponent
} from "./admin/components/custom-category-tag-input/custom-category-tag-input.component";
import {
  CustomCategoryTagAddComponent
} from "./admin/components/custom-category-tag-add/custom-category-tag-add.component";
import {DashboardPaginatorComponent} from "./admin/components/dashboard-paginator/dashboard-paginator.component";
import {CommonModule} from "@angular/common";
import {LoaderComponent} from "./shared-components/loader/loader.component";
import {
  CustomCategoryTagGroupComponent
} from "./admin/components/custom-category-tag-group/custom-category-tag-group.component";

@NgModule({
  declarations: [
    ConfirmDialogModalComponent,
    ArrayToStringPipe,
    NotFoundPageComponent,
    CustomCategoryTagInputComponent,
    CustomCategoryTagAddComponent,
    CustomCategoryTagGroupComponent,
    DashboardPaginatorComponent,
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    FormsModule, // лишний, уже есть ReactiveFormsModule
    ReactiveFormsModule,
    MatAutocompleteModule, // трижды подключен! могу предложить материал модули в один массив скинуть
    MatFormFieldModule, // тоже трижды, короче внимательно объедени
    MatFormFieldModule,
    MatAutocompleteModule,
    MatNativeDateModule,
    CKEditorModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatRadioModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatNativeDateModule,
    CKEditorModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    MatPaginatorModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatRadioModule,
    ConfirmDialogModalComponent,
    ArrayToStringPipe,
    NotFoundPageComponent,
    CustomCategoryTagInputComponent,
    CustomCategoryTagAddComponent,
    DashboardPaginatorComponent,
    LoaderComponent,
    CustomCategoryTagGroupComponent,
  ]
})
export class SharedModule {
}
