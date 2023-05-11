import {NgModule} from "@angular/core";
import {AdminLayoutComponent} from './components/admin-layout/admin-layout.component';
import {ArticleEditPageComponent} from './components/article-edit-page/article-edit-page.component';
import {UserEditPageComponent} from './components/user-edit-page/user-edit-page.component';
import {ArticleDashboardPageComponent} from './components/article-dashboard-page/article-dashboard-page.component';
import {UserDashboardPageComponent} from './components/user-dashboard-page/user-dashboard-page.component';
import {SharedModule} from "../shared.module";
import {AdminRoutingModule} from "./admin-routing.module";

@NgModule({
    imports: [
        SharedModule,
        AdminRoutingModule,
    ],
  declarations: [
    AdminLayoutComponent,
    ArticleDashboardPageComponent,
    ArticleEditPageComponent,
    UserDashboardPageComponent,
    UserEditPageComponent,
  ],
})
export class AdminModule {
}
