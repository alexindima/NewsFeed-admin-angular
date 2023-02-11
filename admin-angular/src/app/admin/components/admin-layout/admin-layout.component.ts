import {Component, OnDestroy} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {
  ConfirmDialogModalComponent,
  ModalDialogData
} from "../confirm-dialog-modal/confirm-dialog-modal.component";
import {Subs} from "../../utils/subs";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnDestroy {
  private _subs = new Subs();

  constructor(
    public auth: AuthService,
    private _router: Router,
    private _matDialog: MatDialog
  ) {
  }

  openLogoutModal() {
    const dialogRef = this._matDialog.open(ConfirmDialogModalComponent, {
      width: '600px',
      data: {
        title: 'Confirm LogOut',
        text: `<p class="fw-bold">Are you sure you want to Log out? </p>`,
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
    this._router.navigate(['/admin', 'login']).then();
  }

  ngOnDestroy() {
    this._subs.unsubscribe();
  }
}
