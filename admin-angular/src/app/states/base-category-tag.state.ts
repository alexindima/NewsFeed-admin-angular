import {BehaviorSubject, Observable} from "rxjs";
import {CategoryTagState} from "../interfaces";

export class BaseCategoryTagState<T> implements CategoryTagState<T>{
  private _data = new BehaviorSubject<T[]>([]);
  items$: Observable<T[]> = this._data.asObservable();

  setItems(items: T[]): void {
    this._data.next(items);
  }

}
