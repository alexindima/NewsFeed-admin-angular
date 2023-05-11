import {Observable} from "rxjs";

export interface ArticleUserState {
  count$: Observable<number>;
  setCount(count: number): void;
}

export interface CategoryTagState<T> {
  items$: Observable<T[]>;
  setItems(items: T[]): void;
}
