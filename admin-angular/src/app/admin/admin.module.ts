import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {LoginPageComponent} from "./components/login-page/login-page.component";
import {AdminLayoutComponent} from './components/admin-layout/admin-layout.component';
import {ArticleCreatePageComponent} from './components/article-create-page/article-create-page.component';
import {UserCreatePageComponent} from './components/user-create-page/user-create-page.component';
import {ArticleDashboardPageComponent} from './components/article-dashboard-page/article-dashboard-page.component';
import {UserDashboardPageComponent} from './components/user-dashboard-page/user-dashboard-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "./services/auth.service";
import {SharedModule} from "../shared.module";
import {AuthGuard} from "./guards/auth.guard";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import {UsersService} from "./services/users.service";
import {ArticlesService} from "./services/articles.service";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {ConfirmDialogModalComponent} from './components/confirm-dialog-modal/confirm-dialog-modal.component';
import {ArrayToStringPipe} from "./utils/array-to-string.pipe";
import {NotFoundPageComponent} from './components/not-found-page/not-found-page.component';
import {UserResolver} from "./resorvers/user.resolver";
import {ArticleResolver} from "./resorvers/article.resolver";
import {SharedTagsService} from "./services/shared-tags.service";
import {SharedCategoriesService} from "./services/shared-categories.service";
import {
  CustomCategoryTagInputComponent
} from './components/custom-category-tag-input/custom-category-tag-input.component';
import {SharedCategoriesResolver} from "./resorvers/shared-categories.resolver";
import {SharedTagsResolver} from "./resorvers/shared-tags.resolver";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {LoaderInterceptor} from "./interceptors/loader-interceptor";

@NgModule({
  imports: [
    CommonModule,
    FormsModule, // лишнее, т.к. ниже есть ReactiveFormsModule, подключается один из двух
    ReactiveFormsModule, // должен являться частью Shared Module, который и так уже подключен здесь
    SharedModule,
    // роутинг принято выносить отдельно, как например у тебя уже сделано с app-routing.module.ts - app.module.ts, здесь идентично
    RouterModule.forChild([
      {
        path: '', component: AdminLayoutComponent, resolve: {
          categories: SharedCategoriesResolver,
          tags: SharedTagsResolver
        }, children: [
          {path: '', redirectTo: '/admin/login', pathMatch: "full"},
          {path: 'login', component: LoginPageComponent},
          {path: 'articles', component: ArticleDashboardPageComponent, canActivate: [AuthGuard]},
          {path: 'new-article', component: ArticleCreatePageComponent, canActivate: [AuthGuard]},
          {
            path: 'article/:id', component: ArticleCreatePageComponent, canActivate: [AuthGuard], resolve: {
              article: ArticleResolver
            }
          },
          {path: 'users', component: UserDashboardPageComponent, canActivate: [AuthGuard]},
          {path: 'new-user', component: UserCreatePageComponent, canActivate: [AuthGuard]},
          {
            path: 'user/:id', component: UserCreatePageComponent, canActivate: [AuthGuard], resolve: {
              user: UserResolver
            }
          },
          {path: '**', component: NotFoundPageComponent}
        ]
      }
    ]),
    // все эти модули являются Shared Module, не относятся к Admin Module
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    MatPaginatorModule,
    MatDialogModule,
    MatButtonModule
  ],
  // это неверно, у тебя admin.module является фича модулем,
  // который подгружается через lazy load, соответственно он не может ничего экспортировать
  // правильно будет RouterModule переместить в SharedModule, который ты как раз импортируешь во все FeatureModule
  exports: [RouterModule],
  declarations: [
    AdminLayoutComponent,
    ArticleDashboardPageComponent,
    ArticleCreatePageComponent,
    UserDashboardPageComponent,
    UserCreatePageComponent,
    ConfirmDialogModalComponent, // не относится непосредственно к админ модулю, точно является Shared
    ArrayToStringPipe, // не относится непосредственно к админ модулю, точно является Shared
    NotFoundPageComponent, // эта страница должна быть в SharedModule
    CustomCategoryTagInputComponent  // не относится непосредственно к админ модулю, точно является Shared
  ],
  providers: [
    // если провайдер является {providedIn: 'root'} то он будет автоматически найден ангуляром,
    // его нет необходимости регистрировать среди провайдеров
    // в данном случае у тебя без исключения каждый провайдер должен был быть так помечен, т.к. они создаются в единственном экземпляре на всё приложение
    AuthService,
    AuthGuard,
    SharedTagsService,
    SharedTagsResolver,
    SharedCategoriesService,
    SharedCategoriesResolver,
    UsersService,
    UserResolver,
    ArticlesService,
    ArticleResolver,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    }]
})
export class AdminModule {

}
