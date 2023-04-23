import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(
    private _snackBar: MatSnackBar
  ) {}

  showInfo(message: string, duration: number = 5000) {
    this._snackBar.open(message, 'Close', {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      duration: 5000,
      panelClass: ['blue-snackbar'],
    });
  }

  showError(message: string, duration: number = 5000) {
    this._snackBar.open(message, 'Close', {
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      duration: 10000,
      panelClass: ['red-snackbar'],
    });
  }

}
