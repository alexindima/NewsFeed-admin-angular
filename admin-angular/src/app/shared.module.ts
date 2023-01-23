import {NgModule} from "@angular/core";
import {HttpClientModule} from "@angular/common/http";
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';

@NgModule({
  imports: [
    HttpClientModule,
    CKEditorModule],
  exports: [
    HttpClientModule,
    CKEditorModule
  ]
})
export class SharedModule {

}
