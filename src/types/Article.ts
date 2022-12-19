export interface Article {
    readonly id: number;
    readonly createdDate: string;
    readonly upgradeDate: string;
    readonly mainTitle: string;
    readonly secondTitle: string;
    readonly mainPhoto: string;
    readonly mainPhotoDescription: string;
    readonly body: ArticleElement[];
    readonly category: number;
    readonly tags: number[];
}

export interface ArticleElement {
    readonly id: number;
    readonly type: string;
    readonly href?: string;
    readonly alt?: string;
    readonly data?: string;
}

