import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {
  ConfirmDialogModalComponent,
  ModalDialogData
} from "../confirm-dialog-modal/confirm-dialog-modal.component";
import {Subs} from "../../utils/subs";
import {LoaderService} from "../../services/loader.service";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit, OnDestroy {
  private _subs = new Subs();
  loading: boolean = false;

  constructor(
    public auth: AuthService,
    private _router: Router,
    private _matDialog: MatDialog,
    private _loaderService: LoaderService
  ) {
  }

  ngOnInit() {
    this._loaderService.getInterceptCount().subscribe((count) => {
      setTimeout(() => this.loading = !!count); // выглядит как большой хак, значит что-то не так пошло, надо разбираться причем здесь setTimeout
    })
  }


  openLogoutModal() {
    const dialogRef = this._matDialog.open(ConfirmDialogModalComponent, {
      width: '600px',
      data: {
        title: 'Confirm LogOut',
        text: `<p class="fw-bold">Are you sure you want to Log out? </p>`, // очень плохо, никакого html не должно быть в ts файлах, всё что имеет разметку выносится в отдельные компоненты и будет декларативно
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
