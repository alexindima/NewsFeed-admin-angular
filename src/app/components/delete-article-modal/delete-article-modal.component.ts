import { Injectable } from '@angular/core';
import { Article } from '../../entities/article.interface';
import { ArticleService } from '../../services/article.service';
import {DeleteModalService} from "../../services/delete-modal.service";
import {ModalDialogData} from "../../entities/modal-dialog.interface";

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
    this._deleteModalService.openConfirmationDialog(
      data,
      () => this._articleService.deleteItem(article.id!)
    );
  }
}
