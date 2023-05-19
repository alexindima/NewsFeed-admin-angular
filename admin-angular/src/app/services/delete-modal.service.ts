import {Injectable, OnDestroy} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {of, Subject, switchMap, tap} from 'rxjs';
import {Subs} from "../utils/subs";
import {ConfirmDialogModalComponent} from "../shared-components/confirm-dialog-modal/confirm-dialog-modal.component";
import {ModalDialogData} from "../entities/modal-dialog.interface";

@Injectable({
  providedIn: 'root'
})
export class DeleteModalService implements OnDestroy {
  public needToUpdate$ = new Subject<boolean>();
  private _subs = new Subs();

  constructor(private _matDialog: MatDialog) { }

  public openConfirmationDialog(modalData: ModalDialogData, deleteCallback: () => any) {
    const dialogRef = this._matDialog.open(ConfirmDialogModalComponent, {
      width: '600px',
      data: modalData,
    });

    this._subs.add = dialogRef.afterClosed().pipe(
      switchMap((result) => {
        if (result) {
          return deleteCallback().pipe(tap(() => this.needToUpdate$.next(true)));
        }
        return of(null);
      })
    ).subscribe();
  }

  ngOnDestroy() {
    this._subs.unsubscribe();
  }
}
