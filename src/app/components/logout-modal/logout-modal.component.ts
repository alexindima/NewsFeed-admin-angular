import {Injectable, OnDestroy} from '@angular/core';
import {ConfirmDialogModalComponent} from "../../shared-components/confirm-dialog-modal/confirm-dialog-modal.component";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {Subs} from "../../utils/subs";
import {ModalDialogData} from "../../entities/modal-dialog.interface";

/*
 Этот сервис (тоже названный компонентом) по сути повторяет то, что делает DeleteModalService, поэтому как
 и писала до этого, сделай из DeleteModalService просто ModalService и тоже используй его при открытии модального окна
 для подтверждения логаута в AppComponent (или меню, про которое писала в AppComponent),
 так получится, что этот сервис можно будет удалить, а в AppComponent
 создать функцию logout() и получится что-то подобное:

   constructor(
      public modal: ModalService,
      private _auth: AuthService,
      private _router: Router,
    ) {
    }

   logout() {
      const data: ModalDialogData = {
        title: 'Confirm LogOut',
        text: `Are you sure you want to Log out?`,
        button: 'LogOut',
      };

      this.modal.openConfirmationDialog(data, () => this._logout());
   }

   private _logout() {
      this.auth.logout();
      this._router.navigate(['login']).then();
   }
*/
@Injectable({
  providedIn: "root"
})
export class LogoutModalComponent implements OnDestroy{
  private _subs = new Subs();
  constructor(
    public auth: AuthService,
    private _router: Router,
    private _matDialog: MatDialog,
  ) {
  }
  public open() {
    const data: ModalDialogData = {
      title: 'Confirm LogOut',
      text: `Are you sure you want to Log out?`,
      button: 'LogOut',
    }
    const dialogRef = this._matDialog.open(ConfirmDialogModalComponent, {
      width: '600px',
      data,
    });

    this._subs.add = dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.logout();
      }
    });
  }

  private logout() {
    this.auth.logout();
    this._router.navigate(['login']).then();
  }

  ngOnDestroy() {
    this._subs.unsubscribe();
  }
}
