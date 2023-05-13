import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {UserDashboardPageComponent} from './components/user-dashboard-page/user-dashboard-page.component';
import {UserEditPageComponent} from './components/user-edit-page/user-edit-page.component';
import {UserResolver} from './resolvers/user.resolver';
import {SharedModule} from "./shared.module";

@NgModule({
  declarations: [
    UserDashboardPageComponent,
    UserEditPageComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: UserDashboardPageComponent },
      { path: 'create', component: UserEditPageComponent },
      { path: ':id', component: UserEditPageComponent, resolve: { user: UserResolver } }
    ])
  ]
})
export class UsersModule { }
