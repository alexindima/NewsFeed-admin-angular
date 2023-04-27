import {BehaviorSubject} from "rxjs";
import {CategoryTagState} from "../interfaces";

export class BaseCategoryTagState<T> implements CategoryTagState<T>{
  items$: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);

  setItems(items: T[]): void {
    this.items$.next(items);
  }

}
