import {Component} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {IsActiveMatchOptions} from "@angular/router";
import {LogoutModalComponent} from "./components/logout-modal/logout-modal.component";

@Component({
  selector: 'app-root',
  // зачем-то убрал . перед путем, у меня компилятор ошибки в html файле выдает
  templateUrl: '/app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  ignoreQueryMatchOptions: IsActiveMatchOptions = {
    queryParams: 'ignored',
    matrixParams: 'exact',
    paths: 'exact',
    fragment: 'exact',
  };

  constructor(
    public auth: AuthService,
    public logout: LogoutModalComponent,
  ) {
  }
}

