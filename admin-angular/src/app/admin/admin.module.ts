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
import {UserResolver} from "./resolvers/user.resolver";
import {ArticleResolver} from "./resolvers/article.resolver";
import {SharedTagsService} from "./services/shared-tags.service";
import {SharedCategoriesService} from "./services/shared-categories.service";
import {
  CustomCategoryTagInputComponent
} from './components/custom-category-tag-input/custom-category-tag-input.component';
import {SharedCategoriesResolver} from "./resolvers/shared-categories.resolver";
import {SharedTagsResolver} from "./resolvers/shared-tags.resolver";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AddXsrfInterceptor} from "./interceptors/add-xsrf.interceptor";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    // роутинг принято выносить отдельно, как например у тебя уже сделано с app-routing.module.ts - app.module.ts, здесь идентично
    RouterModule.forChild([
      {
        path: '', component: AdminLayoutComponent, resolve: {
          categories: SharedCategoriesResolver,
          tags: SharedTagsResolver,
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
})
export class AdminModule {

}
