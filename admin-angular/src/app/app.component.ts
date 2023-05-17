import {Component, OnDestroy} from '@angular/core';
import {Subs} from "./utils/subs";
import {AuthService} from "./services/auth.service";
import {IsActiveMatchOptions, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {
  ConfirmDialogModalComponent,
  ModalDialogData
} from "./shared-components/confirm-dialog-modal/confirm-dialog-modal.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  private _subs = new Subs();
  ignoreQueryMatchOptions: IsActiveMatchOptions = {
    queryParams: 'ignored',
    matrixParams: 'exact',
    paths: 'exact',
    fragment: 'exact',
  };

  constructor(
    public auth: AuthService,
    private _router: Router,
    private _matDialog: MatDialog,
  ) {
  }

  // здесь я могу предложить создать logout компонент и в него перенести фичу логаута с модалкой целиком.
  // старайся из компонентов контейнеров/пейджей/лейаутов не устраивать свалки фич, лейауту пофиг на фичу логаута должно быть
  openLogoutModal() {
    const dialogRef = this._matDialog.open(ConfirmDialogModalComponent, {
      width: '600px',
      data: {
        title: 'Confirm LogOut',
        text: `Are you sure you want to Log out?`,
        button: 'LogOut'
      } as ModalDialogData
    });

    this._subs.add = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.logout();
      }
    });
  }

  logout() {
    this.auth.logout();
    this._router.navigate(['login']).then();
  }

  ngOnDestroy() {
    this._subs.unsubscribe();
  }
}

