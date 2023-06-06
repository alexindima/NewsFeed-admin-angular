import {Injectable} from "@angular/core";
import {Category} from "../entities/category-tag.interface";
import {BehaviorSubject} from "rxjs";
import {CategoryTagState} from "../entities/state.interface";

@Injectable({
  providedIn: 'root'
})
export class CategoryState implements CategoryTagState<Category>{
  items$: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);

  setItems(items: Category[]): void {
    this.items$.next(items);
  }
}
