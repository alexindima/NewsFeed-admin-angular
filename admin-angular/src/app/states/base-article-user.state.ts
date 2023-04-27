import {BehaviorSubject} from "rxjs";
import {ArticleUserState} from "../interfaces";

export class BaseArticleUserState implements ArticleUserState{
  count$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  setCount(count: number): void {
    this.count$.next(count);
  }

}
