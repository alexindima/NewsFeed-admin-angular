import {Injectable} from "@angular/core";
import {BaseArticleUserState} from "./base-article-user.state";

// не-не, все-все стейты в папке states - лишние, вообще нет ни одной причины делать наследования от базовых классов, которые наследуются от интерфейсов. Всякие планы на будущее потом выпиливаются из проектов через год-два. Дай мне конкретный кейс, где тебе понадобится всё это наследование, вместо прямого UserState который можно потом везде использовать, включая тесты со стабами/моками/шпионами. Короче, надо зарефакторить
@Injectable({
  providedIn: 'root'
})
export class UserState extends BaseArticleUserState{
}
