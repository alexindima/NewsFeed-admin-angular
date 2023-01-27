import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Tag} from "../../interfaces";
import {Observable} from "rxjs";

@Injectable()
export class TagsService {

  constructor(private http: HttpClient) {
  }

  getTagsList(): Observable<Tag[]> {
    return this.http.get<Tag[]>(`http://localhost:3030/tags`)
  }

  createTag(name: string): Observable<Tag> {
    return new Observable(observer => {
      this.getTagsList().subscribe((tags: Tag[]) => {
        const isTagExist = tags.some((tag: Tag) => tag.name.toLowerCase() === name.toLowerCase())
        if (isTagExist) {
          const foundTag = tags.find((tag: Tag) => tag.name.toLowerCase() === name.toLowerCase())
          observer.next(foundTag);
          observer.complete();
        } else {
          this.http.post<Tag>(`http://localhost:3030/tags`, {name: name}).subscribe((result: Tag) => {
            observer.next(result);
            observer.complete();
          })
        }
      })
    });
  }

  deleteTag(tag: number | string | Tag) {
    if (typeof tag === "number") {
      this.http.delete(`http://localhost:3030/tags/${tag}`).subscribe()
    }
    if (typeof tag === "string") {
      this.getTagsList().subscribe((tags: Tag[]) => {
        const isTagExist = tags.some((singleTag: Tag) => singleTag.name.toLowerCase() === tag.toLowerCase())
        if (isTagExist) {
          const foundTag = tags.find((singleTag: Tag) => singleTag.name.toLowerCase() === tag.toLowerCase())
          this.http.delete(`http://localhost:3030/tags/${foundTag!.id}`).subscribe()
        }
      })
    }
    if (typeof tag === "object") {
      this.http.delete(`http://localhost:3030/tags/${tag.id}`).subscribe()
    }
  }
}

