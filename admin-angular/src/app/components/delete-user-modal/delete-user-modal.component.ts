import {Injectable} from '@angular/core';
import {User} from '../../entities/user.interface';
import {UserService} from '../../services/user.service';
import {DeleteModalService} from "../../services/delete-modal.service";
import {ModalDialogData} from "../../entities/modal-dialog.interface";

@Injectable({
  providedIn: 'root'
})
export class DeleteUserModalComponent {
  public needToUpdate$ = this._deleteModalService.needToUpdate$;
  constructor(
    private _userService: UserService,
    private _deleteModalService: DeleteModalService
  ) { }

  public open(user: User) {
    const data: ModalDialogData = {
      title: 'Confirm Delete',
      text: `Are you sure you want to delete this user: "${user.email}"?`,
      button: 'Delete',
    }
    this._deleteModalService.openConfirmationDialog(
      data,
      () => this._userService.deleteItem(user.id!)
    );
  }
}
