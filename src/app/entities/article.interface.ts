export interface Article {
  id?: number;
  createdAt?: string;
  updatedAt?: string;
  mainTitle: string;
  secondTitle: string;
  photoPass: string;
  photoText: string;
  body: string;
  category: string;
  tags: string[];
}
