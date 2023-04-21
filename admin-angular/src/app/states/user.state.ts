import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserState {
  private _data = new BehaviorSubject<number>(0);
  count$: Observable<number> = this._data.asObservable();

  setCount(count: number) {
    this._data.next(count);
  }

}
