import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {Category} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class CategoryState {
  private _data = new BehaviorSubject<Category[]>([]);
  items$: Observable<Category[]> = this._data.asObservable();

  setItems(items: Category[]) {
    this._data.next(items);
  }

}
