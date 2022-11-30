export interface ISuggestedNews {
    readonly id: number
    readonly createdDate: string
    readonly mainTitle: string
    readonly category: string
    readonly tags: [string]
}