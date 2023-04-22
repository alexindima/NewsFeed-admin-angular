import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Tag} from "../interfaces";
import {TagState} from "../states/tag.state";
import {BaseCategoryTagService} from "./base-category-tag.service";

const BASE_URL = 'http://localhost:8000/api/tags';

@Injectable({
  providedIn: 'root'
})
export class TagService extends BaseCategoryTagService<Tag>{
  constructor(
    protected override _http: HttpClient,
    protected _tagState: TagState,
  ) {
    super(_http, _tagState, BASE_URL);
  }

}

