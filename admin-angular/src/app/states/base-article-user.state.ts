import {BehaviorSubject, Observable} from "rxjs";
import {ArticleUserState} from "../interfaces";

export class BaseArticleUserState implements ArticleUserState{
  protected _data = new BehaviorSubject<number>(0);
  count$: Observable<number> = this._data.asObservable();

  setCount(count: number): void {
    this._data.next(count);
  }

}
