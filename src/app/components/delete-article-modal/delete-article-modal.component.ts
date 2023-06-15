import { Injectable } from '@angular/core';
import { Article } from '../../entities/article.interface';
import { ArticleService } from '../../services/article.service';
import {DeleteModalService} from "../../services/delete-modal.service";
import {ModalDialogData} from "../../entities/modal-dialog.interface";

/*
  Вообще данный компонент не имеет особого смысла, все это можно сделать там, где юзер нажал на кнопку
  (+ у тебя это сервис на самом деле (@Injectable), а в названии, что компонент написано, так не надо)
  Лучше в ArticleDashboardPageComponent сделай вот такой метод, а этот сервис удали
     public delete(article: Article) {
        const data: ModalDialogData = {
            title: 'Confirm Delete',
            text: `Are you sure you want to delete this article: "${article.mainTitle}"?`,
            button: 'Delete',
        };

        this._deleteModalService.openConfirmationDialog(
            data,
            () => this._articleService.deleteItem(article.id!)
        );
    }
*/
@Injectable({
  providedIn: 'root'
})
export class DeleteArticleModalComponent {
  public needToUpdate$ = this._deleteModalService.needToUpdate$;
  constructor(
    private _articleService: ArticleService,
    private _deleteModalService: DeleteModalService
  ) { }

  public open(article: Article) {
    const data: ModalDialogData = {
      title: 'Confirm Delete',
      text: `Are you sure you want to delete this article: "${article.mainTitle}"?`,
      button: 'Delete',
    }
    // Да, еще сервис открытия модального окна не обязательно должен только удалять, то есть он должен быть универсальным, поэтому
    // переделай DeleteModalService в ModalService
    this._deleteModalService.openConfirmationDialog(
      data,
      // а почему id необязательный атрибут? Так не может быть
      () => this._articleService.deleteItem(article.id!)
    );
  }
}
