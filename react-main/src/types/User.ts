export interface User {
    readonly id: number;
    name: string;
    email?: string;
    password?: string;
    ignoredCategories: number[];
    ignoredTags: number[];
}
