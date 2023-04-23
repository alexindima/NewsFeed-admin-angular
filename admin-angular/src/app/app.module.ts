import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatNativeDateModule} from '@angular/material/core';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule} from "./app-routing.module";
import {LoginPageComponent} from './admin/components/login-page/login-page.component';
import {SharedModule} from "./shared.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AddXsrfInterceptor} from "./interceptors/add-xsrf.interceptor";
import {
  AddWithCredentialsInterceptor
} from "./interceptors/add-with-credentials.interceptor";
import {LoaderInterceptor} from "./interceptors/loader.interceptor";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ResponseNotificationInterceptor} from "./interceptors/response-notification.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
  ],
  imports: [
    AppRoutingModule, // этот модуль точно принадлежит App Module, остальные - Shared модули
    BrowserModule,
    // почти ни один из этих модулей не придется подключать, если их все перенести в Shared
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
  ],
  providers: [
    MatSnackBar,
    { provide: HTTP_INTERCEPTORS, useClass: AddXsrfInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AddWithCredentialsInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: ResponseNotificationInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true},

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
