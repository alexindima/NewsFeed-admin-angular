export interface User {
  createdDate?: string;
  id?: number,
  email: string,
  password?: string,
  name: string
  ignoredCategories: number[];
  ignoredTags: number[];
}

export interface LoginUser {
  email: string
  password: string,
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

// readonly очень вероятно лишнее, здесь сильно в проект будет упираться,
// я лично нахожу его избыточным, который не даёт преимуществ
export interface Article {
  readonly id?: number;
  readonly createdDate?: string;
  readonly upgradeDate?: string;
  readonly mainTitle: string;
  readonly secondTitle: string;
  readonly photoUrl: string;
  readonly photoText: string;
  readonly body: string;
  readonly category: number;
  readonly tags: number[];
}



