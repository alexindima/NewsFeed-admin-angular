import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {ReactiveFormsModule} from "@angular/forms";
import {ConfirmDialogModalComponent} from "./shared-components/confirm-dialog-modal/confirm-dialog-modal.component";
import {ArrayToStringPipe} from "./utils/array-to-string.pipe";
import {NotFoundPageComponent} from "./components/not-found-page/not-found-page.component";
import {
  CustomCategoryTagInputComponent
} from "./components/custom-category-tag-input/custom-category-tag-input.component";
import {DashboardPaginatorComponent} from "./components/dashboard-paginator/dashboard-paginator.component";
import {CommonModule} from "@angular/common";
import {LoaderComponent} from "./shared-components/loader/loader.component";
import {
  CustomCategoryTagGroupComponent
} from "./components/custom-category-tag-group/custom-category-tag-group.component";
import {MaterialModule} from "./material.module";
import {FieldValidatorComponent} from "./components/field-validator/field-validator.component";

@NgModule({
  declarations: [
    ConfirmDialogModalComponent,
    ArrayToStringPipe,
    NotFoundPageComponent,
    CustomCategoryTagInputComponent,
    CustomCategoryTagGroupComponent,
    DashboardPaginatorComponent,
    LoaderComponent,
    FieldValidatorComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    CKEditorModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    CKEditorModule,
    HttpClientModule,
    ReactiveFormsModule,
    ConfirmDialogModalComponent,
    ArrayToStringPipe,
    NotFoundPageComponent,
    CustomCategoryTagInputComponent,
    DashboardPaginatorComponent,
    LoaderComponent,
    CustomCategoryTagGroupComponent,
    FieldValidatorComponent,
  ]
})
export class SharedModule {
}
