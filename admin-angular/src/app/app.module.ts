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
import {HTTP_INTERCEPTORS, HttpClientXsrfModule} from "@angular/common/http";
import {AddXsrfInterceptor} from "./admin/interceptors/add-xsrf.interceptor";
import {
  AddWithCredentialsInterceptor
} from "./admin/interceptors/add-with-credentials.interceptor";
import {AuthInterceptor} from "./admin/interceptors/auth.interceptor";
import {AuthService} from "./admin/services/auth.service";
import {LoaderInterceptor} from "./admin/interceptors/loader.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    // почти ни один из этих модулей не придется подключать, если их все перенести в Shared
    FormsModule,
    AppRoutingModule, // этот модуль точно принадлежит App Module, остальные - Shared модули
    ReactiveFormsModule,
    SharedModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    //HttpClientXsrfModule, //not working
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AddXsrfInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AddWithCredentialsInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true},

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
