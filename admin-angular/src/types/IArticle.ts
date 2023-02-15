import {IArticleElement} from "./IArticleElement";

// точки с запятой в конце строк не бывают лишними, визуальная подсказка окончания выражения
export interface IArticle {
    readonly id: number
    readonly createdDate: string
    readonly upgradeDate: string
    readonly mainTitle: string
    readonly secondTitle: string
    readonly mainPhoto: string
    readonly mainPhotoDescription: string
    readonly body: IArticleElement[]
    readonly category: number
    readonly tags: number[]
}
