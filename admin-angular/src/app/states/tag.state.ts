import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {Tag} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class TagState {
  private _data = new BehaviorSubject<Tag[]>([]);
  items$: Observable<Tag[]> = this._data.asObservable();

  setItems(items: Tag[]) {
    this._data.next(items);
  }

}
