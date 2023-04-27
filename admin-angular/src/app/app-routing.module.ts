import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {NotFoundPageComponent} from "./admin/components/not-found-page/not-found-page.component";

const routes: Routes = [
  {
    path: '', redirectTo: 'admin', pathMatch: "full"
  },
  {
    path: 'admin', loadChildren: () => import('./admin/admin.module').then(x => x.AdminModule)
  },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
