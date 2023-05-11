import {Injectable} from "@angular/core";
import {Tag} from "../entities/category-tag.interface";
import {BehaviorSubject} from "rxjs";
import {CategoryTagState} from "../entities/state.interface";

@Injectable({
  providedIn: 'root'
})
export class TagState implements CategoryTagState<Tag>{
  items$: BehaviorSubject<Tag[]> = new BehaviorSubject<Tag[]>([]);

  setItems(items: Tag[]): void {
    this.items$.next(items);
  }
}
