import {Component, OnDestroy, OnInit} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {Article, Category, PaginatorSettings, Tag, User} from "../../../interfaces";
import {ActivatedRoute, Router} from "@angular/router";
import {of, switchMap, tap} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {
  ConfirmDialogModalComponent,
  ModalDialogData
} from "../confirm-dialog-modal/confirm-dialog-modal.component";
import {UsersService} from "../../services/users.service";
import {SharedTagsService} from "../../services/shared-tags.service";
import {SharedCategoriesService} from "../../services/shared-categories.service";
import {Subs} from "../../utils/subs";

@Component({
  selector: 'app-user-dashboard-page',
  templateUrl: './user-dashboard-page.component.html',
  styleUrls: ['./user-dashboard-page.component.scss']
})
export class UserDashboardPageComponent implements OnInit, OnDestroy {
  private _subs = new Subs();
  userListToShow: User[] = [];
  categoriesList: Category[] = []
  tagsList: Tag[] = []
  paginatorSettings: PaginatorSettings = {
    length,
    pageSize: 25,
    pageIndex: 0,
    pageSizeOptions: [10, 25, 50],
    hidePageSize: false,
    showPageSizeOptions: true,
    showFirstLastButtons: true,
    disabled: false
  };
  pageEvent!: PageEvent;

  constructor(
    private _usersService: UsersService,
    private _sharedCategoriesService: SharedCategoriesService,
    private _sharedTagsService: SharedTagsService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _matDialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this._subs.add = this._sharedCategoriesService.categories.subscribe((data) => {
      this.categoriesList = data;
    })
    this._subs.add = this._sharedTagsService.tags.subscribe((data) => {
      this.tagsList = data;
    })

    this._subs.add = this._usersService.countOfUsers.subscribe((count) => {
      this.paginatorSettings.length = count;
    })

    this._subs.add = this._activatedRoute.queryParams.subscribe(params => {
        const pageIndex = +params['page'] - 1;
        const pageSize = +params['limit'];
        if (pageSize) {
          this.paginatorSettings.pageSize = pageSize;
        }
        if (pageIndex) {
          this.paginatorSettings.pageIndex = pageIndex;
        }
        this.getUsers();
      });
  }

  getUsers(): void {
    if (this.paginatorSettings.length) {
      while ((this.paginatorSettings.pageIndex + 1) > Math.ceil(this.paginatorSettings.length / this.paginatorSettings.pageSize)) {
        this.paginatorSettings.pageIndex--;
      }
    }

    this._router.navigate([], {
      queryParams: {
        page: this.paginatorSettings.pageIndex + 1,
        limit: this.paginatorSettings.pageSize
      },
      queryParamsHandling: 'merge'
    }).then();

    this._subs.add = this._usersService.getUsers((this.paginatorSettings.pageIndex + 1), this.paginatorSettings.pageSize)
      .subscribe((result: User[]) => {
        this.userListToShow = result;
      })
  }

  openDeleteModal(user: User): void {
    const dialogRef = this._matDialog.open(ConfirmDialogModalComponent, {
      width: '600px',
      data: {
        title: 'Confirm Delete',
        text: `<p class="fw-bold">Are you sure you want to delete user: </p>
        "${user.email}"?`,
        button: 'Delete'
      } as ModalDialogData
    });

    this._subs.add = dialogRef.afterClosed().pipe(
      switchMap(result => {
        if (result) {
          return this._usersService.deleteUser(user.id!).pipe(
            tap(() => this.getUsers())
          );
        }
        return of(null);
      })
    ).subscribe();
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.paginatorSettings.length = e.length;
    this.paginatorSettings.pageSize = e.pageSize;
    this.paginatorSettings.pageIndex = e.pageIndex;
    this.getUsers()
  }

  ngOnDestroy() {
    this._subs.unsubscribe();
  }
}
