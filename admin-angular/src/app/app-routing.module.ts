import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {MainLayoutComponent} from "./main-layout/main-layout.component";
import {ArticlesPageComponent} from "./articles-page/articles-page.component";
import {EditPageComponent} from "./edit-page/edit-page.component";

// @ts-ignore
const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/', pathMatch: "full"},
      {path: '', component: ArticlesPageComponent},
      {path: 'article', component: EditPageComponent},
      {path: 'article/:id', component: EditPageComponent}
    ]
  },
  {
    path: 'admin', loadChildren: () => import('./admin/admin.module').then(x => x.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
