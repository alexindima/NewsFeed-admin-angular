import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LoaderState {
  private _count = new BehaviorSubject<number>(0);
  public showLoader$ = this._count.asObservable().pipe(map((count: number) => count > 0));

  increaseCount() {
    this._count.next(this._count.value + 1);
  }

  decreaseCount() {
    this._count.next(this._count.value - 1);
  }
}
