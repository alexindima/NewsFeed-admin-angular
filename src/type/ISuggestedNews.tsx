export interface ISuggestedNews {
    readonly id: number
    readonly time: string
    readonly title: string
    readonly category: string
    readonly tags: [string]
}