import {Component, OnInit} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {ArticlesService} from "../../services/articles.service";
import {Article, Category, Tag, User} from "../../../interfaces";
import {ActivatedRoute, Router} from "@angular/router";
import {forkJoin, switchMap} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {
  ConfirmDialogModalComponent,
  ModalDialogData
} from "../shared/confirm-dialog-modal/confirm-dialog-modal.component";
import {UsersService} from "../../services/users.service";
import {CategoriesService} from "../../services/categories.service";
import {TagsService} from "../../services/tags.service";

interface PaginatorSettings {
  length: number,
  pageSize: number,
  pageIndex: number,
  pageSizeOptions: number[],
  hidePageSize: boolean,
  showPageSizeOptions: boolean,
  showFirstLastButtons: boolean,
  disabled: boolean,
}

interface UserToShow {
  createdDate: Date;
  id: number,
  email: string,
  name: string
  ignoredCategories: string[];
  ignoredTags: string[];
}

@Component({
  selector: 'app-user-dashboard-page',
  templateUrl: './user-dashboard-page.component.html',
  styleUrls: ['./user-dashboard-page.component.scss']
})
export class UserDashboardPageComponent implements OnInit {
  userListToShow: UserToShow[] = [];
  categoriesList: Category[] = []
  tagsList: Tag[] = []
  articlesList: Article[] = []
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

  constructor(private articlesService: ArticlesService,
              private usersService: UsersService,
              private categoriesService: CategoriesService,
              private tagsService: TagsService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private matDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.usersService.getCountOfUsers()
      .pipe(
        switchMap(result => {
          this.paginatorSettings.length = result;
          return this.activatedRoute.queryParams;
        })
      )
      .subscribe(params => {
        const pageIndex = +params['page'] - 1;
        const pageSize = +params['limit'];
        if (pageSize) {
          this.paginatorSettings.pageSize = pageSize;
        }
        if (pageIndex) {
          this.paginatorSettings.pageIndex = pageIndex;
        }
        forkJoin([this.categoriesService.getCategoriesList(), this.tagsService.getTagsList()]).subscribe(([categoriesList, tagsList]) => {
          this.categoriesList = categoriesList;
          this.tagsList = tagsList;
          this.getUsers();
        })
      });
  }

  getUsers(): void {
    if (this.paginatorSettings.length) {
      while ((this.paginatorSettings.pageIndex + 1) > Math.ceil(this.paginatorSettings.length / this.paginatorSettings.pageSize)) {
        this.paginatorSettings.pageIndex--;
      }
    }

    this.router.navigate([], {
      queryParams: {
        page: this.paginatorSettings.pageIndex + 1,
        limit: this.paginatorSettings.pageSize
      },
      queryParamsHandling: 'merge'
    }).then();

    this.usersService.getUsers((this.paginatorSettings.pageIndex + 1), this.paginatorSettings.pageSize)
      .subscribe((result: User[]) => {
        this.userListToShow = result.map((user: User) => {
          return {
            ...user,
            ignoredCategories: user.ignoredCategories?.map((category: number) => {
              return this.getNameById(this.categoriesList, category);
            }),
            ignoredTags: user.ignoredTags?.map((tag: number) => {
              return this.getNameById(this.tagsList, tag);
            })
          } as unknown as UserToShow
        })
      })
  }

  getNameById(array: Tag[] | Category[], id: number): string {
    const result = array.find(obj => obj.id === id);
    return result ? result.name : `!wrong ID: ${id}!`;
  }

  openDeleteModal(user: UserToShow): void {
    const dialogRef = this.matDialog.open(ConfirmDialogModalComponent, {
      width: '600px',
      data: {
        text: `<p class="fw-bold">Are you sure you want to delete user: </p>
        "${user.email}"?`
      } as ModalDialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.usersService.deleteUser(user.id).pipe(
          switchMap(() => {
            return this.usersService.getCountOfUsers()
          })
        ).subscribe(count => {
          this.paginatorSettings.length = count;
          this.getUsers();
        })
      }
    });
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.paginatorSettings.length = e.length;
    this.paginatorSettings.pageSize = e.pageSize;
    this.paginatorSettings.pageIndex = e.pageIndex;
    this.getUsers()
  }
}
