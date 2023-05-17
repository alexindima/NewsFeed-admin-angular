import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface ModalDialogData {
  title: string,
  text: string,
  button: string
}

@Component({
  selector: 'app-confirm-dialog-modal',
  templateUrl: './confirm-dialog-modal.component.html',
  styleUrls: ['./confirm-dialog-modal.component.scss']
})
export class ConfirmDialogModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalDialogData,
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

