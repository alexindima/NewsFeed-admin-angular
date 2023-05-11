import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {ArticleUserState} from "../entities/state.interface";

@Injectable({
  providedIn: 'root'
})
export class ArticleState implements ArticleUserState{
  count$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  setCount(count: number): void {
    this.count$.next(count);
  }
}
