import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IArticle} from "../../types/IArticle";

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss']
})
export class ArticlesListComponent {
  articlesList: IArticle[] = []
  isModalOpen = false
  selectedArticle: number | null = null

  constructor(private http: HttpClient) {
    this.http.get<IArticle[]>('http://localhost:3030/articles').subscribe(data => {
      this.articlesList = data
      console.log(this.articlesList)
    });
  }

  openDeleteModal(article: number) {
    this.isModalOpen = true;
    this.selectedArticle = article
  }

  confirmDeleteModal() {
    this.isModalOpen = false;
    console.log(this.selectedArticle)
  }


}
