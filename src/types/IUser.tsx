export interface IUser {
    readonly id: number
    name: string
    email?: string
    password?: string
    ignoredCategories: string[]
    ignoredTags: string[]
}