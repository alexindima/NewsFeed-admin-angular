import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {PaginatorSettings} from "../../entities/paginator.interface";

@Component({
  selector: 'app-dashboard-paginator',
  templateUrl: './dashboard-paginator.component.html',
  styleUrls: ['./dashboard-paginator.component.scss']
})
export class DashboardPaginatorComponent {
  @Input() settings!: PaginatorSettings;
  @Output() pageChanged: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  readonly PAGE_SIZE_OPTIONS = [10, 25, 50];

  onPageChanged(event: PageEvent) {
    this.settings = event;
    this.pageChanged.emit(event);
  }

}
