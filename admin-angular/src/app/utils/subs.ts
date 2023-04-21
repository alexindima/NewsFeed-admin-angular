import {Subscription} from "rxjs";

export class Subs {
  private _subs: Subscription[] = [];

  set add(sub: Subscription) {
    this._subs.push(sub);
  }

  public log() {
    console.log(this._subs);
  }

  public unsubscribe() {
    this._subs.forEach((sub) => {
      sub.unsubscribe();
    })
    this._subs = [];
  }
}
