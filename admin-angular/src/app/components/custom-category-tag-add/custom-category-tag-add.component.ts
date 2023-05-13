import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-custom-category-tag-add',
  templateUrl: './custom-category-tag-add.component.html',
  styleUrls: ['./custom-category-tag-add.component.scss'],
})
export class CustomCategoryTagAddComponent {
  @Input() name!: string;
  @Output() addClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  clickHandler(){
    this.addClick.emit();
  }

}
