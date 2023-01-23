import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-modal',
  template: `
    <div class="modal-overlay" *ngIf="isOpen">
      <div class="modal-content">
        <ng-content></ng-content>
        <button (click)="confirm()">Confirm</button>
        <button (click)="close()">Close</button>
      </div>
    </div>
  `,
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() isOpen = false;
  @Output() confirmed = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  confirm() {
    this.isOpen = false;
    this.confirmed.emit();
  }

  close() {
    this.isOpen = false;
    this.closed.emit();
  }
}
