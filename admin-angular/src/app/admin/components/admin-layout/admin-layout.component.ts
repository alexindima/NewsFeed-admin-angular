import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {
  ConfirmDialogModalComponent,
  ModalDialogData
} from "../shared/confirm-dialog-modal/confirm-dialog-modal.component";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {

  constructor(private router: Router,
              public auth: AuthService,
              private matDialog: MatDialog) {

  }

  openLogoutModal(): void {
    const dialogRef = this.matDialog.open(ConfirmDialogModalComponent, {
      width: '600px',
      data: {
        text: `<p class="fw-bold">Are you sure you want to Log out? </p>`
      } as ModalDialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.logout()
      }
    });
  }

  logout() {
    this.auth.logout()
    this.router.navigate(['/admin', 'login'])
  }
}
