import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-dashboard-paginator',
  templateUrl: './dashboard-paginator.component.html',
  styleUrls: ['./dashboard-paginator.component.scss']
})
export class DashboardPaginatorComponent {
  @Input() length!: number;
  @Input() pageSize!: number;
  @Input() pageIndex!: number;
  @Output() pageChanged: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  readonly PAGE_SIZE_OPTIONS = [10, 25, 50];

  onPageChanged(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.length = event.length;
    this.pageChanged.emit(event);
  }

}
