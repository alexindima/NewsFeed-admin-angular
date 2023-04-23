import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-custom-category-tag-add',
  template: `
    <div class="mb-3 mt-4">
      <button
        type="button"
        class="btn btn-info fixed-width-150"
        (click)="clickHandler()"
      >
          {{name}}
      </button>
    </div>
  `
})
export class CustomCategoryTagAddComponent {
  @Input() name!: string;
  @Output() addClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  clickHandler(){
    this.addClick.emit();
  }

}
