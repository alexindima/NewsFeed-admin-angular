import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {LoginPageComponent} from './components/login-page/login-page.component';
import {SharedModule} from "./shared.module";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AddXsrfInterceptor} from "./interceptors/add-xsrf.interceptor";
import {
  AddWithCredentialsInterceptor
} from "./interceptors/add-with-credentials.interceptor";
import {LoaderInterceptor} from "./interceptors/loader.interceptor";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ResponseNotificationInterceptor} from "./interceptors/response-notification.interceptor";
import {MAT_RADIO_DEFAULT_OPTIONS} from "@angular/material/radio";
import {ArticleModule} from "./article.module";

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ArticleModule,
    SharedModule,
  ],
  providers: [
    MatSnackBar,
    { provide: HTTP_INTERCEPTORS, useClass: AddXsrfInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AddWithCredentialsInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: ResponseNotificationInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true},
    {
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: { color: 'primary' },
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
