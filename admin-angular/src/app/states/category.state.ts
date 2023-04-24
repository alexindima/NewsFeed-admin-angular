import {Injectable} from "@angular/core";
import {Category} from "../interfaces";
import {BaseCategoryTagState} from "./base-category-tag.state";

@Injectable({
  providedIn: 'root'
})
export class CategoryState extends BaseCategoryTagState<Category>{
}
