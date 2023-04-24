import {Injectable} from "@angular/core";
import {Tag} from "../interfaces";
import {BaseCategoryTagState} from "./base-category-tag.state";

@Injectable({
  providedIn: 'root'
})
export class TagState extends BaseCategoryTagState<Tag>{
}
