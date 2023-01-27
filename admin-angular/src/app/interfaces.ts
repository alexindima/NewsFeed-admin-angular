export interface User {
  createdDate?: Date;
  id?: number,
  email: string,
  password: string,
  name?: string
  ignoredCategories?: number[];
  ignoredTags?: number[];
}

export interface JSAuthResponse {
  accessToken: string
}

export interface Category {
  readonly id: number,
  readonly name: string
}

export interface Tag {
  readonly id: number;
  readonly name: string;
}


export interface Article {
  readonly id?: number;
  readonly createdDate: Date;
  readonly upgradeDate?: Date;
  readonly mainTitle: string;
  readonly secondTitle: string;
  readonly mainPhoto: string;
  readonly mainPhotoDescription: string;
  readonly body?: ArticleElement[];
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


