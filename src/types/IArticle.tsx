import {IArticleElement} from "./IArticleElement";

export interface IArticle {
    readonly id: number
    readonly createdDate: string
    readonly upgradeDate: string
    readonly mainTitle: string
    readonly secondTitle: string
    readonly mainPhoto: string
    readonly mainPhotoDescription: string
    readonly body: IArticleElement[]
    readonly category: string
    readonly tags: string[]
}