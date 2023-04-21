import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {LoginPageComponent} from "./components/login-page/login-page.component";
import {AdminLayoutComponent} from './components/admin-layout/admin-layout.component';
import {ArticleEditPageComponent} from './components/article-edit-page/article-edit-page.component';
import {UserEditPageComponent} from './components/user-edit-page/user-edit-page.component';
import {ArticleDashboardPageComponent} from './components/article-dashboard-page/article-dashboard-page.component';
import {UserDashboardPageComponent} from './components/user-dashboard-page/user-dashboard-page.component';
import {SharedModule} from "../shared.module";
import {AuthGuard} from "../guards/auth.guard";
import {ConfirmDialogModalComponent} from './components/confirm-dialog-modal/confirm-dialog-modal.component';
import {ArrayToStringPipe} from "../utils/array-to-string.pipe";
import {NotFoundPageComponent} from './components/not-found-page/not-found-page.component';
import {UserResolver} from "../resolvers/user.resolver";
import {ArticleResolver} from "../resolvers/article.resolver";
import {
  CustomCategoryTagInputComponent
} from './components/custom-category-tag-input/custom-category-tag-input.component';
import {SharedCategoryResolver} from "../resolvers/shared-category.resolver";
import {SharedTagResolver} from "../resolvers/shared-tag.resolver";
import { DashboardPaginatorComponent } from './components/dashboard-paginator/dashboard-paginator.component';
import { DashboardPageComponent } from './components/dashboard-page/dashboard-page.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    // роутинг принято выносить отдельно, как например у тебя уже сделано с app-routing.module.ts - app.module.ts, здесь идентично
    RouterModule.forChild([
      {
        path: '', component: AdminLayoutComponent, resolve: {
          categories: SharedCategoryResolver,
          tags: SharedTagResolver,
        }, children: [
          {path: '', redirectTo: '/admin/login', pathMatch: "full"},
          {path: 'login', component: LoginPageComponent},
          {path: 'articles', component: ArticleDashboardPageComponent, canActivate: [AuthGuard]},
          {path: 'new-article', component: ArticleEditPageComponent, canActivate: [AuthGuard]},
          {
            path: 'article/:id', component: ArticleEditPageComponent, canActivate: [AuthGuard], resolve: {
              article: ArticleResolver
            }
          },
          {path: 'users', component: UserDashboardPageComponent, canActivate: [AuthGuard]},
          {path: 'new-user', component: UserEditPageComponent, canActivate: [AuthGuard]},
          {
            path: 'user/:id', component: UserEditPageComponent, canActivate: [AuthGuard], resolve: {
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
    ArticleEditPageComponent,
    UserDashboardPageComponent,
    UserEditPageComponent,
    ConfirmDialogModalComponent, // не относится непосредственно к админ модулю, точно является Shared
    ArrayToStringPipe, // не относится непосредственно к админ модулю, точно является Shared
    NotFoundPageComponent, // эта страница должна быть в SharedModule
    CustomCategoryTagInputComponent, DashboardPaginatorComponent  // не относится непосредственно к админ модулю, точно является Shared
  ],
})
export class AdminModule {

}

export class Das {

}
